"use client";

import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface Service {
  id: string;
  name: string;
  description: string[];
  basePrice: number;
  duration: number;
  category: string;
  isActive: boolean;
  isPremium?: boolean;
  isBestSeller?: boolean;
  rating?: number;
}

type AddressComponents = {
  addressLine1: string;
  addressLine2: string;
  city: string;
  pincode: string;
};

export default function LocationPicker() {
  const [marker, setMarker] = useState({ lat: 21.1702, lng: 72.8311 }); // Surat default
  const [loading, setLoading] = useState(true);

  const [fullAddress, setFullAddress] = useState("");
  const [addressParts, setAddressParts] = useState<AddressComponents>({
    addressLine1: "",
    addressLine2: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({
    addressLine1: false,
    addressLine2: false,
    city: false,
    pincode: false,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const composedAddress = `${addressParts.addressLine1}, ${addressParts.addressLine2}, ${addressParts.city}, ${addressParts.pincode}`;

  const router = useRouter();

  const validateFields = () => {
    const newErrors = {
      addressLine1: !addressParts.addressLine1.trim(),
      addressLine2: !addressParts.addressLine2.trim(),
      city: !addressParts.city.trim(),
      pincode: !addressParts.pincode.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const parseAddressComponents = (
    components: google.maps.GeocoderAddressComponent[]
  ) => {
    let addressLine1 = "";
    let addressLine2 = "";
    let city = "";
    let pincode = "";

    components.forEach((component) => {
      const types = component.types;
      if (types.includes("postal_code")) {
        pincode = component.long_name;
      } else if (types.includes("locality")) {
        city = component.long_name;
      } else if (
        types.includes("sublocality_level_1") ||
        types.includes("sublocality")
      ) {
        if (addressLine2 === "") addressLine2 = component.long_name;
      } else if (types.includes("route") || types.includes("street_address")) {
        if (addressLine1 === "") addressLine1 = component.long_name;
      } else if (types.includes("street_number")) {
        addressLine1 = component.long_name + " " + addressLine1;
      }
    });

    return { addressLine1, addressLine2, city, pincode };
  };

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      if (data.status === "OK" && data.results[0]) {
        const result = data.results[0];
        setFullAddress(result.formatted_address);

        const parsed = parseAddressComponents(result.address_components);
        setAddressParts(parsed);
      } else {
        setFullAddress("Address not found.");
        setAddressParts({
          addressLine1: "",
          addressLine2: "",
          city: "",
          pincode: "",
        });
      }
    } catch {
      setFullAddress("Error fetching address.");
      setAddressParts({
        addressLine1: "",
        addressLine2: "",
        city: "",
        pincode: "",
      });
    }
    setLoading(false);
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const lat = event.latLng?.lat();
    const lng = event.latLng?.lng();
    if (lat && lng) {
      setMarker({ lat, lng });
      setLoading(true);
      fetchAddress(lat, lng);
    }
  };

  const handlePlaceChanged = () => {
    if (autoCompleteRef.current !== null) {
      const place = autoCompleteRef.current.getPlace();
      if (place.geometry) {
        const lat = place.geometry.location?.lat();
        const lng = place.geometry.location?.lng();
        if (lat && lng) {
          setMarker({ lat, lng });
          map?.panTo({ lat, lng });
          setLoading(true);
          fetchAddress(lat, lng);
        }
      }
    }
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setMarker({ lat, lng });
          map?.panTo({ lat, lng });
          fetchAddress(lat, lng);
        },
        () => {
          setLoading(false);
          alert("Location access denied.");
        }
      );
    } else {
      alert("Geolocation not supported.");
      setLoading(false);
    }
  };

  useEffect(() => {
    useCurrentLocation();
  }, []);

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("selectedService");
      if (stored) {
        setSelectedService(JSON.parse(stored));
      }
    }
  }, []);

  const handleChangeService = () => {
    router.push("/services");
  };

  if (!selectedService) {
    return <p>Loading selected service...</p>;
  }

  return (
    <div className="space-y-4 relative mx-auto">
      <div className="mb-6 flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-xl font-bold">{selectedService.name}</h2>
          <p className="text-sm text-muted-foreground">
            ₹{selectedService.basePrice} • {selectedService.duration} min
          </p>
        </div>
        <button
          onClick={handleChangeService}
          className="border rounded px-3 py-1 text-sm hover:bg-gray-100 transition"
        >
          Change
        </button>
      </div>

      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
        libraries={["places"]}
      >
        <Autocomplete
          onLoad={(autocomplete) => (autoCompleteRef.current = autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Search your location"
            className="w-full p-2 border rounded-md"
          />
        </Autocomplete>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={marker}
          zoom={15}
          onClick={handleMapClick}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          <Marker position={marker} />
        </GoogleMap>
      </LoadScript>

      <button
        onClick={useCurrentLocation}
        className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md"
      >
        📍 Use Current Location
      </button>

      <div>
        <label className="block mt-2 text-sm font-semibold">Full Address</label>
        <input
          type="text"
          value={fullAddress}
          readOnly
          className="w-full p-2 border rounded-md bg-gray-100"
        />
      </div>

      {["addressLine1", "addressLine2", "city", "pincode"].map((field) => (
        <div key={field}>
          <label className="block mt-2 text-sm font-semibold">
            {field === "addressLine1"
              ? "Address Line 1"
              : field === "addressLine2"
              ? "Address Line 2"
              : field === "city"
              ? "City"
              : "Pincode"}
          </label>
          <input
            type="text"
            value={addressParts[field as keyof AddressComponents]}
            onChange={(e) =>
              setAddressParts((prev) => ({
                ...prev,
                [field]: e.target.value,
              }))
            }
            className={`w-full p-2 border rounded-md ${
              errors[field as keyof AddressComponents] ? "border-red-500" : ""
            }`}
            placeholder={
              field === "addressLine1"
                ? "Street, Building, etc."
                : field === "addressLine2"
                ? "Apartment, Suite, Landmark, etc."
                : field
            }
          />
          {errors[field as keyof AddressComponents] && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )}
        </div>
      ))}

      <button
        onClick={() => {
          if (!validateFields()) return;
          const encodedAddress = encodeURIComponent(composedAddress);
          const encodedService = encodeURIComponent(JSON.stringify(selectedService));
          router.push(`/booking/user-auth?address=${encodedAddress}&service=${encodedService}`);
        }}
        className="h-12 w-full bg-yellow-400 text-black font-semibold py-2 rounded-md mt-4 hover:bg-yellow-500 transition flex items-center justify-center gap-2"
      >
        🚘 Proceed to Service Selection
        <ArrowRight className="h-4 w-4" />
      </button>

      {loading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white/60 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
