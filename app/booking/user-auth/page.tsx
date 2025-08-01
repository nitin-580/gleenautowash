import { Suspense } from "react";
import UserAuthForm from "./UserAuth";

export default function UserAuthPage() {
  return (
    <div className=" mx-auto text-center">
      <Suspense fallback={<p>Loading authentication...</p>}>
        <UserAuthForm />
      </Suspense>
    </div>
  );
}
