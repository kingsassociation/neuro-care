import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const params = await context.params;
        const patient = await prisma.patient.findUnique({
            where: { id: params.id },
            select: {
                id: true,
                name: true,
                phone: true,
                age: true,
                gender: true,
                bloodGroup: true,
                address: true,
                historyNotes: true,
                createdAt: true,
                appointments: {
                    orderBy: { date: 'desc' },
                    select: {
                        id: true,
                        date: true,
                        timeSlot: true,
                        status: true,
                        chamber: {
                            select: { name: true }
                        },
                        prescription: {
                            select: { id: true }
                        }
                    }
                },
                prescriptions: {
                    orderBy: { createdAt: 'desc' },
                    select: {
                        id: true,
                        createdAt: true,
                        diagnosis: true,
                    }
                }
            }
        });

        if (!patient) {
            return NextResponse.json({ error: "Patient not found" }, { status: 404 });
        }

        return NextResponse.json(patient);
    } catch (error) {
        console.error("[API_PATIENTS_ID_GET]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
