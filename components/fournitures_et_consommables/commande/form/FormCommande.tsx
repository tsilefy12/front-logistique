import {
  Button,
  Container,
  styled,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Stack,
  Grid,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//const [article, setArticle] = React.useState("");

// const handleChange = (event: SelectChangeEvent) => {
//   setArticle(event.target.value as string);
// };
// const [demandeur, setDemandeur] = React.useState("");

// const handleChange_1 = (event: SelectChangeEvent) => {
//   setDemandeur(event.target.value as string);
// };

const FormCommande = () => {
  const [article, setArticle] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setArticle(event.target.value as string);
  };
  const [demandeur, setDemandeur] = React.useState("");

  const handleChange_1 = (event: SelectChangeEvent) => {
    setDemandeur(event.target.value as string);
  };
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Stack flexDirection={"row"}>
            <Link href="/fournitures_et_consommables/commande">
              <Button
                color="info"
                variant="text"
                startIcon={<ArrowBack />}
              >
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
          <Typography variant="h5">
            Commande des fourniture et consommable
          </Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>

      <FormContainer spacing={2}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Article
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={article}
            label="Article"
           // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Demandeur
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={demandeur}
            label="Demandeur"
           // onChange={handleChange_1}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <TextField
            fullWidth
            id="outlined-basic"
            label="Quantite demandeur"
            variant="outlined"
          />
          <FormControl fullWidth>
            <TextField
              id="outlined-basic"
              label="Quantité livrée"
              variant="outlined"
            />
          </FormControl>
        </Stack>
        <FormControl fullWidth>
          <TextField
            id="outlined-basic"
            label="Date de livraison"
            variant="outlined"
          />
        </FormControl>
      </FormContainer>
    </Container>
  );
};

export default FormCommande;

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
