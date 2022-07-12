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
import Container from "@mui/material/Container";
import { rows } from "./constante";
import { styled } from "@mui/material";
import Grid from "@mui/material/Grid";
import Link from "next/link";

const TableOffre = () => {
  return (
    <MyTableContainer>
      <Typography variant="h5">Offre</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Numero</TableCell>
              <TableCell align="left">Societe</TableCell>
              <TableCell align="left">Num proforma</TableCell>
              <TableCell align="left">Regime Tva</TableCell>
              <TableCell align="left">Tva</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.numero}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.numero}
                </TableCell>
                <TableCell align="left">{row.societe}</TableCell>
                <TableCell align="left">{row.num_proforma}</TableCell>
                <TableCell align="left">{row.regime_tva}</TableCell>
                <TableCell align="left">{row.tva}</TableCell>

                <TableCell
                  align="center"
                  sx={{ width: 150, background: "#F5F5F5" }}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Link href="/materiels/commande/1/offre/article">
                      <Button variant="outlined" color="info">
                        <AddIcon />
                        Article
                      </Button>
                    </Link>
                    <EditIcon color="primary" />
                    <DeleteIcon color="warning" />
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell padding="none">
                <TextField
                  id="filled-basic"
                  label="Saisir nombre"
                  variant="filled"
                  sx={{ width: "100%" }}
                />
              </TableCell>
              <TableCell padding="none">
                <TextField
                  id="filled-basic"
                  label="Séléctionner société"
                  variant="filled"
                  sx={{ width: "100%" }}
                />
              </TableCell>
              <TableCell padding="none">
                <TextField
                  id="filled-basic"
                  label="Saisir numéro proforma"
                  variant="filled"
                  sx={{ width: "100%" }}
                />
              </TableCell>
              <TableCell padding="none">
                <TextField
                  id="filled-basic"
                  label="Saisir régime TVA"
                  variant="filled"
                  sx={{ width: "100%" }}
                />
              </TableCell>
              <TableCell padding="none">
                <TextField
                  id="filled-basic"
                  label="Saisir TVA"
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
          </TableBody>
        </Table>

        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ mt: 2 }}
        >
          <Button size="small" color="info">
            <AddIcon />
            Creer Offre
          </Button>
        </Stack>
      </TableContainer>
    </MyTableContainer>
  );
};

export default TableOffre;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  width: "100%",
  marginBottom: theme.spacing(2),
}));
