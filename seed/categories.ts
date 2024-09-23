export const categories = [
    {
        where: { name: "location" },
        update: {},
        create: {
            name: "location",
            description: "biens immobiliers à louer",
        },
    },
    {
        where: { name: "colocation" },
        update: {},
        create: {
            name: "colocation",
            description: "offres de colocation",
        },
    },
    {
        where: { name: "vente" },
        update: {},
        create: {
            name: "vente",
            description: "biens immobiliers à vendre",
        },
    },
    {
        where: { name: "bureaux / commerce" },
        update: {},
        create: {
            name: "bureaux / commerce",
            description: "locaux professionnels et commerciaux",
        },
    },
    {
        where: { name: "services de déménagement" },
        update: {},
        create: {
            name: "services de déménagement",
            description: "services liés au déménagement",
        },
    },
];
