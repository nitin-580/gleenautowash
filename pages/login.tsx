// pages/login.tsx
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      alert("✅ Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ Login failed");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Login Page</h2>
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Login with Google
      </button>
    </div>
  );
}
