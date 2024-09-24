const ads = [
    {
        title: "Vélo tout terrain en bon état",
        description:
            "Vélo VTT, peu utilisé, en très bon état, idéal pour randonnées.",
        city: "123 Rue du Sport, Paris",
        price: 120.0,
        typeEnum: "OFFER", // Offre
        categoryEnum: "VEHICLE", // Véhicule
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Demande de service de plomberie",
        description:
            "Recherche un plombier pour une intervention rapide sur une fuite d'eau.",
        city: "10 Rue des Fontaines, Lyon",
        price: 0.0, // Prix nul pour une demande de service
        typeEnum: "DEMAND", // Demande
        categoryEnum: "SERVICES", // Services
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Appartement T2 à louer",
        description:
            "Appartement 2 pièces, 50m², proche du centre-ville et des commerces.",
        city: "56 Avenue de la République, Marseille",
        price: 650.0,
        typeEnum: "OFFER", // Offre
        categoryEnum: "REAL_ESTATE", // Immobilier
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Recherche jeux vidéo d'occasion",
        description:
            "Je suis à la recherche de jeux vidéo d'occasion pour PS4 et Nintendo Switch.",
        city: "8 Rue du Gamer, Toulouse",
        price: 0.0, // Prix nul pour une demande de biens
        typeEnum: "DEMAND", // Demande
        categoryEnum: "MULTIMEDIA", // Multimédia
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Offre de baby-sitting",
        description:
            "Disponible pour garder vos enfants en soirée ou le week-end. Expérience vérifiable.",
        city: "23 Rue des Enfants, Nantes",
        price: 10.0, // Prix horaire pour le service
        typeEnum: "OFFER", // Offre
        categoryEnum: "SERVICES", // Services
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Location de maison de vacances",
        description:
            "Maison de vacances spacieuse, 3 chambres, à 5 minutes de la plage. Idéal pour famille.",
        city: "9 Avenue du Soleil, Nice",
        price: 1200.0,
        typeEnum: "OFFER", // Offre
        categoryEnum: "REAL_ESTATE", // Immobilier
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente d'un ordinateur portable",
        description:
            "Ordinateur portable en très bon état, parfait pour le travail ou le jeu.",
        city: "77 Rue des Technologies, Bordeaux",
        price: 500.0,
        typeEnum: "OFFER", // Offre
        categoryEnum: "MULTIMEDIA", // Multimédia
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Demande de service de jardinage",
        description:
            "Recherche un jardinier pour entretenir mon jardin une fois par semaine.",
        city: "3 Rue des Fleurs, Lille",
        price: 0.0, // Prix nul pour une demande de service
        typeEnum: "DEMAND", // Demande
        categoryEnum: "SERVICES", // Services
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Voiture d'occasion à vendre",
        description:
            "Peugeot 208 d'occasion, année 2018, faible kilométrage, en bon état.",
        city: "11 Rue de l'Automobile, Rennes",
        price: 7500.0,
        typeEnum: "OFFER", // Offre
        categoryEnum: "VEHICLE", // Véhicule
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Recherche une assistante administrative",
        description:
            "Entreprise recherche une assistante administrative pour un poste à mi-temps.",
        city: "35 Rue des Entreprises, Strasbourg",
        price: 0.0, // Prix nul pour une demande de service
        typeEnum: "DEMAND", // Demande
        categoryEnum: "EMPLOYMENT", // Emploi
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Cours de guitare pour débutants",
        description:
            "Donne cours de guitare pour débutants. Possibilité à domicile ou en ligne.",
        city: "45 Rue des Artistes, Paris",
        price: 25.0, // Prix par session
        typeEnum: "OFFER", // Offre
        categoryEnum: "SERVICES", // Services
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Achat de meubles anciens",
        description:
            "Cherche à acheter des meubles anciens en bois pour rénovation.",
        city: "12 Rue des Antiquaires, Lille",
        price: 0.0, // Demande sans prix
        typeEnum: "DEMAND", // Demande
        categoryEnum: "HOME", // Maison
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Chiot labrador à vendre",
        description:
            "Chiot labrador de 3 mois, vacciné et en bonne santé, cherche famille aimante.",
        city: "28 Rue des Animaux, Lyon",
        price: 600.0,
        typeEnum: "OFFER", // Offre
        categoryEnum: "ANIMALS", // Animaux
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Demande d'emploi en marketing digital",
        description:
            "Cherche un poste en marketing digital, expérience de 2 ans dans le secteur.",
        city: "99 Avenue du Progrès, Bordeaux",
        price: 0.0, // Demande sans prix
        typeEnum: "DEMAND", // Demande
        categoryEnum: "EMPLOYMENT", // Emploi
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Vente de livres d'occasion",
        description:
            "Lot de livres d'occasion en très bon état, genres variés (romans, essais).",
        city: "14 Rue de la Littérature, Toulouse",
        price: 30.0, // Prix pour le lot
        typeEnum: "OFFER", // Offre
        categoryEnum: "LEISURE", // Loisirs
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Demande de réparation d'ordinateur",
        description:
            "Cherche technicien pour réparer un ordinateur portable Lenovo. Écran cassé.",
        city: "7 Rue des Techniciens, Marseille",
        price: 0.0, // Prix non précisé pour une demande
        typeEnum: "DEMAND", // Demande
        categoryEnum: "SERVICES", // Services
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Location d'un camion de déménagement",
        description:
            "Camion de déménagement disponible à la location, permis B suffisant.",
        city: "45 Rue des Déménageurs, Nice",
        price: 80.0, // Prix par jour
        typeEnum: "OFFER", // Offre
        categoryEnum: "VEHICLE", // Véhicule
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Recherche stage en développement web",
        description:
            "Étudiant en développement web, recherche un stage de 3 mois.",
        city: "67 Rue des Apprentis, Nantes",
        price: 0.0, // Demande sans prix
        typeEnum: "DEMAND", // Demande
        categoryEnum: "EMPLOYMENT", // Emploi
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Location de matériel de camping",
        description:
            "Matériel de camping complet à louer : tente, sacs de couchage, réchaud.",
        city: "89 Rue de l'Aventure, Montpellier",
        price: 50.0, // Prix pour la location
        typeEnum: "OFFER", // Offre
        categoryEnum: "LEISURE", // Loisirs
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: "Don de vêtements pour bébé",
        description: "Donne vêtements pour bébé, taille 0-6 mois. En bon état.",
        city: "31 Rue des Familles, Rennes",
        price: 0.0, // Don
        typeEnum: "OFFER", // Offre
        categoryEnum: "FASHION", // Mode
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];

export { ads };
