import 'dotenv/config';
import prisma from '../src/lib/prisma';

async function main() {
    console.log("Seeding databases natively...");
    const chambers = [
        {
            name: "Masum's Dental Clinic",
            type: "Main",
            address: "Gafur Mansion, 1107/A Love Lane, Chattogram, Bangladesh",
            phone: "01712-260461, 02333367983"
        }
    ];

    for (const chamberData of chambers) {
        // Upsert to avoid dupes if run multiple times
        let chamber = await prisma.chamber.findFirst({ where: { name: chamberData.name } });
        if (chamber) {
            chamber = await prisma.chamber.update({ where: { id: chamber.id }, data: chamberData });
        } else {
            chamber = await prisma.chamber.create({ data: chamberData });
        }

        // Add schedules (simplified for seeding)
        // 10:00 AM – 2:00 PM and 4:00 PM – 10:00 PM
        const days = [0, 1, 2, 3, 4, 6]; // Sat to Thu (assuming Fri is holiday)
        for (const day of days) {
            // Cleanup existing schedules for this chamber/day to avoid dupes
            await prisma.schedule.deleteMany({ where: { chamberId: chamber.id, dayOfWeek: day } });
            
            await prisma.schedule.create({
                data: {
                    chamberId: chamber.id,
                    dayOfWeek: day,
                    startTime: "10:00",
                    endTime: "14:00",
                    slotDuration: 20
                }
            });
            await prisma.schedule.create({
                data: {
                    chamberId: chamber.id,
                    dayOfWeek: day,
                    startTime: "16:00",
                    endTime: "22:00",
                    slotDuration: 20
                }
            });
        }
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
        console.log("✅ Admin seeded successfully");
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
