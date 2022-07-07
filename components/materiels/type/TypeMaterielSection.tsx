import React from "react";
import Container from "@mui/material/Container";
import { Button, Grid, Stack, Divider, Typography, styled } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import FormTypeMaterielfrom from "./FormTypeMateriel";
import TypeMaterielList from "./table/TypeMaterielList";

const TypeMaterielSection = () => {
    return(
        <Container maxWidth="xl">
             <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <FormTypeMaterielfrom/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <TypeMaterielList/>
                </Grid>
             </Grid>
        </Container>
    );
}

const SectionNavigation = styled(Stack)(({ theme }) => ({}));
export default TypeMaterielSection; 