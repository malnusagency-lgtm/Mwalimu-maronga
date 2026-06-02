import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "mm_admin_session";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Pass current pathname to request headers so Server Component layouts can read it
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", pathname);

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginPage = pathname === "/admin/login";
  const isAdminApi = pathname.startsWith("/api/admin");

  if (isAdminRoute && !isLoginPage && !isAdminApi) {
    // Check session cookie presence
    const sessionCookie = req.cookies.get(SESSION_COOKIE)?.value;

    if (!sessionCookie || sessionCookie.trim() === "") {
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
