import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const isAuthenticated = request.cookies.get("auth");

  // Public paths that don't require authentication
  const publicPaths = ["/login"];

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // Redirect to login if accessing protected route without auth
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redirect to pokemon list if accessing login while authenticated
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL("/pokemon", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
