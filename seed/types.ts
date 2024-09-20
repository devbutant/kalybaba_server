export const types = [
    {
        where: { name: "echange" },
        update: {},
        create: {
            name: "echange",
            description: "transaction d'un bien contre un autre",
        },
    },
    {
        where: { name: "location" },
        update: {},
        create: {
            name: "location",
            description: "transaction d'un bien contre une somme d'argent",
        },
    },
    {
        where: { name: "service" },
        update: {},
        create: {
            name: "service",
            description: "transaction d'un service contre une somme d'argent",
        },
    },
    {
        where: { name: "prêt" },
        update: {},
        create: {
            name: "prêt",
            description: "transaction d'un bien prêté gratuitement",
        },
    },
    {
        where: { name: "achat" },
        update: {},
        create: {
            name: "achat",
            description: "transaction d'un bien contre une somme d'argent",
        },
    },
];
