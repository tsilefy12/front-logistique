import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { rows } from "./constante";
import { styled } from "@mui/material";

const ListArticle = () => {
  return (
    <MyTableContainer>
      <Typography variant="h5">Article</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Désignation</TableCell>
              <TableCell align="left">Quantite</TableCell>
              <TableCell align="left">Prix Unitaire</TableCell>
              <TableCell align="left">
                <Button size="small" color="info">
                  <AddIcon />
                  Ajouter Article
                </Button>
              </TableCell>
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
                <TableCell align="left" padding="none">
                  <TextField
                    id="filled-basic"
                    label="Autre information"
                    variant="filled"
                    sx={{ width: "100%" }}
                  />
                </TableCell>

                <TableCell sx={{ background: "#F5F5F5" }}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <EditIcon color="primary" />
                    <DeleteIcon color="warning" />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableRow>
            <TableCell padding="none">
              <TextField
                id="filled-basic"
                label="Saisir designation"
                variant="filled"
                sx={{ width: "100%" }}
              />
            </TableCell>
            <TableCell padding="none">
              <TextField
                id="filled-basic"
                label="Saisir quantité"
                variant="filled"
                sx={{ width: "100%" }}
              />
            </TableCell>
            <TableCell padding="none">
              <TextField
                id="filled-basic"
                label="Saisir PU"
                variant="filled"
                sx={{ width: "100%" }}
              />
            </TableCell>
            <TableCell padding="none">
              <TextField
                id="filled-basic"
                label="Saisir autre information"
                variant="filled"
                sx={{ width: "100%" }}
              />
            </TableCell>
            <TableCell sx={{ background: "#F5F5F5" }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <DoneIcon color="info" />
                <CloseIcon color="warning" />
              </Stack>
            </TableCell>
          </TableRow>
        </Table>

        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mt: 2 }}
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

export default ListArticle;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  width: "100%",
  marginBottom: theme.spacing(2),
}));
