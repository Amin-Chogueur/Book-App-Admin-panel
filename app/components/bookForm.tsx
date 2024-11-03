import React from "react";
import { useRouter } from "next/navigation";
import { BookType, CategoryType } from "../types/interfaceses";
import Image from "next/image";
import ImageUpload from "./ImageUpload";

interface BookFormType {
  updateBook: (e: React.FormEvent) => Promise<void>;
  book: BookType;
  setBook: React.Dispatch<React.SetStateAction<BookType>>;
  handleRemoveImage: () => void;
  handleImageUpload: (url: string) => void;
  categories: CategoryType[];
}

export default function BookForm({
  updateBook,
  book,
  setBook,
  handleRemoveImage,
  handleImageUpload,
  categories,
}: BookFormType) {
  const router = useRouter();
  return (
    <form onSubmit={updateBook}>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="w-[90%] mx-auto lg:mx-0 flex flex-col lg:w-[50%]">
          <label>Title:</label>
          <input
            type="text"
            placeholder="Title..."
            name="title"
            className="my-3 p-2 rounded outline-none bg-[#222]"
            value={book?.title}
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
            onChange={(e) => setBook({ ...book, description: e.target.value })}
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
  );
}
