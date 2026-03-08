import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
        }

        const admin = await prisma.admin.findUnique({
            where: { email }
        });

        if (!admin || admin.password !== password) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        // Set session cookie
        const cookieStore = await cookies();
        cookieStore.set("auth_session", JSON.stringify({ id: admin.id, email: admin.email }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[AUTH_LOGIN]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
