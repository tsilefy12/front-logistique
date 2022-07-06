import * as React from 'react';
import Grid from '@mui/material/Grid';
import AddDemandeMateriel from "./form/AddDemandeMateriel";
import Container from "@mui/material/Container";
import ListCommandeArticle from "./table/ListCommandeArticle";


const FormDemandeMateriel = () => {
    return(
        <Container maxWidth="xl">
            <Grid
                container
                spacing={2}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
               <AddDemandeMateriel />
               <ListCommandeArticle/>
             </Grid>

        </Container>
    );
}

export default FormDemandeMateriel;