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
  import Card from '@mui/material/Card';
  import CardContent from '@mui/material/CardContent';

  const FormDetentionMateriel = () => {
    return(
        <Container maxWidth="xl" sx={{ pb: 5 }}>
             <NavigationContainer>
                    <SectionNavigation>
                        <Stack flexDirection={"row"}>
                            <Link href="/detenteur">
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
                        <Typography variant="h4">Ajouter détenteur de materiels</Typography>
                    </SectionNavigation>
                    <Divider />
                </NavigationContainer>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <FormContainer spacing={2}>
                        <TextField id="filled-basic" label="Réference" variant="filled"  />
                        <Typography variant="h5">Employé</Typography>
                   
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                           <TextField id="filled-basic" label="Nom" variant="filled" sx={{ width : '50%' }} />
                           <TextField id="filled-basic" label="Prénoms" variant="filled" sx={{ width : '50%' }}/>
                    </CustomStack>
                    <CustomStack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                           <TextField id="filled-basic" label="Matricule" variant="filled"  sx={{ width : '50%' }}/>
                           <TextField id="filled-basic" label="Fonction" variant="filled"  sx={{ width : '50%' }}/>
                    </CustomStack>
                    </FormContainer>
                  </CardContent>
                 
                </Card>
        </Container>
    );
  };


  export default FormDetentionMateriel;


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