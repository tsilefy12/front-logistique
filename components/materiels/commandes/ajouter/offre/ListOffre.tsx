import * as React from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { Grid, TextField, styled } from "@mui/material";
import Commande from "./form/Commande";
// import TableOffre from "./table/ListOffre";
import FormulaireOffre from "./form/Formulaire";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxHooks";
import { getOrderEquipment } from "../../../../../redux/features/orderEquipment";
import ListOffre from "./table/ListOffre";

const ListFormCommandeOffre = () => {
  const router = useRouter();
  return (
    <>
      <Container maxWidth="xl">
        <NavigationContainer>
          <SectionNavigation>
            <Stack flexDirection={"row"}>
              <Link href="/materiels/commande">
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
            <Typography variant="h4">Gerer offres</Typography>
          </SectionNavigation>
          <Divider />
        </NavigationContainer>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Commande  />
          <ListOffre />
          <FormContainer spacing={2}>
            <Typography variant="h6">Offre retenu</Typography>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Offre retenu"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="outlined-argument"
              multiline
              rows={4}
              label="Arguments"
              variant="outlined"
            />
          </FormContainer>
        </Stack>
      </Container>
    </>
  );
};

export default ListFormCommandeOffre;

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "5px",
}));
const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  padding: 30,
  borderRadius: 20,
  background: "#fff",
}));
