import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close, Save } from "@mui/icons-material";

const AddArticleForm = () => {
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Stack flexDirection={"row"}>
            <Link href="/materiels/informatiques">
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
          <Typography variant="h4">Créer materiel informatique</Typography>
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
            label="N° OPTIM"
            variant="outlined"
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Type"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Type 1</MenuItem>
              <MenuItem value={20}>Type 2</MenuItem>
              <MenuItem value={30}>Type 3</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Etat</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Etat"
              // onChange={handleChange}
            >
              <MenuItem value={10}>Etat 1</MenuItem>
              <MenuItem value={20}>Etat 2</MenuItem>
              <MenuItem value={30}>Etat 3</MenuItem>
            </Select>
          </FormControl>
        </CustomStack>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Employé utilisateur
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Employé utilisateur"
            // onChange={handleChange}
          >
            <MenuItem value={10}>Employé Ten</MenuItem>
            <MenuItem value={20}>Employé Twenty</MenuItem>
            <MenuItem value={30}>Employé Thirty</MenuItem>
          </Select>
        </FormControl>
        <CustomStack
          direction={{ xs: "column", sm: "column", md: "row" }}
          spacing={{ xs: 2, sm: 2, md: 1 }}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Date d'acquisition"
            variant="outlined"
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Valeur d'acquisition"
            variant="outlined"
          />
        </CustomStack>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Information suplémentaire"
          variant="outlined"
        />
        <TextField
          fullWidth
          id="outlined-basic"
          label="Déscription"
          variant="outlined"
        />
      </FormContainer>
    </Container>
  );
};

export default AddArticleForm;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  // border: "1px solid #E0E0E0",
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
