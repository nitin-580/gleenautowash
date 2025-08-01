import { Suspense } from "react";
import CarCompanyForm from "./CarCompany";
import CarCompanySelector from "./CarCompany";

export default function CarCompanyPage() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Booking: Car Company</h1>

      {/* Wrap Client Component with Suspense */}
      <Suspense fallback={<p>Loading form...</p>}>
        <CarCompanySelector/>
      </Suspense>
    </div>
  );
}
