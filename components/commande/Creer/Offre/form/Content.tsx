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

export default function TableOffre() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" sx={{ fontSize: 23 }} color="#000000" gutterBottom>
          offre
        </Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Numero</TableCell>
            <TableCell align="right">Societe</TableCell>
            <TableCell align="right">Nom proforma</TableCell>
            <TableCell align="right">Regime TVA</TableCell>
            <TableCell align="right">TVA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">
                <Stack 
                direction={{ xs: 'column', sm: 'row' }}
  spacing={{ xs: 1, sm: 2, md: 4 }}
  >
                <Button variant="outlined" size="small" color="info"><AddIcon/> Article</Button> <Button variant="text" size="small" color="primary"><EditIcon/></Button><Button variant="text" size="small" color="warning"><DeleteIcon/></Button>
                </Stack>
                </TableCell>
                
            </TableRow>
          ))}

            <TableRow
              key={'input'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              <TextField id="filled-basic" label="saisir nombre" variant="filled" />
              </TableCell>
              <TableCell align="right">
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          // value={offre}
          //  
          //onChange={handleChange}
          label="Selectionner société"
        >
          <MenuItem value="">
            <em>Selectionner société</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>
        </TableCell>
              <TableCell ><TextField id="filled-basic" label="saisir numero proforma" variant="filled" /></TableCell>
              <TableCell ><TextField id="filled-basic" label="saisir regime TVA" variant="filled" /></TableCell>
              <TableCell ><TextField id="filled-basic" label="saisir TVA" variant="filled" /></TableCell>
              <TableCell >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
              >
                <Button variant="text" color="accent"><CheckIcon/></Button> <Button variant="text" color="warning"><CloseIcon/></Button>
                </Stack>                 
                
                </TableCell>
            </TableRow>
        </TableBody>
      </Table>
      <Button variant="text" color="info"><AddIcon/>Créer Offre</Button>
    </TableContainer>

    </CardContent>
    </Card>
  );
}