"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const ads_1 = require("../seed/ads");
const categories_1 = require("../seed/categories");
const types_1 = require("../seed/types");
const users_1 = require("../seed/users");
const utils_1 = require("../seed/utils");
const prisma = new client_1.PrismaClient();
async function main() {
    for (const type of types_1.types) {
        await prisma.type.upsert({
            where: { name: type.where.name },
            update: {},
            create: {
                name: type.create.name,
                description: type.create.description,
            },
        });
    }
    for (const category of categories_1.categories) {
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
    const createdUsers = [];
    for (const user of users_1.users) {
        const hashedPassword = await (0, utils_1.hashPassword)(user.create.password);
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
        createdUsers.push(newUser);
        for (const ad of ads_1.ads) {
            const typeIdCreated = await prisma.type.findUnique({
                where: {
                    name: typesArray[Math.floor(Math.random() * typesArray.length)],
                },
            });
            const categoryIdCreated = await prisma.category.findUnique({
                where: {
                    name: categoriesArray[Math.floor(Math.random() * categoriesArray.length)],
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
    for (const user of createdUsers) {
        const potentialFriends = createdUsers.filter((u) => u.id !== user.id);
        const numFriends = Math.floor(Math.random() * 4);
        const shuffledFriends = potentialFriends.sort(() => Math.random() - 0.5);
        const friendsToAdd = shuffledFriends.slice(0, numFriends);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                friends: {
                    connect: friendsToAdd.map((friend) => ({ id: friend.id })),
                },
            },
        });
        for (const friend of friendsToAdd) {
            await prisma.user.update({
                where: { id: friend.id },
                data: {
                    friends: {
                        connect: { id: user.id },
                    },
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
//# sourceMappingURL=seed.js.map