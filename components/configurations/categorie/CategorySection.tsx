import React from "react";
import Container from "@mui/material/Container";
import { Button, Stack, Divider, Grid, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import CategoryHeader from "./CategoryHeader";
import ListCategorie from "./table/ListCategory";


const CategorySection = () => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <CategoryHeader />
        </Grid>
        <Grid item xs={12} md={8}>
          <ListCategorie />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategorySection;
