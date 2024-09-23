export const ads = [
    {
        title: "Location appartement 2 pièces",
        description:
            "Appartement 2 pièces à louer à Bordeaux, bien situé près du centre-ville.",
        address: "Bordeaux",
        price: 800,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente maison familiale",
        description:
            "Maison familiale spacieuse avec jardin à Toulouse, proche des écoles.",
        address: "Toulouse",
        price: 350000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Colocation dans un appartement moderne",
        description:
            "Chambre disponible en colocation dans un appartement moderne à Lyon.",
        address: "Lyon",
        price: 400,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente de terrain constructible",
        description:
            "Terrain constructible de 600 m² à vendre près de Nice, idéal pour projet immobilier.",
        address: "Nice",
        price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Location studio meublé",
        description:
            "Studio meublé à louer à Strasbourg, idéal pour étudiants ou jeunes professionnels.",
        address: "Strasbourg",
        price: 600,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente d'un appartement avec vue mer",
        description:
            "Appartement de 3 pièces avec vue sur la mer à Marseille, récemment rénové.",
        address: "Marseille",
        price: 280000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Location de bureaux à Paris",
        description:
            "Bureaux à louer dans le quartier des affaires de Paris, espace moderne et lumineux.",
        address: "Paris",
        price: 2500,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente d'un duplex à Lille",
        description:
            "Duplex de 4 pièces en plein cœur de Lille, avec balcon et garage.",
        address: "Lille",
        price: 320000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Location d'un garage",
        description: "Garage à louer à Nantes, sécurisé et facile d'accès.",
        address: "Nantes",
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente d'un studio",
        description:
            "Studio à vendre à Rennes, idéal pour investissement locatif.",
        address: "Rennes",
        price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Location villa avec piscine",
        description:
            "Belle villa avec piscine à louer à Antibes, proche des plages.",
        address: "Antibes",
        price: 2000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente appartement 4 pièces",
        description:
            "Appartement 4 pièces en excellent état à Montpellier, avec balcon.",
        address: "Montpellier",
        price: 300000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Colocation à Nice",
        description:
            "Chambre à louer dans une colocation à Nice, proche de la mer.",
        address: "Nice",
        price: 450,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente maison avec jardin",
        description:
            "Maison de 5 pièces avec jardin à Lyon, idéale pour famille.",
        address: "Lyon",
        price: 400000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Location appartement 1 pièce",
        description:
            "Appartement 1 pièce à louer à Marseille, proche des transports.",
        address: "Marseille",
        price: 650,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente d'un immeuble",
        description:
            "Immeuble à vendre à Paris, plusieurs appartements disponibles.",
        address: "Paris",
        price: 1500000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Location de loft",
        description: "Loft moderne à louer à Strasbourg, spacieux et lumineux.",
        address: "Strasbourg",
        price: 1200,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente d'une maison de campagne",
        description:
            "Charmante maison de campagne à vendre à Bordeaux, calme et paisible.",
        address: "Bordeaux",
        price: 250000,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    // Ajout de 182 nouvelles annonces
    ...Array.from({ length: 182 }, (_, i) => ({
        title: `Annonce ${i + 1}`,
        description: `Description de l'annonce ${i + 1}.`,
        address: `Ville ${i + 1}`,
        price: Math.floor(Math.random() * 1000000),
        createdAt: new Date(),
        updatedAt: new Date(),
    })),
];
