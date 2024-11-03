"use client";
import axios from "axios";

import { useEffect, useState } from "react";
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
export default function Home() {
  const [username, setUsername] = useState("");
  const [books, setBooks] = useState<Book[]>();
  const [isLoading, setIsLoading] = useState(false);
  async function getname() {
    try {
      setIsLoading(true);
      const res = await axios.get("/api/signup");
      const { username } = res.data[0];
      setUsername(username);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function getAllBooks() {
    try {
      const res = await axios.get("/api/books");
      const books = res.data;
      setBooks(books);
    } catch (error) {
      console.log(error);
    }
  }
  const totalBooks = books?.reduce((acu, cur) => acu + cur.quantity, 0);
  const totalBooksPrice = books?.reduce(
    (acu, cur) => acu + cur.quantity * Number(cur.price),
    0
  );
  useEffect(() => {
    getname();
    getAllBooks();
  }, []);
  return (
    <div className="bg-black text-white px-5 pt-5 pb-10 min-h-[100vh]">
      <h1 className=" text-2xl my-10 text-center">
        Welcome {username} in Your Library{" "}
      </h1>
      {isLoading ? (
        <h3 className="text-2xl text-center p-5">Loading...</h3>
      ) : (
        <table className="border max-w-[95%] mx-auto p-4 overflow-scroll">
          <thead className="text-teal-600 text-center">
            <tr className="p-4 border">
              <td className="p-4 border">Title</td>
              <td className="p-4 border">Category</td>
              <td className="p-4 border">Auther</td>
              <td className="p-4 border">Price</td>
              <td className="p-4 border">Quantity</td>
              <td className="p-4 border">Total</td>
            </tr>
          </thead>
          <tbody>
            {books?.map((book, i) => (
              <tr key={i} className="border p-3 hover:text-teal-600">
                <td className="p-5 border w-[350px]">
                  {i + 1}/ {book.title}
                </td>
                <td className="p-5 border ">{book.category.name}</td>
                <td className="p-5 border ">{book.auther}</td>
                <td className="p-5 border ">{book.price} DA</td>
                <td className="text-center">{book.quantity}</td>
                <td className="p-5 border ">
                  {Number(book.price) * book.quantity} Da
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-red-500">
              <td className="p-5 border" colSpan={4}>
                Total:
              </td>
              <td className="text-center border">{totalBooks}</td>
              <td className="text-center ">{totalBooksPrice} DA</td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}
