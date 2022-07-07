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






const Detail = () => {
    return(
        <Container maxWidth="xl" sx={{ pb: 5 }}>
                    <Typography variant="h5">Materiels séléctioné</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Stack
                              direction="column"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              spacing={1}
                            
                          >
                              <Typography variant="subtitle1" gutterBottom component="div">
                                      Référence : CH001
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom component="div">
                                      Date d'acquisition : 11/03/2021
                              </Typography>
                          </Stack>
                          </Grid>
                          <Grid item xs={6}>
                          <Stack
                              direction="column"
                              justifyContent="flex-start"
                              alignItems="flex-start"
                              spacing={1}
                              sx={{ mr : 30 }}
                            
                          >
                              <Typography variant="subtitle1" gutterBottom component="div">
                                      Désignation : Imprimente
                              </Typography>
                              <Typography variant="subtitle1" gutterBottom component="div">
                                      Valeur d'acquisition : 1 000 000 Ar
                              </Typography>
                          </Stack>
                          </Grid>
                          </Grid>
        </Container>
    );
}


export default Detail;

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