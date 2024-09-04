import React from "react";
import Container from "@mui/material/Container";
import List from "./table/ListModePaiement";
import { Grid } from "@mui/material";
import ModePaiementHeader from "./ModePaimentHeader";

const ModePaimentSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <ModePaiementHeader />
        </Grid>
        <Grid item xs={12} md={8}>
          <List />
        </Grid>
      </Grid>
    </Container>
  );
};

export default ModePaimentSection;
