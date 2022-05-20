const menu = [
  {
    id: 1,
    name: "Employés",
    link: "/",
    icon: "groups",
    items: [],
  },
  {
    id: 2,
    name: "Contrats",
    link: "/contracts",
    icon: "edit_note",
    items: [],
  },
  {
    id: 3,
    name: "Configuration",
    link: "/configurations",
    icon: "settings",
    items: [
      {
        id: 31,
        name: "SMIE",
        link: "/configurations/smie",
        icon: "",
      },
      {
        id: 32,
        name: "Echelons",
        link: "/configurations/levels",
        icon: "",
      },
      {
        id: 33,
        name: "Classes",
        link: "/configurations/grades",
        icon: "",
      },
      {
        id: 34,
        name: "Catégories",
        link: "/configurations/categories",
        icon: "",
      },
      {
        id: 35,
        name: "Programmes",
        link: "/configurations/programs",
        icon: "",
      },
      {
        id: 36,
        name: "Lieux de travails",
        link: "/configurations/workplaces",
        icon: "",
      },
      {
        id: 37,
        name: "Type de contrat",
        link: "/configurations/contract-type",
        icon: "",
      },
      {
        id: 38,
        name: "Fonctions",
        link: "/configurations/fonctions",
        icon: "",
      },
    ],
  },
];

export default menu;
