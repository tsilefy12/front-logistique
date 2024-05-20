const menu = [
  {
    id: 1,
    name: "Matériels",
    link: "/materiels",
    icon: "inventory_2",
    items: [
      {
        id: 14,
        name: "Bon de Commende Externe (BCE)",
        link: "/materiels/bon_commande_externe",
        icon: "",
      },
      {
        id: 15,
        name: "Bon de commande fournisseur",
        link: "/materiels/bon_de_commande_fournisseur",
        icon: "",
      },
      {
        id: 16,
        name: "Bon de commande interne (BCI)",
        link: "/materiels/bon_commande_interne",
        icon: "",
      },

      {
        id: 17,
        name: "Bon de reception",
        link: "/materiels/bon_reception",
        icon: "",
      },
      {
        id: 18,
        name: "Bon de transfert",
        link: "/materiels/bon_transfert",
        icon: "",
      },
      {
        id: 19,
        name: "Fiche de dotation",
        link: "/materiels/fiche_dotation",
        icon: "",
      },
      {
        id: 20,
        name: "Fiche détention materielle",
        link: "/materiels/detenteur",
        icon: "",
      },
      {
        id: 21,
        name: "Liste des materiels",
        link: "/materiels/informatiques",
        icon: "",
      },
      {
        id: 22,
        name: "Pv de Comparaison",
        link: "/materiels/pv_comparaison",
        icon: "",
      },
      {
        id: 23,
        name: "Stock",
        link: "/materiels/stock",
        icon: "",
      },
    ],
  },
  {
    id: 2,
    name: "Fournitures et Consomables",
    link: "/fournitures_et_consommables/",
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
        name: "Entre et Sortie",
        link: "/fournitures_et_consommables/entre_et_sortie",
        icon: "",
      },
    ],
  },
  {
    id: 3,
    name: "Materiel de Transport",
    link: "/materiel_de_transport",
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
      /*{
        id: 33,
        name: "Facture de consommation",
        link: "/materiel_de_transport/facture_de_consommation",
        icon: "",
      },*/
      {
        id: 33,
        name: "Course ville",
        link: "/materiel_de_transport/suivi_carburant",
        icon: "",
      },
      {
        id: 34,
        name: "Location externe",
        link: "/materiel_de_transport/location",
        icon: "",
      },
      {
        id: 35,
        name: "Location interne",
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
        name: "Catégorie",
        link: "/configurations/type_materiel",
        icon: "",
      },
      {
        id: 53,
        name: "Unité de stock",
        link: "/configurations/unite_de_stock",
        icon: "",
      },
      // {
      //   id: 53,
      //   name: "Catégorie",
      //   link: "/configurations/categorie",
      //   icon: ""
      // },
      {
        id: 54,
        name: "Type de produit (Fournisseur)",
        link: "/configurations/type_produit",
        icon: "",
      },
    ],
  },
];

export default menu;
