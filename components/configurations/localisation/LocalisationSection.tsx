import React from "react";
import Container from "@mui/material/Container";
import List from "./table/ListLocalisation";
import { Grid } from "@mui/material";
import LocalisationHeader from "./LocalisationHeader";

const LocalisationSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <LocalisationHeader />
        </Grid>
        <Grid item xs={12} md={8}>
          <List />
        </Grid>
      </Grid>
    </Container>
  );
};

export default LocalisationSection;
