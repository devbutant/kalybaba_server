export const users = [
    {
        where: { email: "johndoe@gmail.com" },
        update: {},
        create: {
            email: "john@example.com",
            name: "John",
            password: "johnS3cur3P@ssw0rd!",
            address: "Paris",
            phone: "0600000001",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
    {
        where: { email: "alice@example.com" },
        update: {},
        create: {
            email: "alice@example.com",
            name: "Alice",
            password: "aliceS3cur3P@ssw0rd!",
            address: "Marseille",
            phone: "0600000000",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
];
