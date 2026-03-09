import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const session = request.cookies.get("auth_session");
    const { pathname } = request.nextUrl;

    if (pathname === "/login" && session) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    const isPublicApi =
        pathname === "/api/chambers" && request.method === "GET" ||
        pathname === "/api/availability" && request.method === "GET" ||
        pathname === "/api/patients" && request.method === "POST" ||
        pathname === "/api/appointments" && request.method === "POST" ||
        pathname.startsWith("/api/auth") ||
        pathname.startsWith("/api/seed");

    const isProtectedRoute = pathname.startsWith("/dashboard") || (pathname.startsWith("/api") && !isPublicApi);

    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*", "/login"],
};
