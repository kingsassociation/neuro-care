import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const scheduleSchema = z.object({
    id: z.string().optional(),
    chamberId: z.string().min(1, "chamberId is required"),
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.string().regex(/^\d{2}:\d{2}$/),
    endTime: z.string().regex(/^\d{2}:\d{2}$/),
    slotDuration: z.number().min(1),
    isAvailable: z.boolean().default(true),
});

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const chamberId = searchParams.get('chamberId');

        const schedules = await prisma.schedule.findMany({
            where: chamberId ? { chamberId } : undefined,
            orderBy: { dayOfWeek: 'asc' },
            select: {
                id: true,
                dayOfWeek: true,
                startTime: true,
                endTime: true,
                slotDuration: true,
                isAvailable: true,
                chamber: {
                    select: { name: true }
                }
            }
        });
        return NextResponse.json(schedules);
    } catch (error) {
        console.error("[API_SCHEDULE_GET]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = scheduleSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const data = validation.data;
        let result;

        if (data.id) {
            result = await prisma.schedule.update({
                where: { id: data.id },
                data: data,
            });
        } else {
            result = await prisma.schedule.create({
                data: data,
            });
        }
        return NextResponse.json(result);
    } catch (error) {
        console.error("[API_SCHEDULE_POST]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "id is required" }, { status: 400 });
        }

        await prisma.schedule.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[API_SCHEDULE_DELETE]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
