import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import FormDemmandeCommandeMateriel from './form/FormDemmandeCommandeMateriel';
import ListArticleCommander from './table/ListArticleCommander';

const CreationFormDemmandeCommandeMateriel = () => {
    return(
        <Container maxWidth="xl">
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <FormDemmandeCommandeMateriel/>
                <ListArticleCommander/> 
            </Grid>
        </Container>
    );
}

export default CreationFormDemmandeCommandeMateriel;