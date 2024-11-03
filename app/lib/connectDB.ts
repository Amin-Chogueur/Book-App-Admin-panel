import mongoose from "mongoose";

export async function connectToDB() {
  const connectioState = mongoose.connection.readyState;
  if (connectioState === 1) {
    console.log("alredy connected");
    return;
  }
  if (connectioState === 2) {
    console.log("connecting...");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: "bookappdashboard",
    });
    console.log("db connected");
  } catch (error: any) {
    console.log("error: ", error);
    throw new Error(error);
  }
}
