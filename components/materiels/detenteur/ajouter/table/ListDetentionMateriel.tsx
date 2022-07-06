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
import  { styled }  from "@mui/material";
<<<<<<< Updated upstream


const ListDetentionMateriel = () => {
    return(
    <MyTableContainer>
         <Card sx={{ minWidth: 270 }}>
            <CardContent>
                <Typography variant="h5" >
                        Matériels
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>N° OPTIM</TableCell>
                                <TableCell align="center">Désignation</TableCell>
                                <TableCell align="center">Date d'acquisition</TableCell>
                                <TableCell align="center">Valeur d'acquisition</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.numero}
                            </TableCell>
                            <TableCell align="center">{row.designation}</TableCell>
                            <TableCell align="center">{row.date_acquisition} </TableCell>
                            <TableCell align="center">{row.valeur_acquisition} Ar</TableCell>
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
                                    <TextField id="filled-basic" label="Saisir N° OPTIM" variant="filled" />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField id="filled-basic" label=" Saisir désignation" variant="filled" />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField id="filled-basic" label=" Saisir date d'acquisition" variant="filled" />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField id="filled-basic" label=" Saisir valeur d'acquisition" variant="filled" />
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
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    </MyTableContainer>
       
=======
import Grid from '@mui/material/Grid';

const ListDetentionMateriel = () => {
    return(
        <MyTableContainer sx={{ ml : 3 }}>
            <Typography variant="h5" >
                Article à commander
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style = {{width: 230}}>N° OPTIM</TableCell>
                        <TableCell align="center" style = {{width: 230}}>Désignation</TableCell>
                        <TableCell align="center" style = {{width: 230}}>Date d'acquisition</TableCell>
                        <TableCell align="center" style = {{width: 230}}>Valeur d'acquisition</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.numero}
                        </TableCell>
                        <TableCell align="center">{row.designation}</TableCell>
                        <TableCell align="center">{row.date_acquisition}</TableCell>
                        <TableCell align="center">{row.valeur_acquisition} Ar</TableCell>
        
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
                            <TextField id="filled-basic" label="Saisir N°OPTIM" variant="filled"  style = {{width: 230}}/>
                            <TextField id="filled-basic" label="Saisir désignation" variant="filled"  style = {{width: 230}}/>
                            <TextField id="filled-basic" label="Saisir date d'acquistion" variant="filled"  style = {{width: 230}}/>
                            <TextField id="filled-basic" label="Saisir valeur d'acquistion" variant="filled"  style = {{width: 230}}/>
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
                        </Grid>
            </TableContainer> 
        </MyTableContainer>
>>>>>>> Stashed changes
    );
}


export default ListDetentionMateriel;

const MyTableContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
<<<<<<< Updated upstream
    width : '1220px',
    height : '500px',
    // border: "1px solid #E0E0E0",
    borderRadius: 20,
    background: "#fff",
  
=======
    // border: "1px solid #E0E0E0",
    borderRadius: 20,
    background: "#fff",
    bottom : 2,
    //width : 'px'
>>>>>>> Stashed changes
  }));