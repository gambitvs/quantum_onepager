import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/research",
  "/trading",
  "/risk",
  "/models",
  "/lab",
  "/investor",
  "/settings",
  "/admin",
];

// Routes that require specific roles
const roleRoutes: Record<string, string[]> = {
  "/admin": ["admin"],
  "/research": ["admin", "researcher"],
  "/trading": ["admin", "researcher"],
  "/investor": ["admin", "investor"],
};

export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Check if route requires authentication
  const isProtectedRoute = protectedRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/auth/login", nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  if (isAuthenticated && userRole) {
    for (const [route, allowedRoles] of Object.entries(roleRoutes)) {
      if (
        nextUrl.pathname.startsWith(route) &&
        !allowedRoles.includes(userRole)
      ) {
        return NextResponse.redirect(new URL("/unauthorized", nextUrl.origin));
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/auth (auth endpoints)
     * - api/market (public market data)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (public files)
     * - / (landing page)
     * - /demo (public demo)
     * - /thesis (public thesis)
     */
    "/((?!api/auth|api/market|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|$|demo|thesis).*)",
  ],
};
