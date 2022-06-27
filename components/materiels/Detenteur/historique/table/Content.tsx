import * as React from 'react';
import {
  Stack,
  styled
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'
import CloseIcon from '@mui/icons-material/Close'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function create(
    detenteur: string,
    programme: string,
    date_debut: string,
    date_fin: string,
  ) {
    return {detenteur,
        programme,
        date_debut,
        date_fin};
  }
  
  const data = [
    create('Diane Russel','Communauté','01/01/2022','03/01/2022'),
    create('Diane Russel','Communauté','01/01/2022','03/01/2022'),
    create('Diane Russel','Communauté','01/01/2022','03/01/2022'),
    create('Diane Russel','Communauté','01/01/2022','03/01/2022'),
  ];




function createData(
  name: string,
  calories: string,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('0000', 'Brand garage', 6.0, 24, 4.0),
  createData('0000', 'Brand garage', 9.0, 37, 4.3),
  createData('0000', 'Brand garage',1, 24, 6.0),
];

export default function Content() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 23 }} variant="h5" color="#000000" gutterBottom>
          Materiel selectionné
        </Typography>
        <Stack
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start"
  spacing={12}
>
        <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        >
            <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        >
            <Typography variant="subtitle-1" color="secondary">
          Réference:
        </Typography>
        <Typography variant="subtitle-1" color="grey">
          CH01
        </Typography>
        </Stack>
        <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        >
            <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        >
            <Typography variant="subtitle-1" color="secondary">
          Date d'acquisition:
        </Typography>
        <Typography variant="subtitle-1" color="grey">
          11/03/2021
        </Typography>
        </Stack>
        </Stack>
        </Stack>
        <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        >
        <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        >
            <Typography variant="subtitle-1" color="secondary">
          Désignation:
        </Typography>
        <Typography variant="subtitle-1" color="grey">
          Imprimante
        </Typography>
        </Stack>
        <Stack
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        >
            <Stack
        direction="row"
        justifyContent="center"
        alignItems="flex-start"
        spacing={2}
        >
            <Typography variant="subtitle-1" color="secondary">
          Valeur d'acquisition:
        </Typography>
        <Typography variant="subtitle-1" color="grey">
          1 000 000 Ar
        </Typography>
        </Stack>
        </Stack>
        </Stack>
        </Stack>
        </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
      <CardContent>
      <Typography sx={{ fontSize: 23 }} variant="h5" color="#000000" gutterBottom>
         Historiques de détention
        </Typography>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Detenteur</TableCell>
            <TableCell align="right">Programme</TableCell>
            <TableCell align="right">Date début détention</TableCell>
            <TableCell align="right">Date fin détention</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.detenteur}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.detenteur}
              </TableCell>
              <TableCell align="right">{row.programme}</TableCell>
              <TableCell align="right">{row.date_debut}</TableCell>
              <TableCell align="right">{row.date_fin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </CardContent>
        </Card>
    </CardContent>
    </Card>
  );
}