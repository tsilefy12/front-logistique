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
        name: "Mes commandes",
        link: "/materiels/mes_commandes",
        icon: "",
      },
      {
        id: 13,
        name: "Bon de commande",
        link: "/materiels/bon_de_commande",
        icon: "",
      },
      {
        id: 14,
        name: "Liste des materiels",
        link: "/materiels/informatiques",
        icon: "",
      },
      {
        id: 15,
        name: "Stock",
        link: "/materiels/stock",
        icon: "",
      },
      {
        id: 16,
        name: "Fiche détention materielle",
        link: "/materiels/detenteur",
        icon: "",
      },
      {
        id: 17,
        name: "Type de materiel",
        link: "/Materiels/",
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
        name: "Tous les materiels",
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
        link: "/materiel_de_transport/facture_de_consommation",
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
    name: "Configurations",
    link: "/Configuration",
    icon: "settings",
    items: [
      {
        id: 51,
        name: "Etat materiel",
        link: "/configuration/etat",
        icon: "",
      },
    ],
  },
];

export default menu;
