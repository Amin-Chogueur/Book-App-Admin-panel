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
    return NextResponse.json("user created successefuly", newBook);
  } catch (error: any) {
    console.log("erro creating new user", error);
  }
}
