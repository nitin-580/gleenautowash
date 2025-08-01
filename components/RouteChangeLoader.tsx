"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function RouteChangeLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const lastPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== lastPathname.current) {
      setLoading(true);

      // simulate loading time (you can remove this if you want to wait for something else)
      const timeout = setTimeout(() => {
        setLoading(false);
        lastPathname.current = pathname;
      }, 500); // adjust delay if you want

      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="w-16 h-16 border-4 border-t-yellow-400 border-yellow-200 rounded-full animate-spin"></div>
    </div>
  );
}
