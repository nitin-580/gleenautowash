// app/layout.js
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/header';
import RouteChangeLoader from '@/components/RouteChangeLoader';
import { Suspense } from 'react';
import DesktopOverlay from "@/components/DesktopOverlay";

export const metadata: Metadata = {
  title: 'Gleen - Premium Auto Wash & Car Care Services',
  description: 'Gleen offers top-quality car wash, detailing, and auto care services. Convenient doorstep service to keep your vehicle sparkling clean and well-maintained.',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body>
        <Suspense fallback={<div>Loading header...</div>}>
          <Header />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <RouteChangeLoader />
        </Suspense>
        
        {children}
      </body>
    </html>
  );
}