import React from "react";
import Container from "@mui/material/Container";
import { Button, Stack, Divider, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import UniteStockForm from "./UniteStockHeader";
import ListStock from "../../materiels/stock/ListStock";
import ListeUniteStock from "../../../pages/configurations/unite_de_stock";
import List from "./table/ListUniteStock";

const UniteStockSection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <UniteStockForm />
        </Grid>
        <Grid item xs={12} md={8}>
          <List />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UniteStockSection;
