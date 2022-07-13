import {
    Button,
    Container,
    styled,
    Typography,
    TextField,
    FormControl,
    Stack
  } from "@mui/material";
  import React from "react";
  import { Check, Close, Save } from "@mui/icons-material";
  
  const FormArticle = () => {
    return (
      <Container maxWidth="xl" sx={{ pb: 5 }}>
        <Typography variant="h5">Creer Article</Typography>
        <FormContainer spacing={2}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Designation"
            variant="outlined"
          />
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Quantite stocké" variant="outlined" />
          </FormControl>
          <FormControl fullWidth>
            <TextField id="outlined-basic" label="Prix Unitaire" variant="outlined" />
          </FormControl>
          <Stack
            direction="row-reverse"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
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
        </FormContainer>
      </Container>
    );
  };
  
  export default FormArticle;
  
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
  