import Link from "next/link";
import React from "react";
import Image from "next/image";
import { BookType } from "../types/interfaceses";

export default function Book({ book }: { book: BookType }) {
  return (
    <Link href={`/books/${book._id}`} className={`rounded border mt-4`}>
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
          <span className="text-teal-500 ">Auther :</span> {book.auther}
        </h3>

        <div className="flex items-center justify-between mt-2">
          {" "}
          <h3>
            <span className="text-teal-500 ">Price :</span> {book.price} DA
          </h3>
          <h3>
            <span className="text-teal-500 ">Quantiy :</span> {book.quantity}
          </h3>
        </div>
      </div>
    </Link>
  );
}
