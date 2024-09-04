import { useMemo } from "react";
import { useAppSelector } from "../hooks/reduxHooks";

function allMenu() {
  const { user } = useAppSelector((state) => state.auth);
  const menus = useMemo(() => {
    let temp: any = [
      {
        id: 2,
        name: "Matériels",
        link: "/materiels",
        icon: "inventory_2",
        color: "accent",
        items: [],
      },
      {
        id: 3,
        name: "Fournitures et consommables",
        link: "/fournitures_et_consommables",
        icon: "inventory_2",
        items: [],
        color: "warning",
      },
      {
        id: 4,
        name: "Matériel de transport",
        link: "/materiel_de_transport",
        icon: "local_shipping",
        color: "info",
        items: [],
      },
    ];
    if (
      user &&
      user.groups?.some((g) => g.service.name === "Logistiques FRS")
    ) {
      temp.unshift({
        id: 1,
        name: "Fournisseurs",
        link: "/fournisseurs",
        icon: "contacts",
        color: "success",
        items: [],
      });
    }
    if (user) {
      if (user.groups?.some((g) => g.service.name === "Logistiques BCE")) {
        temp
          .find((t: any) => t.id === 2)
          ?.items.push({
            id: 14,
            name: "Bon de commende externe (BCE)",
            link: "/materiels/bon_commande_externe",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques BCF")) {
        temp
          .find((t: any) => t.id === 2)
          ?.items.push({
            id: 15,
            name: "Bon de commande fournisseur",
            link: "/materiels/bon_de_commande_fournisseur",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques BCI")) {
        temp
          .find((t: any) => t.id === 2)
          ?.items.push({
            id: 16,
            name: "Bon de commande interne (BCI)",
            link: "/materiels/bon_commande_interne",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques BR")) {
        temp
          .find((t: any) => t.id === 2)
          ?.items.push({
            id: 17,
            name: "Bon de reception",
            link: "/materiels/bon_reception",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques BT")) {
        temp
          .find((t: any) => t.id === 2)
          ?.items.push({
            id: 18,
            name: "Bon de transfert",
            link: "/materiels/bon_transfert",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques FD")) {
        temp
          .find((t: any) => t.id === 2)
          ?.items.push({
            id: 19,
            name: "Fiche de dotation",
            link: "/materiels/fiche_dotation",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques FDM")) {
        temp
          .find((t: any) => t.id === 2)
          ?.items.push({
            id: 20,
            name: "Fiche détention materielle",
            link: "/materiels/detenteur",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques LMS")) {
        temp
          .find((t: any) => t.id === 2)
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
          .find((t: any) => t.id === 2)
          ?.items.push({
            id: 22,
            name: "PV de comparaison",
            link: "/materiels/pv_comparaison",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques FS")) {
        temp
          .find((t: any) => t.id === 3)
          ?.items.push({
            id: 21,
            name: "Fiche de stock",
            link: "/fournitures_et_consommables/fiche_de_stock",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques ES")) {
        temp
          .find((t: any) => t.id === 3)
          ?.items.push({
            id: 22,
            name: "Entrée et sortie",
            link: "/fournitures_et_consommables/entre_et_sortie",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques Mat")) {
        temp
          .find((t: any) => t.id === 4)
          ?.items.push({
            id: 31,
            name: "Tous les matériels",
            link: "/materiel_de_transport",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques Ent")) {
        temp
          .find((t: any) => t.id === 4)
          ?.items.push({
            id: 32,
            name: "Entretien",
            link: "/materiel_de_transport/bon_de_voiture",
            icon: "/materiel_de_transport",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques CV")) {
        temp
          .find((t: any) => t.id === 4)
          ?.items.push({
            id: 33,
            name: "Course ville",
            link: "/materiel_de_transport/suivi_carburant",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques LE")) {
        temp
          .find((t: any) => t.id === 4)
          ?.items.push({
            id: 34,
            name: "Location externe",
            link: "/materiel_de_transport/location",
            icon: "",
          });
      }
      if (user.groups?.some((g) => g.service.name === "Logistiques LI")) {
        temp
          .find((t: any) => t.id === 4)
          ?.items.push({
            id: 35,
            name: "Location interne",
            link: "/materiel_de_transport/mission",
            icon: "",
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
          color: "error",
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
            {
              id: 5,
              name: "Mode de paiement",
              link: "/configurations/mode_de_paiement",
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
