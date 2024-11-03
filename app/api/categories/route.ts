import { connectToDB } from "@/app/lib/connectDB";
import Category from "@/app/lib/models/categoryModel";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  try {
    const categories = await Category.find({});
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
export async function POST(req: NextRequest) {
  await connectToDB();
  try {
    const data = await req.json();
    const { name } = data;
    console.log(name);
    const newCategory = new Category({ name });
    await newCategory.save();
    return NextResponse.json("category created successfely", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("error when creating new category", {
      status: 500,
    });
  }
}
