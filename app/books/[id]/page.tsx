"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import BookForm from "@/app/components/bookForm";
import { useBookContext } from "@/app/context/BookContext";

export default function Book({ params }: { params: { id: string } }) {
  const bookId = params.id;
  const {
    categories,
    loading,
    book,
    setBook,
    getBook,
    deleteBook,
    updateBook,
  } = useBookContext();
  const [isUpdate, setIsUpdate] = useState(false);

  const handleImageUpload = (url: string) => {
    setBook((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
  };

  const handleRemoveImage = () => {
    setBook((prevFormData) => ({
      ...prevFormData,
      image: "",
    }));
  };
  useEffect(() => {
    getBook(bookId);
  }, []);
  return (
    <div>
      <div className={`my-5 mx-auto  rounded p-6 leading-10`}>
        <h1 className="text-teal-600 text-2xl text-center mb-10">
          Update Book
        </h1>
        {loading ? (
          <h2 className="text-2xl text-center">Loading...</h2>
        ) : !isUpdate ? (
          <div className="lg:grid lg:grid-cols-2 ">
            <div className="mx-auto lg:mx-0 w-fit">
              <Image
                src={book.image}
                alt="image"
                width={300}
                height={200}
                className="mx-auto lg:mx-0 mb-5"
              />
              <div className="hidden lg:block">
                <h3>
                  <span className="text-teal-500 ">Auther :</span> {book.auther}
                </h3>
                <h3>
                  <span className="text-teal-500 ">Category:</span>{" "}
                  {book.category?.name}
                </h3>
                <h3>
                  <span className="text-teal-500 ">Quantiy :</span>{" "}
                  {book.quantity}
                </h3>

                <h3>
                  <span className="text-teal-500 ">Price :</span> {book.price}{" "}
                  DA
                </h3>
              </div>
            </div>
            <div className=" lg:ml-[-80px]">
              <h3 className="text-lg lg:text-2xl mb-3">
                <span className="text-teal-500">Title :</span> {book.title}
              </h3>
              <p>
                <span className="text-teal-500 ">Description :</span>{" "}
                {book.description}
              </p>
              <div className="block lg:hidden">
                <h3>
                  <span className="text-teal-500 ">Auther :</span> {book.auther}
                </h3>
                <h3>
                  <span className="text-teal-500 ">Category:</span>{" "}
                  {book.category?.name}
                </h3>
                <h3>
                  <span className="text-teal-500 ">Quantiy :</span>{" "}
                  {book.quantity}
                </h3>

                <h3>
                  <span className="text-teal-500 ">Price :</span> {book.price}{" "}
                  DA
                </h3>
              </div>
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => deleteBook(bookId)}
                  className="bg-teal-600 p-1 rounded"
                >
                  DELETE
                </button>
                <button
                  className="bg-teal-600 p-1 rounded"
                  onClick={() => {
                    setIsUpdate((prev) => !prev);
                    console.log(book);
                  }}
                >
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        ) : (
          <BookForm
            updateBook={(e) => updateBook(e, bookId)}
            book={book}
            setBook={setBook}
            handleRemoveImage={handleRemoveImage}
            handleImageUpload={handleImageUpload}
            categories={categories}
          />
        )}
      </div>
    </div>
  );
}
