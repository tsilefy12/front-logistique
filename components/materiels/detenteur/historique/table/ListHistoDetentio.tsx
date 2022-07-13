import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { rows } from "./constante";
import { styled } from "@mui/material";

const ListHistoDetention = () => {
  return (
    <MyTableContainer>
      <Typography variant="h5">Historique de détention</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Détenteur</TableCell>
              <TableCell align="left">Programmme</TableCell>
              <TableCell align="left">Date début détention</TableCell>
              <TableCell align="left">Date fin détention</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.detenteur}
                </TableCell>
                <TableCell align="left">{row.programme}</TableCell>
                <TableCell align="left">{row.date_debut_detention}</TableCell>
                <TableCell align="left">{row.date_fin_detention}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MyTableContainer>
  );
};

export default ListHistoDetention;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  bottom: 2,
}));
