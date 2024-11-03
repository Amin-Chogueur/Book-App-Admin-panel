"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ImageUpload from "@/app/components/ImageUpload";

type FormDataType = {
  title: string;
  description: string;
  price: string;
  category: string;
  image: string;
  quantity: number;
  auther: string;
};

type CategoryType = {
  _id: string;
  name: string;
};

export default function NewUser() {
  const route = useRouter();
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    price: "",
    auther: "",
    category: "",
    image: "",
    quantity: 0,
  });

  async function getCategories() {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data); // Assuming the response is an array of categories
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post("/api/books", formData);
      console.log(res.data);
      route.push("/books");
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({
        title: "",
        description: "",
        price: "",
        auther: "",
        category: "",
        image: "",
        quantity: 0,
      });
    }
  }

  const handleImageUpload = (url: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: url,
    }));
  };

  const handleRemoveImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: "", // Clear the image URL
    }));
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="bg-black text-white p-6  min-h-full">
      <h1 className="text-cyan-500 text-2xl my-3 text-center">
        Create New Book
      </h1>

      <form onSubmit={handleSubmit}>
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
