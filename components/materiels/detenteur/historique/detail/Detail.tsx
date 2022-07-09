import { Container, styled, Typography, Stack, Grid } from "@mui/material";
import React from "react";
import KeyValue from "../../../../shared/keyValue";

const Detail = () => {
  return (
    <DetailContainer>
      <Typography variant="h5">Materiels séléctioné</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <KeyValue keyName="Référence" value="CH001" />
          <KeyValue keyName="Date d'acquisition" value="11/03/2021" />
        </Grid>
        <Grid item xs={6}>
          <KeyValue keyName="Désignation" value="Imprimente" />
          <KeyValue keyName="Valeur d'acquisition" value="1 000 000 Ar" />
        </Grid>
      </Grid>
    </DetailContainer>
  );
};

export default Detail;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const DetailContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
}));
