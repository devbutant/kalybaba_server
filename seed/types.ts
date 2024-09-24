export const types = [
    {
        where: { name: "offre" },
        update: {},
        create: {
            name: "offre",
            description: "proposition de bien ou service",
        },
    },
    {
        where: { name: "demande" },
        update: {},
        create: {
            name: "demande",
            description: "recherche de bien ou service",
        },
    },
];
