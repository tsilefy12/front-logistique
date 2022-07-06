import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";
import FormDetentionMateriel from './form/FormDetentionMateriel';
import ListDetentionMateriel from './table/ListDetentionMateriel'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const ListFormDetationMateriel = () => {
    return(
        <Container maxWidth="xl">
<<<<<<< Updated upstream
             <Card sx={{ minWidth: 275 }}>
                <CardContent>
=======
             
               
>>>>>>> Stashed changes
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <FormDetentionMateriel/>
                        <ListDetentionMateriel/>
                    </Grid>
<<<<<<< Updated upstream
                </CardContent>
             </Card>

=======
               
            
>>>>>>> Stashed changes
           
        </Container>
    );
}

export default ListFormDetationMateriel;