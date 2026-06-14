import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Only apply to /admin routes (excluding login)
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    !request.nextUrl.pathname.startsWith("/admin/login")
  ) {
    // Check for Supabase session cookie
    const sbCookie = request.cookies.has("sb-ntagjuwyufomvogkrxqv-auth-token");

    if (!sbCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
