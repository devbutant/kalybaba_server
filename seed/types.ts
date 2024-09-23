export const types = [
    {
        where: { name: "maison" },
        update: {},
        create: {
            name: "maison",
            description: "propriété de type maison",
        },
    },
    {
        where: { name: "appartement" },
        update: {},
        create: {
            name: "appartement",
            description: "propriété de type appartement",
        },
    },
    {
        where: { name: "terrain" },
        update: {},
        create: {
            name: "terrain",
            description: "terrain à vendre ou à louer",
        },
    },
    {
        where: { name: "parking" },
        update: {},
        create: {
            name: "parking",
            description: "place de parking ou garage",
        },
    },
    {
        where: { name: "autre" },
        update: {},
        create: {
            name: "autre",
            description: "autre type de bien immobilier",
        },
    },
];
