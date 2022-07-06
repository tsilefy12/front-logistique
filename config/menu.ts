const menu = [
  {
    id: 1,
    name: "Matériels",
    link: "/",
    icon: "inventory_2",
    items: [
      {
        id: 11,
        name: "Commande",
        link: "/materiels/commande",
        icon: "",
      },
      {
        id: 12,
        name: "Bon de commande",
        link: "/materiels/bon_de_commande",
        icon: "",
      },
      {
        id: 13,
        name: "Liste des materiels",
        link: "/materiels/informatiques",
        icon: "",
      },
      {
        id: 14,
        name: "Stock",
        link: "/materiels/stock",
        icon: "",
      },
      {
        id: 15,
        name: "Fiche détention materielle",
        link: "/materiels/detenteur",
        icon: "",
      },
      {
        id: 16,
        name: "Type de materiel",
        link: "/Materiels/",
        icon: "",
      },
    ],
  },
  {
    id: 2,
    name: "Fourniteurs et Consomables",
    link: "/fourniteur_et_consommable",
    icon: "edit_note",
    items: [
      {
        id: 21,
        name: "Article",
        link: "/fourniteur_et_consommable",
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
    link: "",
    icon: "local_shipping",
    items: [
      {
        id: 31,
        name: "tous les materiels",
        link: "/materiel_de_transport",
        icon: "",
      },
      {
        id: 32,
        name: "Bon de voiture",
        link: "/materiel_de_transport/bon_de_voiture",
        icon: "/materiel_de_transport",
      },
      {
        id: 33,
        name: "Facture de consommation",
<<<<<<< HEAD
        link: "/materiel_de_transport/facture_de_consommation",
=======
        link: "/facture",
>>>>>>> 96506fe7134731e0f18ea052553f71f1edfc9b04
        icon: "",
      },
    ],
  },
  {
    id: 4,
    name: "Fournisseurs",
    link: "/fournisseurs",
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
        link: "/configuration/etat_article",
        icon: "",
      },
    ],
  },
];

export default menu;
