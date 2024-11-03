"use client";
import Image from "next/image";
import React from "react";
import ImageUpload from "@/app/components/ImageUpload";
import { useBookContext } from "@/app/context/BookContext";

export default function NewBook() {
  const { categories, handleSubmitNewBook, formData, setFormData } =
    useBookContext();

  const handleImageUpload = (url: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: "",
    }));
  };

  return (
    <div className="bg-black text-white p-6  min-h-full">
      <h1 className="text-cyan-500 text-2xl my-3 text-center">
        Create New Book
      </h1>

      <form onSubmit={handleSubmitNewBook}>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="w-[90%] mx-auto lg:mx-0 flex flex-col lg:w-[50%]">
            <input
              type="text"
              placeholder="title..."
              name="title"
              className="my-3 p-2 rounded outline-none bg-[#222]"
              value={formData.title}
              required
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              placeholder="description..."
              name="description"
              required
              className="my-3 p-2 rounded outline-none bg-[#222] w-[100%] h-[200px]"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col items-center gap-5">
            {formData.image ? (
              <div className="relative w-fit mx-auto">
                <Image
                  className="mx-auto my-4 border rounded"
                  src={formData.image}
                  width={200}
                  height={200}
                  alt="uploadImage"
                />
                <span
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-600 p-1 cursor-pointer"
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
        <div className="w-[60%] mx-auto lg:mx-0 lg:w-[100%] flex flex-col lg:flex-row lg:justify-between">
          <input
            type="text"
            placeholder="auther..."
            name="auther"
            required
            className="my-3 p-2 rounded outline-none bg-[#222]"
            value={formData.auther}
            onChange={(e) =>
              setFormData({ ...formData, auther: e.target.value })
            }
          />
          <br />
          <input
            type="text"
            placeholder="price..."
            name="price"
            required
            className="my-3 p-2 rounded outline-none bg-[#222]"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
          />
          <br />
          <select
            className="text-black p-1 my-3 outline-none rounded"
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
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
        <input
          type="number"
          placeholder="Quantity..."
          name="quantity"
          required
          className="block w-[60%] mx-auto lg:mx-0 lg:w-[21%] my-4 p-2 rounded outline-none bg-[#222] "
          value={formData.quantity}
          onChange={(e) =>
            setFormData({ ...formData, quantity: Number(e.target.value) })
          }
        />

        <button
          type="submit"
          className="bg-green-800 block w-[150px] mx-auto p-2 rounded mt-3 "
        >
          Create
        </button>
      </form>
    </div>
  );
}
