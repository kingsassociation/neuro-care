import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const querySchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
    chamberId: z.string().min(1, "chamberId is required"),
});

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const params = {
            date: searchParams.get('date'),
            chamberId: searchParams.get('chamberId'),
        };

        const validation = querySchema.safeParse(params);
        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const { date: dateStr, chamberId } = validation.data;
        const date = new Date(dateStr);
        const dayOfWeek = date.getDay(); // 0 is Sunday

        // 1. Get schedule for this day and chamber
        const schedules = await prisma.schedule.findMany({
            where: { dayOfWeek, isAvailable: true, chamberId },
            select: {
                startTime: true,
                endTime: true,
                slotDuration: true,
            }
        });

        if (schedules.length === 0) {
            return NextResponse.json({ slots: [] });
        }

        // 2. Get existing bookings for this date and chamber
        const startOfDay = new Date(dateStr);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(dateStr);
        endOfDay.setHours(23, 59, 59, 999);

        const existingAppointments = await prisma.appointment.findMany({
            where: {
                chamberId,
                date: {
                    gte: startOfDay,
                    lte: endOfDay
                },
                status: {
                    in: ['pending', 'confirmed']
                }
            },
            select: { timeSlot: true }
        });

        const bookedSlots = new Set(existingAppointments.map((a: { timeSlot: string }) => a.timeSlot));

        // 3. Generate slots based on schedule
        const availableSlots: string[] = [];

        schedules.forEach((schedule: { startTime: string; endTime: string; slotDuration: number }) => {
            const [startHour, startMin] = schedule.startTime.split(':').map(Number);
            const [endHour, endMin] = schedule.endTime.split(':').map(Number);

            let currentHour = startHour;
            let currentMin = startMin;

            while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
                const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;

                if (!bookedSlots.has(timeString)) {
                    availableSlots.push(timeString);
                }

                currentMin += schedule.slotDuration;
                if (currentMin >= 60) {
                    currentHour += Math.floor(currentMin / 60);
                    currentMin = currentMin % 60;
                }
            }
        });

        availableSlots.sort();

        return NextResponse.json({ slots: availableSlots });
    } catch (error) {
        console.error("[API_AVAILABILITY_GET]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
