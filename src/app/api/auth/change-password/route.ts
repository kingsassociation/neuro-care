import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { oldPassword, newPassword } = await req.json();

        if (!oldPassword || !newPassword) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const session = cookieStore.get("auth_session");

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const sessionData = JSON.parse(session.value);
        const admin = await prisma.admin.findUnique({
            where: { id: sessionData.id }
        });

        if (!admin || admin.password !== oldPassword) {
            return NextResponse.json({ error: "Invalid old password" }, { status: 400 });
        }

        await prisma.admin.update({
            where: { id: admin.id },
            data: { password: newPassword }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[AUTH_CHANGE_PASSWORD]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
