"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import Book from "../components/Book";

import { useBookContext } from "../context/BookContext";

export default function Books() {
  const { loading, books, getAllBooks, getAllCategories } = useBookContext();

  const [filter, setFilter] = useState("");

  const booksFiltered = books.filter(
    (book) =>
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.category?.name.toLowerCase().includes(filter.toLowerCase())
  );
  useEffect(() => {
    getAllBooks(), getAllCategories();
  }, []);
  return (
    <div className="bg-black text-white p-4  min-h-full ">
      <div className="flex  items-center justify-between mt-4 mb-8">
        <h1 className="text-cyan-500 lg:text-2xl  sm:text-lg">
          All Books ({books.length})
        </h1>
        <Link className=" bg-teal-700 p-1 rounded" href={"/books/new"}>
          Create New Book
        </Link>
      </div>
      <div className="relative w-fit mx-auto">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value.trimStart())}
          placeholder="Search By Title or Category..."
          className="p-2 bg-[#222] rounded outline-none w-[270px] mx-auto block  mb-4"
        />
        <IoSearchOutline className="absolute top-3 right-1 text-lg" />
      </div>

      {loading ? (
        <h2 className="text-center mt-10 text-2xl">Loading...</h2>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 text-left capitalize">
          {booksFiltered.length > 0 ? (
            booksFiltered?.map((book, i) => <Book key={i} book={book} />)
          ) : (
            <h2 className=" text-center text-2xl ">
              There is no book match this title or auther name!
            </h2>
          )}
        </div>
      ) : null}
    </div>
  );
}
