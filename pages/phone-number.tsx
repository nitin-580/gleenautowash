"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase"; // adjust path as needed
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";

declare global {
    interface Window {
      recaptchaVerifier: RecaptchaVerifier;
    }
  }

export default function PhoneVerification() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            // reCAPTCHA solved - will proceed with submitPhoneNumber
            console.log("reCAPTCHA solved", response);
          },
          "expired-callback": () => {
            setMessage("reCAPTCHA expired, please try again.");
          },
        },
      );
    }
  }, []);

  const sendOtp = async () => {
    setMessage("");
    if (!phoneNumber.match(/^\+\d{10,15}$/)) {
      setMessage("Enter phone number in E.164 format (e.g. +919876543210)");
      return;
    }

    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setConfirmationResult(result);
      setMessage("OTP sent! Please check your phone.");
    } catch (error: any) {
      setMessage("Error sending OTP: " + error.message);
    }
  };

  const verifyOtp = async () => {
    if (!confirmationResult) {
      setMessage("Please request OTP first.");
      return;
    }

    try {
      const result = await confirmationResult.confirm(otp);
      setMessage("Phone number verified! User UID: " + result.user.uid);
    } catch (error: any) {
      setMessage("Invalid OTP: " + error.message);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Phone Number Verification</h2>

      <div id="recaptcha-container"></div>

      <div>
        <input
          type="tel"
          placeholder="+919876543210"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        />
        <button onClick={sendOtp} style={{ width: "100%", padding: 10 }}>
          Send OTP
        </button>
      </div>

      {confirmationResult && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 12 }}
          />
          <button onClick={verifyOtp} style={{ width: "100%", padding: 10, marginTop: 8 }}>
            Verify OTP
          </button>
        </>
      )}

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
