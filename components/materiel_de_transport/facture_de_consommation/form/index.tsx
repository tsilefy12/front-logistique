import React from "react";
import Link from "next/link";
import  TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { styled } from "@mui/material";

const FormFactureConsommation = () => {
  return (
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
      <FormContainer spacing={2}>
        <CustomStack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 1 }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Numéro BV"
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Numéro facture
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Numéro facture"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Facture 1</MenuItem>
              <MenuItem value={20}>Facture 2</MenuItem>
              <MenuItem value={30}>Facture 3</MenuItem>
            </Select>
          </FormControl>
        </CustomStack>
        <TextField
          fullWidth
          id="outlined-basic"
          label="PA"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Motif de la course"
          variant="outlined"
        />
        <CustomStack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 1 }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Kimomètre de départ"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Kimomètre d'arrivé"
            variant="outlined"
          />
        </CustomStack>
        <CustomStack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 1 }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Consommation"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Unité"
            variant="outlined"
          />
        </CustomStack>
        <CustomStack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 1 }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="PU"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Montant"
            variant="outlined"
          />
        </CustomStack>
      </FormContainer>
    </Container>
  );
};

export default FormFactureConsommation;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  padding: 30,
  borderRadius: 20,
  background: "#fff",
}));

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
