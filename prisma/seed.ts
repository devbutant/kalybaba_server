import { CategoryEnum, PrismaClient, TypeEnum, User } from "@prisma/client";
import { ads } from "../seed/ads"; // Inclut les nouvelles annonces
import { users } from "../seed/users";
import { hashPassword } from "../seed/utils";

const prisma = new PrismaClient();

async function main() {
    const createdUsers: User[] = [];

    // Calculer combien d'annonces par utilisateur
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
                city: user.create.city,
                phone: user.create.phone,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });

        createdUsers.push(newUser);

        // Calculer les annonces associées à cet utilisateur
        const startIndex = users.indexOf(user) * adsPerUser;
        const endIndex = startIndex + adsPerUser + (leftoverAds > 0 ? 1 : 0);

        for (const ad of ads.slice(startIndex, endIndex)) {
            try {
                // Convertir les valeurs de typeEnum et categoryEnum en enums
                const typeEnumValue =
                    TypeEnum[ad.typeEnum as keyof typeof TypeEnum];
                const categoryEnumValue =
                    CategoryEnum[ad.categoryEnum as keyof typeof CategoryEnum];

                // Créer chaque annonce pour l'utilisateur
                await prisma.ad.create({
                    data: {
                        title: ad.title,
                        description: ad.description,
                        city: ad.city,
                        price: ad.price,
                        authorId: newUser.id,
                        typeEnum: typeEnumValue, // Utiliser la valeur enum
                        categoryEnum: categoryEnumValue, // Utiliser la valeur enum
                        createdAt: ad.createdAt || new Date(),
                        updatedAt: ad.updatedAt || new Date(),
                    },
                });
            } catch (error) {
                console.error(
                    `Erreur lors de la création de l'annonce: ${ad.title}`,
                    error
                );
            }
        }

        if (leftoverAds > 0) {
            leftoverAds--;
        }
    }

    // Associer des amis aux utilisateurs
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
