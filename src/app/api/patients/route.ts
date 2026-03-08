import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const patientSchema = z.object({
    name: z.string().min(1, "Name is required"),
    phone: z.string().min(10, "Valid phone is required"),
    age: z.coerce.number().optional().nullable(),
    gender: z.string().optional().nullable(),
    bloodGroup: z.string().optional().nullable(),
    address: z.string().optional().nullable(),
    historyNotes: z.string().optional().nullable(),
});

export async function GET() {
    try {
        const patients = await prisma.patient.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                name: true,
                phone: true,
                age: true,
                gender: true,
                bloodGroup: true,
                address: true,
                createdAt: true,
                _count: {
                    select: { appointments: true }
                }
            }
        });
        return NextResponse.json(patients);
    } catch (error) {
        console.error("[API_PATIENTS_GET]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = patientSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const data = validation.data;

        // Upsert by phone number so the same patient can be used multiple times
        const patient = await prisma.patient.upsert({
            where: { phone: data.phone },
            update: {
                name: data.name,
                age: data.age,
                gender: data.gender,
                bloodGroup: data.bloodGroup,
                address: data.address,
                historyNotes: data.historyNotes,
            },
            create: {
                name: data.name,
                phone: data.phone,
                age: data.age,
                gender: data.gender,
                bloodGroup: data.bloodGroup,
                address: data.address,
                historyNotes: data.historyNotes,
            }
        });

        return NextResponse.json(patient);
    } catch (error) {
        console.error("[API_PATIENTS_POST]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
