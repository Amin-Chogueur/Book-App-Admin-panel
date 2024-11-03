"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
type Book = {
  username: string;
  email: string;
  password: string;
  gender: string;
  _id: string;
  category: Categories;
  colors: string[];
};

interface Categories {
  _id: string;
  name: string;
}

export default function Categories() {
  const route = useRouter();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [books, setBooks] = useState<Book[]>();
  const [filter, setFilter] = useState("");
  async function getAllBooks() {
    try {
      const res = await axios.get("/api/books");
      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAllCategories() {
    try {
      const res = await axios.get("/api/categories");
      const categoreis = res.data;
      setCategories(categoreis);
    } catch (error) {
      console.log(error);
    }
  }

  const filteredcategory = categories.filter((category) =>
    category.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    getAllBooks();
    getAllCategories();
  }, []);

  return (
    <div className="pb-10">
      <div className="flex  items-center justify-between mt-4 mb-8 p-4">
        <h1 className="text-cyan-500 lg:text-2xl  sm:text-lg">
          All Category ({categories.length})
        </h1>
        <Link className=" bg-teal-700 p-1 rounded" href={"/category/new"}>
          Create New Category
        </Link>
      </div>
      <div className="relative w-fit mx-auto">
        <IoSearchOutline className="absolute top-3 right-1 text-lg" />
        <input
          placeholder="Search..."
          className="p-2 bg-[#222] rounded outline-none w-[270px] mx-auto block mb-4"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table className="w-[90%]  lg:w-[60%]  mt-10 mx-auto border border-gray-300 text-center shadow-md rounded-lg">
        <thead className="bg-teal-600 text-white">
          <tr>
            <th className="p-4 border-b">Name</th>
            <th className="p-4 border-b">Books</th>
          </tr>
        </thead>
        <tbody>
          {filteredcategory.map((category, i) => {
            const numberOfBooks = books?.filter(
              (book) => book.category?.name === category.name
            ).length;

            return (
              <tr
                key={category._id}
                onClick={() => route.push(`/category/${category._id}`)}
                className="cursor-pointer hover:bg-black"
              >
                <td className="p-4 border-b">{category.name}</td>
                <td className="p-4 border-b">{numberOfBooks}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
