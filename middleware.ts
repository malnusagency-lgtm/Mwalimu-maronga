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

  // Check session cookie presence
  const sessionCookie = req.cookies.get(SESSION_COOKIE)?.value;

  if (!sessionCookie || sessionCookie.trim() === "") {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
