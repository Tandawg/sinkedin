import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });

  // Adjust the redirection to use an absolute URL
  if (!token) {
    const {
      nextUrl: { origin },
    } = request;
    return NextResponse.redirect(`${origin}/home`);
  }

  // If user is authenticated, continue
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
