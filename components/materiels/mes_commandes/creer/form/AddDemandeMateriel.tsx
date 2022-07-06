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
  import AttachFileIcon from "@mui/icons-material/AttachFile";
  import { Check, Close, Save } from "@mui/icons-material";
  import Switch from '@mui/material/Switch';
  import FormControlLabel from '@mui/material/FormControlLabel';

  const AddDemandeMateriel = () => {
        return(
            <Container maxWidth="xl" sx={{ pb: 5 }}>
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
                  <FormContainer spacing={2}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Titre"
                        variant="outlined"
                        //size="small"
                    />
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Demandeur</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            label="Demandeur"
                            //size="small"
                            // onChange={handleChange}
                        >
                            <MenuItem value={10}>Demandeur_1</MenuItem>
                            <MenuItem value={20}>Demandeur_2</MenuItem>
                            <MenuItem value={30}>Demandeur_3</MenuItem>
                        </Select>
                     </FormControl>
                     <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Raison de la commande"
                        variant="outlined"
                        //size="small"
                    />
                  </FormContainer>
            </Container>
        );
  }

  export default AddDemandeMateriel;

  
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
      padding: 30,
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    flex: 1,
    width: "100%",
  }));
  
  const SectionNavigation = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "5px",
  }))