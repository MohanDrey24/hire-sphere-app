import { NextResponse } from "next/server";

const isLoggedIn: boolean = false
// not yet working
export function middleware(request: Request) {
  if (isLoggedIn) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url))
}