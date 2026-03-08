import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const session = request.cookies.get("auth_session");
    const { pathname } = request.nextUrl;

    // 1. If user is trying to access login page while authenticated, redirect to dashboard
    if (pathname === "/login" && session) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // 2. If user is trying to access protected routes without session, redirect to login
    const isProtectedRoute = pathname.startsWith("/dashboard") || (pathname.startsWith("/api") && !pathname.startsWith("/api/auth") && !pathname.startsWith("/api/seed"));

    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*", "/login"],
};
