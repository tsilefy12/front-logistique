import { styled } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import KeyValue from "../../../../../shared/keyValue";

const Commande = () => {
  return (
    <FormContainer spacing={2}>
      <Typography variant="h6">Commande</Typography>

      <Grid container>
        <Grid item xs={12} md={6}>
          <KeyValue keyName="Demandeur" value="Kristin Watson" />
          <KeyValue keyName="Designation" value="Commande_1" />
        </Grid>
        <Grid item xs={12} md={6}>
          <KeyValue keyName="Quantité" value="12" />
          <KeyValue keyName="Deadline de réception" value="12/04/2022" />
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default Commande;

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
