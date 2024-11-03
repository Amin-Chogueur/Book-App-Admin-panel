"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Signup() {
  const route = useRouter();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  async function handleSignup(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/signup", userInfo);
      const data = res.data;
      console.log(data);
      route.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="absolute bg-black opacity-80 h-full w-full top-0 left-0  flex flex-col items-center justify-center">
      <h1 className="mb-5 text-2xl text-teal-600">SignUp page</h1>
      <form className="flex flex-col  justify-center gap-3">
        <div className="flex flex-col  justify-center gap-1">
          <label htmlFor="username">UserName</label>
          <input
            className="p-1 bg-[#222] rounded outline-none"
            id="username"
            type="text"
            value={userInfo.username}
            placeholder="username..."
            onChange={(e) =>
              setUserInfo({ ...userInfo, username: e.target.value })
            }
          />
        </div>
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
        <button onClick={handleSignup} className="bg-teal-600 p-1 rounded">
          SignUp
        </button>
        <p>
          you already have account{" "}
          <Link className="text-teal-600" href={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
