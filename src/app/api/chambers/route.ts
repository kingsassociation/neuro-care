import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const chamberSchema = z.object({
    name: z.string().min(1, "Name is required"),
    type: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone is required"),
});

export async function GET() {
    try {
        const chambers = await prisma.chamber.findMany({
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                type: true,
                address: true,
                phone: true,
            }
        });
        return NextResponse.json(chambers);
    } catch (error) {
        console.error("[API_CHAMBERS_GET]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = chamberSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const chamber = await prisma.chamber.create({
            data: validation.data
        });

        return NextResponse.json(chamber);
    } catch (error) {
        console.error("[API_CHAMBERS_POST]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, ...data } = body;

        if (!id) {
            return NextResponse.json({ error: "Chamber ID is required" }, { status: 400 });
        }

        const validation = chamberSchema.partial().safeParse(data);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const chamber = await prisma.chamber.update({
            where: { id },
            data: validation.data
        });

        return NextResponse.json(chamber);
    } catch (error) {
        console.error("[API_CHAMBERS_PATCH]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Chamber ID is required" }, { status: 400 });
        }

        await prisma.chamber.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[API_CHAMBERS_DELETE]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
