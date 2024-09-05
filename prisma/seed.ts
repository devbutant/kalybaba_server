import { PrismaClient } from "@prisma/client";
import { ads } from "../seed/ads";
import { categories } from "../seed/categories";
import { types } from "../seed/types";
import { users } from "../seed/users";
import { hashPassword } from "../seed/utils";
const prisma = new PrismaClient();

async function main() {
    for (const type of types) {
        await prisma.type.upsert({
            where: { name: type.where.name },
            update: {},
            create: {
                name: type.create.name,
                description: type.create.description,
            },
        });
    }

    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category.where.name },
            update: {},
            create: {
                name: category.create.name,
                description: category.create.description,
            },
        });
    }

    const typesArray = ["achat", "échange", "location", "service", "prêt"];
    const categoriesArray = [
        "mode",
        "meubles",
        "multimédia",
        "véhicules",
        "loisirs",
        "animaux",
        "divers",
    ];

    for (const user of users) {
        const hashedPassword = await hashPassword(user.create.password);

        const newUser = await prisma.user.upsert({
            where: { email: user.where.email },
            update: {},
            create: {
                email: user.create.email,
                name: user.create.name,
                password: hashedPassword,
                address: user.create.address,
                phone: user.create.phone,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        for (const ad of ads) {
            const typeIdCreated = await prisma.type.findUnique({
                where: {
                    name: typesArray[
                        Math.floor(Math.random() * typesArray.length)
                    ],
                },
            });

            const categoryIdCreated = await prisma.category.findUnique({
                where: {
                    name: categoriesArray[
                        Math.floor(Math.random() * categoriesArray.length)
                    ],
                },
            });

            await prisma.ad.create({
                data: {
                    ...ad,
                    authorId: newUser.id,
                    typeId: typeIdCreated.id,
                    categoryId: categoryIdCreated.id,
                },
            });
        }
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
