import { Suspense } from "react";
import BookingConfirmation from "./BookingConfirmation";

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading confirmation...</div>}>
      <BookingConfirmation />
    </Suspense>
  );
}
