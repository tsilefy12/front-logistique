const menu = [
  {
    id: 1,
    name: "Matériels",
    link: "/",
    icon: "inventory_2",
    items: [{
      id: 11,
      name: "Commande",
      link: "/Materiels/Commande",
      icon: "",
    },
    {
      id: 12,
      name: "Bon de commande",
      link: "/Materiels/BonCommande",
      icon: "",
    },
    {
      id: 13,
      name: "Liste des materiels",
      link: "/Materiels/Liste",
      icon: "",
    },
    {
<<<<<<< Updated upstream
      id: 34,
=======
      id: 14,
>>>>>>> Stashed changes
      name: "Fiche détention materielle",
      link: "/Materiels/FicheDetention",
      icon: "",
    },
    {
<<<<<<< Updated upstream
      id: 35,
=======
      id: 15,
>>>>>>> Stashed changes
      name: "Type de materiel",
      link: "/Materiels/type",
      icon: "",
    },
  ],
  },
  {
    id: 2,
    name: "Fourniteurs et Consomables",
    link: "/fourniteurs",
    icon: "edit_note",
    items: [
      {
        id: 21,
        name: "Article",
        link: "/Fourniteur/Article",
        icon: "",
      },
      {
        id: 22,
        name: "Commande",
        link: "/Fourniteur/Commande",
        icon: "",
      },

    ],
  },
  {
    id: 3,
    name: "Materiel de Transport",
    link: "/Transport",
    icon: "local_shipping",
    items: [
      {
        id: 31,
        name: "tous les materiels",
        link: "/Transport/AllMateriels",
        icon: "",
      },
      {
        id: 32,
        name: "Bon de voiture",
        link: "/Transport/Bon",
        icon: "",
      },
      {
        id: 33,
        name: "Facture de consommation",
        link: "/Transport/Facture",
        icon: "",
      },
    ],
  },
  {
    id: 4,
    name: "Fournisseur",
    link: "/Fournisseur",
    icon: "contacts",
    items: [],
  },
  {
    id: 5,
    name: "Configuration",
    link: "/Configuration",
    icon: "settings",
    items: [
      {
        id: 51,
        name: "Etat materiel",
        link: "/Configuration/Etat",
        icon: "",
      },
    ],
  },
];

export default menu;
