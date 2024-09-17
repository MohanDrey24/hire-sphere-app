import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode('YAWAKAAYO123')

export async function middleware(request: NextRequest) {
  const session = cookies().get('HS')?.value

  // if there is no session redirect to home page
  if (!session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    // verify jwt
    await jwtVerify(session, secret, { algorithms: ['HS256'] })

    // If verification is successful and the user is trying to access the home page,
    // redirect to the dashboard
    if (request.nextUrl.pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } catch (error) {
     // If JWT verification fails, redirect to the home page
    return NextResponse.redirect(new URL('/', request.url))
  }

  // For all other cases, continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard'],
};