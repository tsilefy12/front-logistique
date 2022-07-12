import {
    styled,
    TextField,
    FormControl,
    InputLabel,
    Select, 
    MenuItem,
    Stack,
  } from "@mui/material";
  import React from "react";

const FormFactureConsommation = () => {
    return (
        <FormContainer spacing={2}>
          <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Numéro BV"
              variant="outlined"
              />
              <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Numéro facture</InputLabel>
                  <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Numéro facture"
                  // onChange={handleChange}
                  >
                  <MenuItem value={10}>Facture 1</MenuItem>
                  <MenuItem value={20}>Facture 2</MenuItem>
                  <MenuItem value={30}>Facture 3</MenuItem>
                  </Select>
              </FormControl>
          </CustomStack>
          <TextField
              fullWidth
              id="outlined-basic"
              label="PA"
              variant="outlined"
          />
          <TextField
              fullWidth
              id="outlined-basic"
              label="Motif de la course"
              variant="outlined"
          />
          <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Kimomètre de départ"
              variant="outlined"
              />
              <TextField
              fullWidth
              id="outlined-basic"
              label="Kimomètre d'arrivé"
              variant="outlined"
              />
          </CustomStack>
          <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="Consommation"
              variant="outlined"
              />
              <TextField
              fullWidth
              id="outlined-basic"
              label="Unité"
              variant="outlined"
              />
          </CustomStack>
          <CustomStack
              direction={{ xs: "column", sm: "column", md: "row" }}
              spacing={{ xs: 2, sm: 2, md: 1 }}
          >
            <TextField
              fullWidth
              id="outlined-basic"
              label="PU"
              variant="outlined"
              />
              <TextField
              fullWidth
              id="outlined-basic"
              label="Montant"
              variant="outlined"
              />
          </CustomStack>
        </FormContainer>
    );
}


export default FormFactureConsommation;

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
