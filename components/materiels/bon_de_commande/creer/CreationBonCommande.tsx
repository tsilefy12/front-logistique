import * as React from 'react';
import Grid from '@mui/material/Grid';
import AddFormBonCommande from './form/AddFormBonCommande';
import ListeArticle from './table/ListeArticle';
import Container from "@mui/material/Container";

const CreationBonCommande = () => {
    return(
        <Container maxWidth="xl">
            <Grid
                container
                spacing={1}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <AddFormBonCommande/>
                <ListeArticle/>
             </Grid>

        </Container>
    );
}

export default CreationBonCommande;