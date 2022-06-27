import * as React from 'react';
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TableArticle from './offre';

export default function ListArticle() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Typography sx={{ fontSize: 23 }} color="#000000" gutterBottom>
          <h5>Offre</h5>
        </Typography>
        <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={12}
        >
            <Grid container>
            <Grid item xs={6}>
            <Stack
         direction="column"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
            <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
        <Typography sx={{ fontSize: 15 }} color="secondary" gutterBottom>
         Numero : 
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="grey" gutterBottom>
         0000
        </Typography>
        </Stack>
        <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
        <Typography sx={{ fontSize: 15 }} color="secondary" gutterBottom>
        Societe : 
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="grey" gutterBottom>
        Apple 
        </Typography>
        </Stack>
        </Stack>
        </Grid>
        <Grid item xs={6}>
        <Stack
         direction="column"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
        <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
        <Typography sx={{ fontSize: 15 }} color="secondary" gutterBottom>
         Num proforma : 
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="grey" gutterBottom>
         1122
        </Typography>
        </Stack>
        <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
        <Typography sx={{ fontSize: 15 }} color="secondary" gutterBottom>
        Regime TVA : 
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="grey" gutterBottom>
        1020
        </Typography>
        </Stack>
        </Stack>
        </Grid>
        </Grid>
        </Stack>
        <Card>
            <CardContent>
                <TableArticle/>
            </CardContent>
        </Card>
        
    </CardContent>
    </Card>
  );
}