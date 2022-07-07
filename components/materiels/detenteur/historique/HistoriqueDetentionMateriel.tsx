import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from "@mui/material/Container";
import Nav from "./navigation/SectionNav";
import Detail from "./detail/Detail";
import ListHistoDetention from "./table/ListHistoDetentio";

const HistoriqueDetentionMateriel = () => {
    return(
        <Container maxWidth="xl">
            <Nav/>
            <Card>
                <CardContent>
                    <Detail/>
                    <ListHistoDetention/>
                </CardContent>
            </Card>        
        </Container>
    );
}

export default HistoriqueDetentionMateriel;





