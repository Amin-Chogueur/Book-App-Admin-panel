"use client";
import { useBookContext } from "@/app/context/BookContext";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
function Category({ params }: { params: { id: string } }) {
  const route = useRouter();
  const { id } = params;
  const { category, setCategory, getCategory, UpdateCategory, deleteCategory } =
    useBookContext();
  const [iseUpdate, setIsUpdate] = useState(false);
  useEffect(() => {
    getCategory(id);
  }, []);
  return (
    <>
      <h1 className="text-center text-teal-600 mt-4  text-2xl p-2">
        Update Category
      </h1>
      <div className="w-[90%] my-[50px] lg:w-[70%] flex justify-center  border rounded p-4 mx-auto">
        <div>
          {iseUpdate ? (
            <input
              className="bg-black border p-3 rounded"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
            />
          ) : (
            <h2>{category.name}</h2>
          )}
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center">
        {iseUpdate ? (
          <button
            className="p-1 rounded bg-teal-600"
            onClick={() => UpdateCategory(id)}
          >
            Done
          </button>
        ) : (
          <button
            className="p-1 rounded bg-teal-600"
            onClick={() => setIsUpdate(true)}
          >
            Update
          </button>
        )}

        <button
          className="p-1 rounded bg-red-600"
          onClick={() => deleteCategory(id)}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default Category;
