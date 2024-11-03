"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(email);
    const res = await axios.post("/api/reset-password", { email });

    if (res) {
      setMessage("Password reset link has been sent to your email.");
    } else {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col  justify-center gap-3 w-[300px] mx-auto my-[100px] text-center">
      <h2>Forgot Password</h2>
      {message && <p className="text-red-600 text-lg">{message}</p>}
      {error && <p className="text-red-600 text-lg">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  justify-center gap-3"
      >
        <input
          className=" p-1 rounded outline bg-[#222]"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="p-1 bg-teal-600 rounded mt-2">
          Send Reset Link
        </button>
        <p>
          you remember the password ?{" "}
          <Link href={"/login"} className=" underline text-teal-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
