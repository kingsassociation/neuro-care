import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const appointmentSchema = z.object({
    id: z.string().uuid().optional(),
    patientId: z.string().uuid().optional(), // optional for updates
    chamberId: z.string().uuid().optional().nullable(),
    date: z.string().optional(),
    timeSlot: z.string().optional(),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
});

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const dateStr = searchParams.get('date');
        const status = searchParams.get('status');
        const patientId = searchParams.get('patientId');
        const chamberId = searchParams.get('chamberId');

        const where: any = {};

        if (dateStr) {
            const startOfDay = new Date(dateStr);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(dateStr);
            endOfDay.setHours(23, 59, 59, 999);
            where.date = { gte: startOfDay, lte: endOfDay };
        }

        if (status) where.status = status;
        if (patientId) where.patientId = patientId;
        if (chamberId) where.chamberId = chamberId;

        const appointments = await prisma.appointment.findMany({
            where,
            include: {
                patient: {
                    select: { id: true, name: true, phone: true }
                },
                prescription: {
                    select: { id: true }
                },
                chamber: {
                    select: { id: true, name: true }
                },
            },
            orderBy: { date: 'desc' }
        });

        return NextResponse.json(appointments);
    } catch (error) {
        console.error("[API_APPOINTMENTS_GET]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = appointmentSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const data = validation.data;

        // 1. Handle Update
        if (data.id) {
            const updated = await prisma.appointment.update({
                where: { id: data.id },
                data: { status: data.status },
                include: { patient: true, chamber: true }
            });
            return NextResponse.json(updated);
        }

        // 2. Handle Creation
        if (!data.patientId || !data.date || !data.timeSlot) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const date = new Date(data.date);
        date.setHours(12, 0, 0, 0); // Normalize time part

        const newAppointment = await prisma.appointment.create({
            data: {
                patientId: data.patientId,
                chamberId: data.chamberId,
                date: date,
                timeSlot: data.timeSlot,
                status: data.status || 'pending',
            },
            include: {
                patient: {
                    select: { id: true, name: true }
                },
                chamber: true
            }
        });

        return NextResponse.json(newAppointment);
    } catch (error) {
        console.error("[API_APPOINTMENTS_POST]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
