import React from "react";
import Container from "@mui/material/Container";
import { Button, Stack, Divider, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import HeaderTypeProduit from "./HeaderTypeProduit";
import ListTypeProduit from "./table/ListTypeProduit";


const TypeProduitSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <HeaderTypeProduit />
        </Grid>
        <Grid item xs={12} md={8}>
          <ListTypeProduit />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TypeProduitSection;
