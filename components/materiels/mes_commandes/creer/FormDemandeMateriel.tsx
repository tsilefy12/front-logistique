import * as React from "react";
import AddDemandeMateriel from "./form/AddDemandeMateriel";
import ListCommandeArticle from "./table/ListCommandeArticle";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { styled } from "@mui/material";

const FormDemandeMateriel = () => {
  return (
    <Container maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation>
          <Stack flexDirection={"row"}>
            <Link href="/materiels/mes_commandes">
              <Button color="info" variant="text" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Check />}
              sx={{ marginInline: 3 }}
            >
              Enregistrer
            </Button>
            <Button
              variant="text"
              color="warning"
              size="small"
              startIcon={<Close />}
              sx={{ marginInline: 3 }}
            >
              Annuler
            </Button>
          </Stack>
          <Typography variant="h4">Créer commande</Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>
      <Stack spacing={1} direction="column">
        <AddDemandeMateriel />
        <ListCommandeArticle />
      </Stack>
    </Container>
  );
};

export default FormDemandeMateriel;

const NavigationContainer = styled(Stack)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  flexDirection: "column",
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "5px",
  width: "100%",
}));
