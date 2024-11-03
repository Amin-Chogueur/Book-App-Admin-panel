"use client";

import axios from "axios";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, FormEvent } from "react";
import ImageUpload from "@/app/components/ImageUpload";

// Define types for user and category
type BookType = {
  title: string;
  description: string;
  price: string;
  auther: string;
  _id: string;
  image: string;
  quantity: number;
  category: CategoryType; // Assume category is stored as a name string
};

type CategoryType = {
  _id: string;
  name: string;
};

export default function User({ params }: { params: { id: string } }) {
  const [isUpdate, setIsUpdate] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const bookId = params.id;
  const router = useRouter();
  const [book, setBook] = useState<BookType>({
    title: "",
    description: "",
    price: "",
    auther: "",
    image: "",
    quantity: 0,
    _id: "",
    category: { _id: "", name: "" },
  });

  async function getCategories() {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function getBook() {
    try {
      setIsloading(true);
      const res = await axios.get(`/api/books/${bookId}`);
      setBook(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsloading(false);
    }
  }

  async function deleteBook() {
    try {
      await axios.delete(`/api/books/${bookId}`);
      router.push("/books");
    } catch (error) {
      console.error(error);
    }
  }

  async function updateBook(e: FormEvent) {
    e.preventDefault();
    try {
      const selectedCategory = categories.find(
        (category) => category.name === book.category?.name
      );

      const updatedBook = {
        ...book,
        category: selectedCategory?._id,
      };
      console.log(selectedCategory);
      await axios.patch(`/api/books/${bookId}`, updatedBook);
      router.push("/books");
    } catch (error) {
      console.error(error);
    }
  }

  const handleImageUpload = (url: string) => {
    setBook((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
  };

  const handleRemoveImage = () => {
    setBook((prevFormData) => ({
      ...prevFormData,
      image: "", // Clear the image URL
    }));
  };
  useEffect(() => {
    getBook();
    getCategories();
  }, []);

  return (
    <div>
      <div className={`my-5 mx-auto  rounded p-6 leading-10`}>
        <h1 className="text-teal-600 text-2xl text-center mb-10">
          Update Book
        </h1>
        {isLoading ? (
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
                  onClick={deleteBook}
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
          <form onSubmit={updateBook}>
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <div className="w-[90%] mx-auto lg:mx-0 flex flex-col lg:w-[50%]">
                <label>Title:</label>
                <input
                  type="text"
                  placeholder="Title..."
                  name="title"
                  className="my-3 p-2 rounded outline-none bg-[#222]"
                  value={book.title}
                  required
                  onChange={(e) => setBook({ ...book, title: e.target.value })}
                />
                <label>Description:</label>
                <textarea
                  placeholder="Description..."
                  name="description"
                  required
                  className="my-3 p-2 rounded outline-none bg-[#222] w-[100%] h-[300px]"
                  value={book.description}
                  onChange={(e) =>
                    setBook({ ...book, description: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col items-center gap-5">
                {book.image ? (
                  <div className="relative w-fit mx-auto">
                    <Image
                      className="mx-auto my-4 border rounded"
                      src={book.image}
                      width={230}
                      height={230}
                      alt="uploadImage"
                    />
                    <span
                      onClick={handleRemoveImage}
                      className="absolute top-4 right-0 bg-red-600 p-2 cursor-pointer"
                    >
                      ✖
                    </span>
                  </div>
                ) : (
                  <div className="w-[200px] h-[200px] border  flex justify-center items-center">
                    Book Image
                  </div>
                )}
                <ImageUpload onImageUpload={handleImageUpload} />
              </div>
            </div>
            <br />
            <div className="w-[100%] mx-auto lg:mx-0 lg:w-[100%] flex flex-col lg:flex-row lg:justify-between">
              <div className=" text-center">
                <label className="block">Auther:</label>
                <input
                  type="text"
                  placeholder="Auther..."
                  name="auther"
                  required
                  className="my-3 p-2 rounded outline-none bg-[#222]"
                  value={book.auther}
                  onChange={(e) => setBook({ ...book, auther: e.target.value })}
                />
              </div>
              <br />
              <div className=" text-center">
                <label className="block"> Price:</label>
                <input
                  type="text"
                  placeholder="price..."
                  name="price"
                  required
                  className="my-3 p-2 mx-auto rounded outline-none bg-[#222]"
                  value={book.price}
                  onChange={(e) => setBook({ ...book, price: e.target.value })}
                />
              </div>
              <br />
              <div className=" text-center">
                <label className="block">Category:</label>
                <select
                  className="text-black p-1 my-3 outline-none rounded"
                  id="category"
                  name="category"
                  value={book.category._id}
                  onChange={(e) => {
                    const selectedCategory = categories.find(
                      (category) => category._id === e.target.value
                    );
                    setBook({
                      ...book,
                      category: {
                        _id: selectedCategory?._id || "",
                        name: selectedCategory?.name || "",
                      },
                    });
                  }}
                >
                  <option value="" disabled hidden>
                    choose category...
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="w-[240px] mx-auto text-center">
              <label className="block"> Quantiry:</label>
              <input
                type="number"
                placeholder="Quantity..."
                name="quantity"
                required
                className="block w-[100%]   my-4 p-2 rounded outline-none bg-[#222]"
                value={book.quantity}
                onChange={(e) =>
                  setBook({ ...book, quantity: Number(e.target.value) })
                }
              />
            </div>
            <br />
            <div className="text-center">
              <button
                type="submit"
                className=" bg-green-800 inline-block w-[150px] mx-auto p-2 rounded mt-3 "
              >
                DONE
              </button>
              <button
                onClick={() => router.push("/books")}
                type="button"
                className=" bg-green-800 inline-block ml-3 w-[150px] mx-auto p-2 rounded mt-3 "
              >
                DISCARD
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
{
  /* <div className="bg-black text-white p-6  min-h-full">
  <h1 className="text-cyan-500 text-2xl my-3">Create New Book</h1>

  
</div>; */
}
