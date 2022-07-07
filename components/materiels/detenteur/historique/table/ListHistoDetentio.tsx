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
import Grid from '@mui/material/Grid';


const ListHistoDetention = () =>{
    return(
        <MyTableContainer sx={{ ml : 3 }}>
            <Typography variant="h5" >
                Historique de détention
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style = {{width: 230}}>Détenteur</TableCell>
                        <TableCell align="center" style = {{width: 230}}>Programmme</TableCell>
                        <TableCell align="center" style = {{width: 230}}>Date début détention</TableCell>
                        <TableCell align="center" style = {{width: 230}}>Date fin détention</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {row.detenteur}
                        </TableCell>
                        <TableCell align="center">{row.programme}</TableCell>
                        <TableCell align="center">{row.date_debut_detention}</TableCell>
                        <TableCell align="center">{row.date_fin_detention}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> 
        </MyTableContainer>
    );
}

export default ListHistoDetention;

const MyTableContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    // border: "1px solid #E0E0E0",
    borderRadius: 20,
    background: "#fff",
    bottom : 2,
    //width : 'px'
  }));