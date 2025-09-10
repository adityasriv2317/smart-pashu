import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await connectDB();
  try {
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET);
    const userId = decodedToken.userId || decodedToken.id || decodedToken._id;
    if (!userId) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.error("Error in profile API:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
