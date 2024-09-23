import { PrismaClient, User } from "@prisma/client";
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

    const createdUsers: User[] = [];

    const adsPerUser = Math.floor(ads.length / users.length);
    let leftoverAds = ads.length % users.length;

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

        createdUsers.push(newUser);

        const startIndex = users.indexOf(user) * adsPerUser;
        const endIndex = startIndex + adsPerUser + (leftoverAds > 0 ? 1 : 0);

        for (const ad of ads.slice(startIndex, endIndex)) {
            const typeIdCreated = await prisma.type.findUnique({
                where: {
                    name: ad.type,
                },
            });

            const categoryIdCreated = await prisma.category.findUnique({
                where: {
                    name: ad.category,
                },
            });

            if (typeIdCreated && categoryIdCreated) {
                await prisma.ad.create({
                    data: {
                        title: ad.title,
                        description: ad.description,
                        address: ad.address,
                        price: ad.price,
                        authorId: newUser.id,
                        typeId: typeIdCreated.id,
                        categoryId: categoryIdCreated.id,
                        createdAt: ad.createdAt,
                        updatedAt: ad.updatedAt,
                    },
                });
            } else {
                console.error(`Type or Category not found for ad: ${ad.title}`);
            }
        }

        if (leftoverAds > 0) {
            leftoverAds--;
        }
    }

    for (const user of createdUsers) {
        const potentialFriends = createdUsers.filter((u) => u.id !== user.id);

        const numFriends = Math.floor(Math.random() * 4);

        const shuffledFriends = potentialFriends.sort(
            () => Math.random() - 0.5
        );
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
