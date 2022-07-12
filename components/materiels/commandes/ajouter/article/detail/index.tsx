import { styled } from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import KeyValue from "../../../../../shared/keyValue";

const Detail = () => {
  return (
    <FormContainer spacing={2}>
      <Typography variant="h6">Offre</Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <KeyValue keyName="Numéro" value="0000" />
          <KeyValue keyName="Société" value="Apple" />
        </Grid>
        <Grid item xs={12} md={6}>
          <KeyValue keyName="Num proforma" value="1122" />
          <KeyValue keyName="Regime TVA" value="1020" />
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default Detail;

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