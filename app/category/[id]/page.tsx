"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
function Category({ params }: { params: { id: string } }) {
  const route = useRouter();
  const { id } = params;
  const [category, setCategory] = useState({ _id: "", name: "" });
  const [iseUpdate, setIsUpdate] = useState(false);
  async function getCategory() {
    try {
      const res = await axios.get(`/api/categories/${id}`);
      setCategory(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUpdate() {
    try {
      const res = await axios.post(`/api/categories/${id}`, category);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdate(false);
      route.push("/category");
    }
  }
  async function deleteCategory() {
    try {
      const res = await axios.delete(`/api/categories/${id}`);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      route.push("/category");
    }
  }
  useEffect(() => {
    getCategory();
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
            onClick={() => handleUpdate()}
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
          onClick={() => deleteCategory()}
        >
          Delete
        </button>
      </div>
    </>
  );
}

export default Category;
