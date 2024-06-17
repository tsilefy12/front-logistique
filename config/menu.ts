import { useMemo } from "react";
import { useAppSelector } from "../hooks/reduxHooks";

function allMenu() {
  const { user } = useAppSelector((state) => state.auth);
  const menus = useMemo(() => {
    let temp: any = [
      {
        id: 1,
        name: "Matériels",
        link: "/materiels",
        icon: "inventory_2",
        items: [],
      },
      {
        id: 2,
        name: "Fournitures et consommables",
        link: "/fournitures_et_consommables",
        icon: "inventory_2",
        items: [],
      },
      {
        id: 3,
        name: "Materiel de transport",
        link: "/materiel_de_transport",
        icon: "local_shipping",
        items: [],
      },
    ];
    if (user) {
      if (user.groups?.some((g) => g.service.name === "Logistiques BCE")) {
        temp
          .find((t: any) => t.id === 1)
          ?.items.push({
            id: 14,
            name: "Bon de Commende Externe (BCE)",
            link: "/materiels/bon_commande_externe",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques BCF")) {
        temp
          .find((t: any) => t.id === 1)
          ?.items.push({
            id: 15,
            name: "Bon de commande fournisseur",
            link: "/materiels/bon_de_commande_fournisseur",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques BCI")) {
        temp
          .find((t: any) => t.id === 1)
          ?.items.push({
            id: 16,
            name: "Bon de commande interne (BCI)",
            link: "/materiels/bon_commande_interne",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques BR")) {
        temp
          .find((t: any) => t.id === 1)
          ?.items.push({
            id: 17,
            name: "Bon de reception",
            link: "/materiels/bon_reception",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques BT")) {
        temp
          .find((t: any) => t.id === 1)
          ?.items.push({
            id: 18,
            name: "Bon de transfert",
            link: "/materiels/bon_transfert",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques FD")) {
        temp
          .find((t: any) => t.id === 1)
          ?.items.push({
            id: 19,
            name: "Fiche de dotation",
            link: "/materiels/fiche_dotation",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques FDM")) {
        temp
          .find((t: any) => t.id === 1)
          ?.items.push({
            id: 20,
            name: "Fiche détention materielle",
            link: "/materiels/detenteur",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques LMS")) {
        temp
          .find((t: any) => t.id === 1)
          ?.items.push(
            ...[
              {
                id: 21,
                name: "Liste des materiels",
                link: "/materiels/informatiques",
                icon: "",
              },
              {
                id: 23,
                name: "Stock",
                link: "/materiels/stock",
                icon: "",
              },
            ]
          );
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques PV")) {
        temp
          .find((t: any) => t.id === 1)
          ?.items.push({
            id: 22,
            name: "Pv de Comparaison",
            link: "/materiels/pv_comparaison",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques FS")) {
        temp
          .find((t: any) => t.id === 2)
          ?.items.push({
            id: 21,
            name: "Fiche de Stock",
            link: "/fournitures_et_consommables/fiche_de_stock",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques ES")) {
        temp
          .find((t: any) => t.id === 2)
          ?.items.push({
            id: 22,
            name: "Entre et Sortie",
            link: "/fournitures_et_consommables/entre_et_sortie",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques Mat")) {
        temp
          .find((t: any) => t.id === 3)
          ?.items.push({
            id: 31,
            name: "Tous les materiels",
            link: "/materiel_de_transport",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques Ent")) {
        temp
          .find((t: any) => t.id === 3)
          ?.items.push({
            id: 32,
            name: "Entretien",
            link: "/materiel_de_transport/bon_de_voiture",
            icon: "/materiel_de_transport",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques CV")) {
        temp
          .find((t: any) => t.id === 3)
          ?.items.push({
            id: 33,
            name: "Course ville",
            link: "/materiel_de_transport/suivi_carburant",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques LE")) {
        temp
          .find((t: any) => t.id === 3)
          ?.items.push({
            id: 34,
            name: "Location externe",
            link: "/materiel_de_transport/location",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques LI")) {
        temp
          .find((t: any) => t.id === 3)
          ?.items.push({
            id: 35,
            name: "Location interne",
            link: "/materiel_de_transport/mission",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques FRS")) {
        temp.push({
          id: 4,
          name: "Fournisseurs",
          link: "/fournisseurs",
          icon: "contacts",
          items: [],
        });
      }
      if (
        user.groups?.some(
          (g) => g.service.name === "Logistiques configurations"
        )
      ) {
        temp.push({
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
            {
              id: 54,
              name: "Type de produit (Fournisseur)",
              link: "/configurations/type_produit",
              icon: "",
            },
          ],
        });
      }
    }
    return temp;
  }, [user]);
  return menus;
}

export default allMenu;
