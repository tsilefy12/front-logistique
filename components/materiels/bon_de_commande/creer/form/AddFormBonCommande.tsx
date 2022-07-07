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

  const AddFormBonCommande = () => {
     return (
        <Container maxWidth="xl" sx={{ pb: 5 }}>
          <NavigationContainer>
            <SectionNavigation>
              <Stack flexDirection={"row"}>
                <Link href="/Materiels/bon_de_commande">
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
              <Typography variant="h4">Créer un bon de commande</Typography>
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
                label="Numero"
                variant="outlined"
                //size="small"
              />
              <TextField
                fullWidth
                id="outlined-basic"
                label="Réference"
                variant="outlined"
               // size="small"
              />
          </CustomStack>
          <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Commande lié</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Commande lié"
                //size="small"
                // onChange={handleChange}
              >
                <MenuItem value={10}>Commande_1</MenuItem>
                <MenuItem value={20}>Commande_2</MenuItem>
                <MenuItem value={30}>Commande_3</MenuItem>
              </Select>
          </FormControl>
          <CustomStack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={{ xs: 2, sm: 2, md: 1 }}
          >
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Fournisseur</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Fournisseur"
                    //size="small"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Fournisseur_1</MenuItem>
                    <MenuItem value={20}>Fournisseur_2</MenuItem>
                    <MenuItem value={30}>Fournisseur_3</MenuItem>
                  </Select>
              </FormControl>
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Mode d'expedition</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={age}
                    label="Mode d'expedition"
                    //size="small"
                    // onChange={handleChange}
                  >
                    <MenuItem value={10}>Option_1</MenuItem>
                    <MenuItem value={20}>Option_2</MenuItem>
                    <MenuItem value={30}>Option_3</MenuItem>
                  </Select>
              </FormControl>
          </CustomStack>
          <CustomStack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={{ xs: 2, sm: 2, md: 1 }}
          >
             <TextField 
                    id="outlined-basic" 
                    type="date" 
                    label="Date de livraison" 
                    variant="outlined" 
                    //size="small"
                    sx={{ width : '50%' }}
              />
                <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  
                >
                    <Typography variant="body1" gutterBottom sx={{ ml:12 }}>
                            Validation
                    </Typography>
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        
                    >
                        <FormControlLabel  control={<Switch />} label="GSE" sx={{ ml:11 }}/>
                        <FormControlLabel  control={<Switch  />} label="DE" sx={{ ml:11 }}/>
                    </Stack>          
                </Stack>

          </CustomStack>
        </FormContainer>
        </Container>
     );
  }

export default AddFormBonCommande;


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
  }));