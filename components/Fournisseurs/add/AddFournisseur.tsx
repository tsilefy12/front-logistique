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
  
  const AddFournisseur = () => {
    return (
      <Container maxWidth="xl" sx={{ pb: 5 }}>
        <NavigationContainer>
          <SectionNavigation>
            <Stack flexDirection={"row"}>
              <Link href="/employe/contracts">
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
          <TextField
            fullWidth
            id="outlined-basic"
            label="nom"
            variant="outlined"
          />
          <FormControl fullWidth>
          <TextField id="outlined-basic" label="Adresse" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
          <TextField id="outlined-basic" label="Téléphone" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          </FormControl>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Site Web"
            variant="outlined"
          />
          <Button
            color="inherit"
            fullWidth
            variant="outlined"
            startIcon={<AttachFileIcon />}
          >
            PJ : Contrat_rakoto_randria.jpeg
          </Button>
        </FormContainer>
      </Container>
    );
  };
  
  export default AddFournisseur;
  
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
  