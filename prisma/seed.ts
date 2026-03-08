import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function main() {
    console.log("Seeding databases natively...");
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
        // Upsert to avoid dupes if run multiple times
        const existing = await prisma.chamber.findFirst({ where: { name: chamberData.name } });
        if (existing) {
            await prisma.chamber.update({ where: { id: existing.id }, data: chamberData });
        } else {
            await prisma.chamber.create({ data: chamberData });
        }
    }

    console.log("✅ Seeded chambers successfully");
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    });
