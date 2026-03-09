import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const prescriptionSchema = z.object({
    id: z.string().optional(),
    patientId: z.string().min(1, "patientId is required"),
    appointmentId: z.string().optional().nullable(),
    chamberId: z.string().optional().nullable(),
    symptoms: z.string().optional().nullable(),
    diagnosis: z.string().optional().nullable(),
    medications: z.any(), // Array of medications
    tests: z.string().optional().nullable(),
    advice: z.string().optional().nullable(),
    nextVisit: z.string().optional().nullable(),
});

export async function GET() {
    try {
        const prescriptions = await prisma.prescription.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                createdAt: true,
                diagnosis: true,
                patient: {
                    select: { name: true, phone: true }
                },
                chamber: {
                    select: { name: true }
                }
            }
        });
        return NextResponse.json(prescriptions);
    } catch (error) {
        console.error("[API_PRESCRIPTIONS_GET]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = prescriptionSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: validation.error.flatten().fieldErrors }, { status: 400 });
        }

        const data = validation.data;
        const presData: any = {
            patientId: data.patientId,
            chamberId: data.chamberId,
            symptoms: data.symptoms,
            diagnosis: data.diagnosis,
            medications: data.medications,
            tests: data.tests,
            advice: data.advice,
        };

        if (data.nextVisit) presData.nextVisit = new Date(data.nextVisit);
        if (data.appointmentId) presData.appointmentId = data.appointmentId;

        let prescription;

        if (data.id) {
            prescription = await prisma.prescription.update({
                where: { id: data.id },
                data: presData
            })
        } else {
            // Use a transaction to ensure both prescription creation and appointment update succeed
            prescription = await prisma.$transaction(async (tx: any) => {
                const p = await tx.prescription.create({
                    data: presData
                });

                if (data.appointmentId) {
                    await tx.appointment.update({
                        where: { id: data.appointmentId },
                        data: { status: 'completed' }
                    });
                }
                return p;
            });
        }

        return NextResponse.json(prescription);
    } catch (error) {
        console.error("[API_PRESCRIPTIONS_POST]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
