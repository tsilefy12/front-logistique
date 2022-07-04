import * as React from 'react';
import {
    Container,
    styled,
    FormControl,
    InputLabel,
    Select, 
    Stack,
  } from "@mui/material";
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { rows } from './constante';


const ListArticleCommander = () => {

    return (
        <Container maxWidth="xl" sx={{ pb: 5 }}>
            <FormContainer>
            <Typography variant="h5" >
                        Article à Commander
                </Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Désignation</TableCell>
                                <TableCell align="center">Quantité</TableCell>
                                <TableCell align="center">Prix unitaire</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.designation}
                            </TableCell>
                            <TableCell align="center">{row.quanite}</TableCell>
                            <TableCell align="center">{row.prix_unitaire} Ar</TableCell>
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
                                    <TextField id="filled-basic" label="Désignation" variant="filled" />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField id="filled-basic" label="Quantité" variant="filled" />
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <TextField id="filled-basic" label="Prix unitaire" variant="filled" />
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
            </FormContainer>
                 
        </Container>
               
         
    );
};

export default ListArticleCommander;

const FormContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    // border: "1px solid #E0E0E0",
    borderRadius: 20,
    background: "#fff",
  }));