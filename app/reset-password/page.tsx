"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setError("Invalid token");
      return;
    }

    const res = await axios.post("/api/reset-password-confirm", {
      password,
      token,
    });
    if (res) {
      setMessage("Password reset successful. You can log in now.");
      router.push("/login");
    } else {
      setError("error");
    }
  };

  return (
    <div className="flex flex-col  justify-center gap-3 w-[300px] mx-auto my-[100px] text-center">
      <h2>Reset Password</h2>
      {message && <p className="text-red-600 text-lg">{message}</p>}
      {error && <p className="text-red-600 text-lg">{error}</p>}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  justify-center gap-3"
      >
        <input
          className=" p-1 rounded outline bg-[#222]"
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="p-1 bg-teal-600 rounded mt-2">
          Reset Password
        </button>
      </form>
    </div>
  );
}
