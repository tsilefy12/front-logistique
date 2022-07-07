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
  import { Check, Close, Save } from "@mui/icons-material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
  
  const [demandeur, setDemandeur] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setDemandeur(event.target.value as string);
  };
  const [grant, setgrant] = React.useState('');

  const ifChange = (event: SelectChangeEvent) => {
    setgrant(event.target.value as string);
  };
  const FormCommande = () => {
    return (
      <Container maxWidth="xl" sx={{ pb: 5 }}>
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
            <Typography variant="h4">Créer(modifier) fournisseur</Typography>
          </SectionNavigation>
          <Divider />
        </NavigationContainer>
  
        <FormContainer spacing={2}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Demandeur</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={demandeur}
          label="Demandeur"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">GRANT</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={grant}
          label="GRANT"
          onChange={ifChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Designation"
            variant="outlined"
          />
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
          <FormControl fullWidth>
                      <TextField id="outlined-basic" label="Nombre d'offres autorisé possible pour une commande" variant="outlined" />
                    </FormControl>
                    <FormControl fullWidth>
                      <TextField id="outlined-basic" label="Ligne budgétaire maximale pour une commande" variant="outlined" />
                    </FormControl>
          </Stack>
                    
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
          >
          <FormControl fullWidth>
                      <TextField id="outlined-basic" label="Quantité" variant="outlined" />
                    </FormControl>
                    <TextField
                      fullWidth
                      id="outlined-basic"
                      label="Deadline de réception"
                      variant="outlined"
                    />
          </Stack>
          
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
  