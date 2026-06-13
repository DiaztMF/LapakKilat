import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Daftar rute yang harus dilindungi middleware global
  const isProtectedPath =
    pathname.startsWith("/dashboard") || pathname.startsWith("/api/upload");

  if (isProtectedPath) {
    const sessionCookie =
      request.cookies.get("better-auth.session_token") ||
      request.cookies.get("__Secure-better-auth.session_token");

    if (!sessionCookie?.value) {
      // Jika request API, kembalikan 401
      if (pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
      
      // Jika request halaman, redirect ke /login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (Better Auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
