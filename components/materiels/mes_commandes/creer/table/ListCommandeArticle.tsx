import { IconButton, styled } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
//import Typography from '@mui/material/Typography';
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { rows } from "./constante";
import Grid from "@mui/material/Grid";
import themes from "../../../../../themes";

const ListCommandeArticle = () => {
  return (
    <MyTableContainer>
      <Typography variant="h5">Article à commander</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 450 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Désignation</TableCell>
              <TableCell align="left">Quantité</TableCell>
              <TableCell align="left">Prix unitaire</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.designation}
                </TableCell>
                <TableCell align="left">{row.quantite}</TableCell>
                <TableCell align="left">${row.prix_unitaire}</TableCell>

                <TableCell align="center" sx={{ background: "#fafafa" }}>
                  <Stack direction="row" justifyContent="right" spacing={2}>
                    <IconButton size="small">
                      <EditIcon color="primary" />
                    </IconButton>
                    <IconButton size="small">
                      <DeleteIcon color="warning" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell padding="none" sx={{ background: "#F5F5F5" }}>
                <TextField
                  id="designation"
                  label="Saisir désignation"
                  variant="filled"
                  sx={{ width: "100%" }}
                />
              </TableCell>
              <TableCell padding="none" sx={{ background: "#F5F5F5" }}>
                <TextField
                  id="Quantité"
                  label="Saisir quantité"
                  variant="filled"
                  sx={{ width: "100%" }}
                />
              </TableCell>
              <TableCell padding="none" sx={{ background: "#F5F5F5" }}>
                <TextField
                  id="designation"
                  label="Saisir PU"
                  variant="filled"
                  sx={{ width: "100%" }}
                />
              </TableCell>
              <TableCell padding="none" sx={{ background: "#fafafa" }}>
                <Stack direction="row" justifyContent="right" spacing={2}>
                  <IconButton>
                    <DoneIcon color="info" />
                  </IconButton>
                  <IconButton>
                    <CloseIcon color="warning" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="right"
          my={2}
        >
          <Button size="small" color="info">
            <AddIcon />
            Ajouter Article
          </Button>
        </Stack>
      </TableContainer>
    </MyTableContainer>
  );
};

export default ListCommandeArticle;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  marginBottom: theme.spacing(20),
}));
