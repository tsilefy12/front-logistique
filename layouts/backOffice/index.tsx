import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import RequireAuth from "../../redux/features/auth/RequireAuth";
import MvBreadcrumbs from "./Breadcrumbs";
import FooterBackOffice from "./FooterBackOffice";
import NavbarBackOffice from "./navbar/NavbarBackOffice";
import NavbarMobile from "./navbar/NavbarMobile";

const BackOfficeLayout = ({ children }: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  function verifyPermission(path: string, service: string) {
    if (router.pathname.includes(path)) {
      if (!user!.groups?.some((g) => g.service.name === service)) {
        router.push("/");
      }
    }
  }
  React.useEffect(() => {
    if (user) {
      if (!user.groups?.some((g) => g.service.name === "Logistiques")) {
        window.location.href = "/";
      }
      verifyPermission("/materiels/bon_commande_externe", "Logistiques BCE");
      verifyPermission(
        "/materiels/bon_de_commande_fournisseur",
        "Logistiques BCF"
      );
      verifyPermission("/materiels/bon_commande_interne", "Logistiques BCI");
      verifyPermission("/materiels/bon_reception", "Logistiques BR");
      verifyPermission("/materiels/bon_transfert", "Logistiques BT");
      verifyPermission("/materiels/fiche_dotation", "Logistiques FD");
      verifyPermission("/materiels/detenteur", "Logistiques FDM");
      verifyPermission("/materiels/informatiques", "Logistiques LMS");
      verifyPermission("/materiels/stocks", "Logistiques LMS");
      verifyPermission("/materiels/pv_comparaison", "Logistiques PV");
      verifyPermission("/materiels/inventaire", "Logistiques I");
      verifyPermission(
        "/fournitures_et_consommables/fiche_de_stock",
        "Logistiques FS"
      );
      verifyPermission(
        "/fournitures_et_consommables/entre_et_sortie",
        "Logistiques ES"
      );
      verifyPermission("/materiel_de_transport", "Logistiques Mat");
      verifyPermission(
        "/materiel_de_transport/bon_de_voiture",
        "Logistiques Ent"
      );
      verifyPermission(
        "/materiel_de_transport/suivi_carburant",
        "Logistiques CV"
      );
      verifyPermission("/materiel_de_transport/location", "Logistiques LE");
      verifyPermission("/materiel_de_transport/mission", "Logistiques LI");
      verifyPermission("/fournisseurs", "Logistiques FRS");
      verifyPermission("/configurations", "Logistiques configurations");
    }
  }, [user]);
  return (
    <RequireAuth>
      <Box sx={{ position: "relative" }}>
        {matches ? (
          <NavbarMobile matches={matches} />
        ) : (
          <NavbarBackOffice matches={matches} />
        )}
        <MvBreadcrumbs />
        <Box sx={{ minHeight: "87vh" }}>{children}</Box>
        <FooterBackOffice />
      </Box>
    </RequireAuth>
  );
};

export default BackOfficeLayout;
