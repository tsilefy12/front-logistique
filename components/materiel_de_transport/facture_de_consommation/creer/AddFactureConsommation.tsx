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
import FormFactureConsommation from "./form";

const AddFactureConsommation = () => {
    return(
        <Container maxWidth="xl">
            <NavigationContainer>
                <SectionNavigation>
                    <Stack flexDirection={"row"}>
                        <Link href="/materiel_de_transport/facture_de_consommation">
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
                    <Typography variant="h4">Créer facture de consommation</Typography>
                </SectionNavigation>
                <Divider />
            </NavigationContainer>
            <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <FormFactureConsommation/>
            </Stack>      
        </Container>
    );
}

export default AddFactureConsommation;

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

