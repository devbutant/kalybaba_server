import { PrismaClient, User } from "@prisma/client";
import { ads } from "../seed/ads";
import { categories } from "../seed/categories";
import { types } from "../seed/types";
import { users } from "../seed/users";
import { hashPassword } from "../seed/utils";

const prisma = new PrismaClient();

async function main() {
    // Assurez-vous que les types et catégories existent
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

    const typesArray = ["maison", "appartement", "terrain", "parking", "autre"];
    const categoriesArray = [
        "location",
        "colocation",
        "vente",
        "bureaux / commerce",
        "services de déménagement",
    ];

    const createdUsers: User[] = [];

    // Diviser les annonces en groupes pour chaque utilisateur
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

        // Calculer l'indice de début et de fin pour les annonces
        const startIndex = users.indexOf(user) * adsPerUser;
        const endIndex = startIndex + adsPerUser + (leftoverAds > 0 ? 1 : 0);

        // Assigner les annonces à l'utilisateur
        for (const ad of ads.slice(startIndex, endIndex)) {
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

        // Réduire le nombre d'annonces restantes à distribuer
        if (leftoverAds > 0) {
            leftoverAds--;
        }
    }

    // Ajouter des amis pour chaque utilisateur
    for (const user of createdUsers) {
        // Exclure l'utilisateur actuel
        const potentialFriends = createdUsers.filter((u) => u.id !== user.id);

        // Sélectionner un nombre aléatoire d'amis à ajouter (0-3)
        const numFriends = Math.floor(Math.random() * 4);

        const shuffledFriends = potentialFriends.sort(
            () => Math.random() - 0.5
        );
        const friendsToAdd = shuffledFriends.slice(0, numFriends);

        // Ajouter des amis à la liste d'amis de l'utilisateur
        await prisma.user.update({
            where: { id: user.id },
            data: {
                friends: {
                    connect: friendsToAdd.map((friend) => ({ id: friend.id })),
                },
            },
        });

        // Ajouter l'utilisateur aux amis des amis
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
