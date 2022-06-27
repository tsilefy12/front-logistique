import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
const currencies = [
    {
      value: '1',
      label: 'Option_1',
    },
    {
      value: '2',
      label: 'Option_2',
    },
    {
      value: '3',
      label: 'Option_3',
    },
    {
      value: '4',
      label: 'Option_4',
    },
  ];



function createData(
    id: string,
    grant: string,
    poste: number,
    designation: string,
    prix_unitaire: number,
    quanite: number,
    montantTotal : number
  ) {
    return { id, grant, poste, designation, prix_unitaire, quanite, montantTotal };
  }

  const rows = [
    createData('1', 'DWI-SSD', 1002, 'Article_1', 50000, 1, 50000),
    createData('2', 'DWI-SSD2', 1004, 'Article_1', 50000, 1, 50000),
    createData('3', 'DWI-SSD2', 1005, 'Article_1', 50000, 1, 50000),
  ];


export default function ListeTableBonCommande() {
    const [currency, setCurrency] = React.useState('Option_2');
    const [value, setValue] = React.useState<Date | null>(null);
    const [poste, setPoste] = React.useState('Option_2');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrency(event.target.value);
    };

    const handleChangePoste = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoste(event.target.value);
    };

    return (
        <Card sx={{ minWidth: 270 }}>
            <CardContent>
            <Typography variant="h5" >
                    Article
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Grant</TableCell>
                        <TableCell align="center">Poste analytique</TableCell>
                        <TableCell align="center">Désignation</TableCell>
                        <TableCell align="center">Prix unitaire</TableCell>
                        <TableCell align="center">Quantité</TableCell>
                        <TableCell align="center">Montant Total TTC</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.grant}
                        </TableCell>
                        <TableCell align="center">{row.poste}</TableCell>
                        <TableCell align="center">{row.designation}</TableCell>
                        <TableCell align="center">{row.prix_unitaire} Ar</TableCell>
                        <TableCell align="center">{row.quanite}</TableCell>
                        <TableCell align="center">{row.montantTotal} Ar</TableCell>
                        <TableCell align="center">
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                    <EditIcon color="primary"/>
                                    <DeleteIcon color="warning"/>
                            </Stack>
                        </TableCell>
                        </TableRow>
                    ))}
                    <TableRow
                        key={'input'}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                        <TextField
                            id="filled-select-currency"
                            select
                            label="Ligne budgétaire"
                            value={currency}
                            onChange={handleChange}
                            variant="filled"
                            style = {{width: 150}}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                   
                        </TextField>
                        </TableCell>
                        <TableCell align="right">
                        <TextField
                            id="filled-select-currency"
                            select
                            label="Poste analytique"
                            value={poste}
                            onChange={handleChangePoste}
                            variant="filled"
                            style = {{width: 150}}
                            >
                                {currencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                   
                        </TextField>
                        </TableCell>
                        <TableCell align="right"><TextField id="filled-basic" label="Désignation" variant="filled" /></TableCell>
                        <TableCell align="right"> <TextField id="filled-basic" label="Prix unitaire" variant="filled" /></TableCell>
                        <TableCell align="right"> <TextField id="filled-basic" label="Quantite" variant="filled" /></TableCell>
                        <TableCell align="right"> 
                            <TextField id="filled-basic" label="Montant TTC" variant="filled" style = {{width: 150}} />
                        </TableCell>
                        <TableCell align="right">
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                    <DoneIcon color="info"/>
                                    <CloseIcon color="warning"/>
                            </Stack>
                        </TableCell>
                        </TableRow>
                        <TableRow
                        key={'input'}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"> </TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"> </TableCell>
                            <TableCell align="center">
                                <Typography variant="body2" >
                                    Total
                                </Typography> 
                            </TableCell>
                            <TableCell align="center">
                                <Typography variant="body2" >
                                    75000 Ar
                                </Typography> 
                            </TableCell>
        
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> 
            </CardContent>
            <CardActions>
                <Button size="small" color="info"><AddIcon/>Ajouter Article</Button>
            </CardActions>
        </Card>
        
    );
}