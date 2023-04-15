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
import { styled } from "@mui/material";
import Detail from "./detail";
import { useRouter } from "next/router";
import ListArticleOffre from "./table/ListArticle";

const FormGestionArticle = () => {
  const router = useRouter();
  const { commandId }: any = router.query;
  console.log("id", commandId);
  return (
    <>
      <Container maxWidth="xl">
        <NavigationContainer>
          <SectionNavigation>
            <Stack flexDirection={"row"}>
              <Link href={`/materiels/commande/${commandId}/offre`}>
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
            <Typography variant="h4">Gérer article pour un offre</Typography>
          </SectionNavigation>
          <Divider />
        </NavigationContainer>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Detail />
          <ListArticleOffre />
        </Stack>
      </Container>
    </>
  );
};

export default FormGestionArticle;

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
