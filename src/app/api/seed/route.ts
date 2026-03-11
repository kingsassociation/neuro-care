import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const chambers = [
            {
                name: "Masum's Dental Clinic",
                type: "Main",
                address: "Gafur Mansion, 1107/A Love Lane, Chattogram",
                phone: "01712-260461"
            },
            {
                name: "Epic Health Care (Dental)",
                type: "Visiting",
                address: "O.R. Nizam Road, Chattogram",
                phone: "01712-260461"
            }
        ];

        for (const chamberData of chambers) {
            await prisma.chamber.create({
                data: chamberData
            });
        }

        // 2. Create Admin if not exists
        const adminEmail = "info@masumsdental.com";
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
