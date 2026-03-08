import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
    try {
        const params = await context.params;
        const prescription = await prisma.prescription.findUnique({
            where: { id: params.id },
            select: {
                id: true,
                createdAt: true,
                symptoms: true,
                diagnosis: true,
                medications: true,
                tests: true,
                advice: true,
                nextVisit: true,
                patient: {
                    select: {
                        id: true,
                        name: true,
                        phone: true,
                        age: true,
                        gender: true,
                        address: true,
                    }
                },
                chamber: {
                    select: {
                        name: true,
                        address: true,
                        phone: true,
                    }
                }
            }
        });

        if (!prescription) {
            return NextResponse.json({ error: "Prescription not found" }, { status: 404 });
        }

        return NextResponse.json(prescription);
    } catch (error) {
        console.error("[API_PRESCRIPTIONS_ID_GET]", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
