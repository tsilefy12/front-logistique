import * as React from 'react';
import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import TableOffre from './form/Content';

export default function List() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Typography sx={{ fontSize: 23 }} color="#000000" gutterBottom>
          <h5>Commande</h5>
        </Typography>
        <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
        <Typography sx={{ fontSize: 15 }} color="secondary" gutterBottom>
         Demandeur : 
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="grey" gutterBottom>
         Kristin Watson
        </Typography>
        </Stack>
        <Stack
         direction="row"
         justifyContent="flex-start"
         alignItems="flex-start"
         spacing={1}
        >
        <Typography sx={{ fontSize: 15 }} color="secondary" gutterBottom>
         Designation : 
        </Typography>
        <Typography sx={{ fontSize: 15 }} color="grey" gutterBottom>
         Commande_1
        </Typography>
        </Stack>
        <TableOffre/>
    </CardContent>
    </Card>
  );
}