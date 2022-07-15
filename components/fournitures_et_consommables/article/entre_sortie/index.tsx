import React from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const FomLogEntreSortie = () => {
    return(
        <Container maxWidth="xl">
            <NavigationContainer>
                <SectionNavigation>
                <Stack flexDirection={"row"}>
                    <Link href="/fournitures_et_consommables/article">
                    <Button color="warning" variant="text">
                        Annuler
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
                </Stack>
                <Typography variant="h4">Créer fourniture et consommable</Typography>
                </SectionNavigation>
                <Divider />
            </NavigationContainer>
            <FormContainer spacing={2} sx={{ mt : 3 }}>
                <CustomStack
                    direction={{ xs: "column", sm: "column", md: "row" }}
                    spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                   <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Date"
                        variant="outlined"
                        sx= {{ width : '50%' }}
                    />
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <FormControlLabel
                            control={<Checkbox  size="small"/>} 
                            label="Entré"  
                            sx={{ ml : 20 }}
                        />
                        <FormControlLabel 
                            control={<Checkbox  size="small"/>} 
                            label="Sortie"  
                        />
                    </Stack>
                </CustomStack>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Quantité"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Prix unitaire"
                    variant="outlined"
                />
                 <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Valeur de stock"
                    variant="outlined"
                />
            </FormContainer>  
        </Container>
    );
}

export default FomLogEntreSortie;


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