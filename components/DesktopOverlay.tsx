"use client";

import { useEffect, useState } from "react";

export default function DesktopOverlay() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white text-center px-4">
      <div>
        <h1 className="text-2xl font-semibold mb-2">📱 Please open this site on your mobile</h1>
        <p className="text-lg">We are currently accepting orders through our mobile version only.<br />Web ordering will be available soon!</p>
      </div>
    </div>
  );
}
