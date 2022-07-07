import  { styled }  from "@mui/material";
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
import { rows } from './constante';
import Grid from '@mui/material/Grid';

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



const ListeArticle = () => {
    const [currency, setCurrency] = React.useState('Option_2');
    const [value, setValue] = React.useState<Date | null>(null);
    const [poste, setPoste] = React.useState('Option_2');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrency(event.target.value);
    };

    const handleChangePoste = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPoste(event.target.value);
    };

    return(
        <MyTableContainer sx={{ ml : 3 }}>
              <Typography variant="h5" >
                    Article
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Grant</TableCell>
                        <TableCell align="center" style = {{width: 160}}>Poste analytique</TableCell>
                        <TableCell align="center" style = {{width: 160}}>Désignation</TableCell>
                        <TableCell align="center" style = {{width: 160}}>Prix unitaire</TableCell>
                        <TableCell align="center" style = {{width: 160}}>Quantité</TableCell>
                        <TableCell align="center" style = {{width: 160}}>Montant Total TTC</TableCell>
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
                        <TableCell align="center" style = {{width: 150}}>
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
                  </TableBody>
                </Table>
                     <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={0}
                        >
                    
                            <TextField
                             id="filled-select-currency"
                                select
                                label="Ligne buggétaire"
                                value={currency}
                                onChange={handleChange}
                                variant="filled"
                                style = {{width: 160}}
                            >
                                 {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                 ))}
                            </TextField>
                      
                      
                            <TextField
                                id="filled-select-currency"
                                select
                                label="Poste analytique"
                                value={poste}
                                onChange={handleChangePoste}
                                variant="filled"
                                style = {{width: 160}}
                               
                            >
                                 {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                 ))}
                            </TextField>
                            <TextField id="filled-basic" label="Désination" variant="filled"  style = {{width: 160}}/>
                            <TextField id="filled-basic" label="Prix unitaire" variant="filled"  style = {{width: 160}}/>
                            <TextField id="filled-basic" label="Quantite" variant="filled"  style = {{width: 160}}/>
                               

                            <TextField id="filled-basic" label="Montant TTC" variant="filled"  style = {{width: 140}}/>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                style = {{width: 150 }}
                            >
                                 <DoneIcon color="info" />
                                 <CloseIcon color="warning"/>
                            </Stack>       
                                
                            
                           
                        </Stack>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            sx={{ mt : 2 }}
                        >
                             <Button size="small" color="info"><AddIcon/>Ajouter Article</Button>
                             <Typography variant="body2"
                                sx={{ ml : 70 }}
                             >
                                    Total
                            </Typography>   
                            <Typography variant="body2" 
                                sx={{ ml : 15 }}
                            >
                                    75000 Ar
                            </Typography> 
                        </Grid>
            </TableContainer> 
        </MyTableContainer>
          
        
    );
}

export default ListeArticle;



  const MyTableContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    // border: "1px solid #E0E0E0",
    borderRadius: 20,
    background: "#fff",
  }));