// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmIFJSw4lTVnMG_dv7QdSF83WpZ3z5AIA",
  authDomain: "gleen-8e308.firebaseapp.com",
  projectId: "gleen-8e308",
  storageBucket: "gleen-8e308.firebasestorage.app",
  messagingSenderId: "888725469964",
  appId: "1:888725469964:web:f2d10da4b2014335b32729",
  measurementId: "G-D31XHZCK0L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize the required Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

// ✅ Export them
export { auth, db, analytics,provider };
