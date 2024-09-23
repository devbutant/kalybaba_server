import { fakerFR as faker } from "@faker-js/faker";
import { PrismaClient, User } from "@prisma/client";
import { categories } from "../seed/categories";
import { types } from "../seed/types";
import { users } from "../seed/users";
import { hashPassword } from "../seed/utils";

const prisma = new PrismaClient();

function createRandomAd() {
    const typesArray = ["maison", "appartement", "terrain", "parking", "autre"];
    const categoriesArray = [
        "location",
        "colocation",
        "vente",
        "bureaux / commerce",
        "services de déménagement",
    ];

    return {
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        address: faker.location.city(),
        price: faker.number.int({ min: 100, max: 1000000 }),
        type: typesArray[Math.floor(Math.random() * typesArray.length)],
        category:
            categoriesArray[Math.floor(Math.random() * categoriesArray.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}

const ads = Array.from({ length: 200 }, createRandomAd);

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
