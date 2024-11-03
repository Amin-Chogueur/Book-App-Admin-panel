"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function NewCategory() {
  const route = useRouter();
  const [name, setName] = useState("");
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/categories", { name });
      route.push("/category");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="text-center">
      <h1 className="text-teal-600 my-3 p-4 text-2xl ">Create New Category</h1>

      <form className="p-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name..."
          name="name"
          className="my-3 p-2 rounded outline-none bg-[#222]"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button type="submit" className="bg-green-800 p-1 rounded mt-3">
          Create
        </button>
      </form>
    </div>
  );
}
