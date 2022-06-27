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
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function createData(
    id : int,
    designation: string,
    quanite: number,
    prix_unitaire: number,
  ) {
    return { id,designation, quanite, prix_unitaire};
  }
  
  const rows = [
    createData(1,'DJI Mavic Pro 2', 185,446.61),
    createData(2,'Lego StarWar Edition', 647,458.3),
    createData(3,'IPad Pro', 703, 395),
  ];

export default function ListeArtcileCommande() {

    return (
        <Card 
            sx={{ minWidth: 275 }}
        >
        <CardContent>
            <Typography sx={{ fontSize: 23 }} color="#000000" gutterBottom>
                <h5>Article à Commander</h5>
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Designation</TableCell>
                            <TableCell align="right">Quantite</TableCell>
                            <TableCell align="right">Prix Unitaire</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            <TableCell component="th" scope="row">
                            {row.designation}
                            </TableCell>
                            <TableCell align="right">{row.quanite}</TableCell>
                            <TableCell align="right">{row.prix_unitaire}</TableCell>
                            <TableCell align="right">
                            <Stack 
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={{ xs: 1, sm: 2, md: 4 }}
                            >
                                <Button variant="text" size="small" color="primary"><EditIcon/></Button><Button variant="text" size="small" color="warning"><DeleteIcon/></Button>
                            </Stack>
                            </TableCell>
                        </TableRow>
                        ))}
  
              <TableRow
                key={'input'}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                <TextField id="filled-basic" label="Saisir désignation" variant="filled" size="small"/>
                </TableCell>
                <TableCell ><TextField id="filled-basic" label="Saisir quantité" variant="filled" size="small" /></TableCell>
                <TableCell ><TextField id="filled-basic" label="Saisir PU" variant="filled" size="small" /></TableCell>
                <TableCell >
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                    <Button variant="text" color="accent"><CheckIcon/></Button> <Button variant="text" color="warning"><CloseIcon/></Button>
                </Stack>                 
                  
                </TableCell>
              </TableRow>
          </TableBody>
        </Table>
        <Button variant="text" color="info"><AddIcon/>Ajout Article</Button>
      </TableContainer>
  
      </CardContent>
      </Card>
    );
}