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
    ],
  },
  {
    id: 2,
    name: "Fournitures et Consomables",
    link: "",
    icon: "edit_note",
    items: [
      {
        id: 21,
        name: "Fiche de Stock",
        link: "/fournitures_et_consommables/fiche_de_stock",
        icon: "",
      },
      {
        id: 22,
        name: "Commande",
        link: "/fournitures_et_consommables/commande",
        icon: "",
      },
      {
        id: 23,
        name: "Entre et Sortie",
        link: "/fournitures_et_consommables/entre_et_sortie",
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
        name: "Entretien",
        link: "/materiel_de_transport/bon_de_voiture",
        icon: "/materiel_de_transport",
      },
      {
        id: 33,
        name: "Facture de consommation",
        link: "/materiel_de_transport/facture_de_consommation",
        icon: "",
      },
      {
        id: 34,
        name: "Suivi carburant",
        link: "/materiel_de_transport/suivi_carburant",
        icon: "",
      },
      {
        id: 35,
        name: "course ville",
        link: "/materiel_de_transport/course_ville",
        icon: "",
      },
      {
        id: 36,
        name: "mission",
        link: "/materiel_de_transport/mission",
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
    link: "/configurations/etat_materiel",
    icon: "settings",
    items: [
      {
        id: 51,
        name: "Etat matériel",
        link: "/configurations/etat_materiel",
        icon: "",
      },
      {
        id: 52,
        name: "Type de matériel",
        link: "/configurations/type_materiel",
        icon: "",
      },
      {
        id: 53,
        name: "Unité de stock",
        link:"/configurations/unite_de_stock",
        icon: ""
      },
      {
        id: 54, 
        name: "Catégorie",
        link: "/configurations/categorie",
        icon: ""
      },
      {
        id: 55, 
        name: "Type de produit",
        link: "/configurations/type_produit",
        icon: ""
      }
    ],
  },
];

export default menu;
