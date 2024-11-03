import { connectToDB } from "@/app/lib/connectDB";
import Book from "@/app/lib/models/bookModel";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  try {
    const books = await Book.find().populate("category", "name");
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    return NextResponse.json("error fetching data", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectToDB();
  try {
    const data = await req.json();
    console.log(data);
    const { title, description, auther, price, category, quantity, image } =
      data;
    const existingBook = await Book.findOne({ title });
    if (existingBook) {
      return NextResponse.json(
        { message: "Book already exists" },
        { status: 400 }
      );
    }
    if (!category || !image) {
      return NextResponse.json(
        { message: "Please fill out All the fields" },
        { status: 400 }
      );
    }
    const newBook = new Book({
      title,
      description,
      auther,
      price,
      category,
      quantity,
      image,
    });
    await newBook.save();
    return NextResponse.json(
      { message: "Book created successefuly" },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("erro creating new Book", error);
  }
}
