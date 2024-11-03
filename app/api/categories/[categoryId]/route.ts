import { connectToDB } from "@/app/lib/connectDB";
import Category from "@/app/lib/models/categoryModel";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
connectToDB();

export async function GET(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  try {
    const data = await Category.findById(categoryId);
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  const { categoryId } = params;
  try {
    const newCategory = await req.json();
    const res = await Category.findByIdAndUpdate(categoryId, newCategory);
    return NextResponse.json(
      { message: "user updated successfuly" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params;
    await Category.findByIdAndDelete(categoryId);
    return NextResponse.json(
      { message: "user deleted successfuly" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json("something went wrong", { status: 500 });
  }
}
