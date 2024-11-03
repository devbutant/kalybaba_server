export const users = [
    {
        where: { email: "devbutant@mailinator.com" },
        update: {},
        create: {
            email: "devbutant@mailinator.com",
            name: "Devbu",
            password: "password123*",
            city: "Grenoble",
            phone: "0600000001",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    },
];
