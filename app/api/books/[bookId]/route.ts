import { connectToDB } from "@/app/lib/connectDB";
import Book from "@/app/lib/models/bookModel";
import { NextRequest, NextResponse } from "next/server";

connectToDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params;
    const res = await Book.findById(bookId).populate("category", "name");
    if (!res) {
      return NextResponse.json("Oops! there is no user with this id", {
        status: 500,
      });
    }
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json("error fetching data", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params;
    const res = await Book.findByIdAndDelete(bookId);
    return NextResponse.json(
      { message: "Book deleted successfuly" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { err: "error while delete Book" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params;
    const book = await req.json();
    const { title } = book;
    const existBook = await Book.findOne({ title });
    if (existBook) {
      return NextResponse.json(
        { message: "Book Alraedy exists" },
        { status: 400 }
      );
    }
    await Book.findByIdAndUpdate(bookId, book);
    return NextResponse.json(
      { message: "Book updated successfuly" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "error when update Book" },
      { status: 500 }
    );
  }
}
