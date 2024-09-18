import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { decryptJWT } from "./app/auth/jwt";

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/'];

export async function middleware(request: NextRequest) {
  const session = cookies().get('HS')?.value;

  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const isLoggedIn = await decryptJWT(session)
  /**
   * if there is no session and they try to access a 
   * protected route redirect the user back to index page
   */
  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  /**
   * wa kaayo ko kasabot
   */
  if (
    isPublicRoute &&
    isLoggedIn?.HS &&
    !request.nextUrl.pathname.startsWith('/dashboard')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // For all other cases, continue with the request
  return NextResponse.next();
}
