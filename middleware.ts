import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublic =
    path === "/login" ||
    path === "/signup" ||
    path === "/forgot-password" ||
    path === "/reset-password";
  const token = request.cookies.get("token")?.value || "";

  // If the user has a token and tries to access a public page, redirect to home
  if (isPublic && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // If the user doesn't have a token and tries to access a protected page, redirect to login
  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/",
    "/books",
    "/books/:path*",
    "/books/new",
    "/category",
    "/category/:path*",
    "/category/new",
    "/signup",
    "/login",
    "/forgot-password",
    "/reset-password",
  ],
};
