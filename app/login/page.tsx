"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
export default function Login() {
  const route = useRouter();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  async function handleLogin(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", userInfo);
      console.log(res.data);
      route.push("/");
      window.location.reload();
    } catch (error: any) {
      console.log(error.message);
    }
  }
  return (
    <div className="absolute bg-black opacity-80 h-full w-full top-0 left-0  flex flex-col items-center justify-center">
      <h1 className="mb-5 text-2xl text-teal-600">Login page</h1>
      <form className="flex flex-col  justify-center gap-3">
        <div className="flex flex-col  justify-center gap-1">
          <label htmlFor="email">Email</label>
          <input
            className="p-1 bg-[#222] rounded outline-none"
            id="email"
            type="email"
            value={userInfo.email}
            placeholder="email..."
            onChange={(e) =>
              setUserInfo({ ...userInfo, email: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col  justify-center gap-1">
          <label htmlFor="password">Password</label>
          <input
            className="p-1 bg-[#222] rounded outline-none"
            id="password"
            type="password"
            value={userInfo.password}
            placeholder="password..."
            onChange={(e) =>
              setUserInfo({ ...userInfo, password: e.target.value })
            }
          />
        </div>
        <button onClick={handleLogin} className="bg-teal-600 p-1 rounded">
          Login
        </button>
        <p>
          you don`t have account{" "}
          <Link className="text-teal-600" href={"/signup"}>
            SignUp
          </Link>
        </p>
        <Link className="text-teal-600" href={"/forgot-password"}>
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}
