"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
type CategoryType = {
  _id: string;
  name: string;
};

type Book = {
  title: string;
  description: string;
  price: string;
  _id: string;
  image: string;
  quantity: number;
  category: CategoryType;
  auther: string;
};

export default function Books() {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [filter, setFilter] = useState("");

  async function getAllCategories() {
    try {
      const res = await axios.get("/api/categories");
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllBooks() {
    try {
      setLoading(true);
      const res = await axios.get("/api/books");
      const books = res.data;
      setBooks(books);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const booksFiltered = books.filter(
    (book) =>
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.category?.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    getAllBooks();
    getAllCategories();
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
            booksFiltered?.map((book, i) => (
              <Link
                href={`/books/${book._id}`}
                key={i}
                className={`rounded border mt-4`}
              >
                <div className="">
                  <Image
                    src={book.image}
                    alt="image"
                    width={250}
                    height={200}
                    className="m-auto mb-3"
                  />
                  <h3 className="text-center text-teal-500">{book.title}</h3>
                </div>
                <div className="p-2 flex-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3>
                      <span className="text-teal-500 ">Category:</span>{" "}
                      {book.category?.name}
                    </h3>
                  </div>

                  <p className="mb-2">
                    <span className="text-teal-500 ">Description :</span>{" "}
                    {book.description.slice(0, 150)}...
                  </p>

                  <h3>
                    <span className="text-teal-500 ">Auther :</span>{" "}
                    {book.auther}
                  </h3>

                  <div className="flex items-center justify-between mt-2">
                    {" "}
                    <h3>
                      <span className="text-teal-500 ">Price :</span>{" "}
                      {book.price} DA
                    </h3>
                    <h3>
                      <span className="text-teal-500 ">Quantiy :</span>{" "}
                      {book.quantity}
                    </h3>
                  </div>
                </div>
              </Link>
            ))
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
