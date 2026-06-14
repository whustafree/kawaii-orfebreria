import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    // Check for auth session cookie (set by Supabase on login)
    const hasSession = request.cookies.has("sb-ntagjuwyufomvogkrxqv-auth-token");

    if (!hasSession) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next({ request });
}

export const config = {
  matcher: ["/admin/:path*"],
};
