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
        link: "/materiels/type",
        icon: "",
      },
    ],
  },
  {
    id: 2,
    name: "Fournitures et Consomables",
    link: "/fournitures_et_consommables",
    icon: "edit_note",
    items: [
      {
        id: 21,
        name: "Article",
        link: "/fournitures_et_consommables/article",
        icon: "",
      },
      {
        id: 22,
        name: "Commande",
        link: "/fournitures_et_consommables/commande",
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
        name: "Tous les materiels",
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
