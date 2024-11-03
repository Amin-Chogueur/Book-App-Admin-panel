"use client";
import { useBookContext } from "@/app/context/BookContext";
import React from "react";

export default function NewCategory() {
  const { name, setName, handleSubmitNewCategory } = useBookContext();

  return (
    <div className="text-center">
      <h1 className="text-teal-600 my-3 p-4 text-2xl ">Create New Category</h1>

      <form className="p-4" onSubmit={handleSubmitNewCategory}>
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
