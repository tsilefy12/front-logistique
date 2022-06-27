import Grid from '@mui/material/Grid';
import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import TableDetailStock from './table';
export default function ListeDetailStock() {
    return(
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start"
            sx={{
                ml : 1
            }}
        >
            <Container>
                <Button variant="text" size="small" color="info"  sx={{ ml : 1  
                    }}>
                        <ArrowBackIcon/>Retour
                </Button>
                <Divider sx={{
                    mt : 1
                }}/>
            </Container>
            <Container>
                <TableDetailStock /> 
            </Container>
        </Grid>
    );
}