import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "mm_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (not /admin/login or admin API)
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin");

  if (!isAdminRoute || isLoginPage || isAdminApi) {
    return NextResponse.next();
  }

  // Check session cookie
  const sessionCookie = req.cookies.get(SESSION_COOKIE)?.value;

  if (!sessionCookie) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // We do lightweight presence check here; full HMAC verify happens in API routes
  // (middleware runs on edge runtime which has limited crypto support)
  // The token structure is: base64payload.hexsig — just check it looks right
  const parts = sessionCookie.split(".");
  if (parts.length !== 2) {
    const loginUrl = new URL("/admin/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
