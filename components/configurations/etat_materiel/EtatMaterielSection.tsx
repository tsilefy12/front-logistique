import React from "react";
import Container from "@mui/material/Container";
import { Button, Stack, Divider, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import EtatMaterielForm from "./EtatMaterielForm";
import ListEtatMateriel from "./table/ListEtatMateriel";

const EtatMaterielSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <EtatMaterielForm />
        </Grid>
        <Grid item xs={12} md={8}>
          <ListEtatMateriel />
        </Grid>
      </Grid>
    </Container>
  );
};

export default EtatMaterielSection;
