import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const chambers = [
            {
                name: "Sevron Hospital",
                type: "Primary",
                address: "Panchlaish Residential Area, Chattogram",
                phone: "+880 1812-345678"
            },
            {
                name: "Epic Health Care",
                type: "Visiting",
                address: "O.R. Nizam Road, Chattogram",
                phone: "+880 1812-987654"
            }
        ];

        for (const chamberData of chambers) {
            await prisma.chamber.create({
                data: chamberData
            });
        }

        // 2. Create Admin if not exists
        const adminEmail = "admin@neurocare.com";
        const existingAdmin = await prisma.admin.findUnique({
            where: { email: adminEmail }
        });

        if (!existingAdmin) {
            await prisma.admin.create({
                data: {
                    email: adminEmail,
                    password: "admin" // Plain text as requested
                }
            });
        }

        return NextResponse.json({ message: "Seeded successfully", admin: adminEmail });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
