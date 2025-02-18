import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { verifyJwt } from "./app/auth/jwt";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/"];

export async function middleware(request: NextRequest) {
  const session = cookies().get("HS")?.value;

  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isLoggedIn = await verifyJwt(session);

  /**
   * if there is no session and they try to access a
   * protected route redirect the user back to index page
   */
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  /**
   * if you have a session then you are forced to redirect to dashboard
   */
  if (
    isPublicRoute &&
    isLoggedIn?.id &&
    !request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // For all other cases, continue with the request
  return NextResponse.next();
}
