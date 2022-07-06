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






const ListCommandeArticle = () => {
    return(
        <MyTableContainer sx={{ ml : 3 }}>
              <Typography variant="h5" >
                    Article à commander
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell style = {{width: 300}}>Désignation</TableCell>
                        <TableCell align="center" style = {{width: 300}}>Quantité</TableCell>
                        <TableCell align="center" style = {{width: 300}}>Prix unitaire</TableCell>
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
                        <TableCell align="center">{row.quantite}</TableCell>
                        <TableCell align="center">${row.prix_unitaire}</TableCell>
        
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
                            <TextField id="filled-basic" label="Saisir Désignation" variant="filled"  style = {{width: 300}}/>
                            <TextField id="filled-basic" label="Saisir quantité" variant="filled"  style = {{width: 300}}/>
                            <TextField id="filled-basic" label="Saisir PU" variant="filled"  style = {{width: 300}}/>
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
          
        
    );
}

export default ListCommandeArticle;

const MyTableContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    // border: "1px solid #E0E0E0",
    borderRadius: 20,
    background: "#fff",
    //width : 'px'
  }));