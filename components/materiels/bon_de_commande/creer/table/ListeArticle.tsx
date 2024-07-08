import * as React from "react";
import { styled } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
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
import MenuItem from "@mui/material/MenuItem";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { rows } from "./constante";
import Grid from "@mui/material/Grid";

const currencies = [
  {
    value: "1",
    label: "Option_1",
  },
  {
    value: "2",
    label: "Option_2",
  },
  {
    value: "3",
    label: "Option_3",
  },
  {
    value: "4",
    label: "Option_4",
  },
];

const ListeArticle = () => {
  const [currency, setCurrency] = React.useState("Option_2");
  const [poste, setPoste] = React.useState("Option_2");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  const handleChangePoste = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoste(event.target.value);
  };

  return (
    <Container maxWidth="xl">
      <MyTableContainer>
        <Typography variant="h5">Article</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Grant</TableCell>
                <TableCell>Poste analytique</TableCell>
                <TableCell align="left">Désignation</TableCell>
                <TableCell align="left">Prix unitaire</TableCell>
                <TableCell align="left">Quantité</TableCell>
                <TableCell align="left">Montant Total TTC</TableCell>
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
                    {row.grant}
                  </TableCell>
                  <TableCell align="left">{row.poste}</TableCell>
                  <TableCell align="left">{row.designation}</TableCell>
                  <TableCell align="left">{row.prix_unitaire} Ar</TableCell>
                  <TableCell align="left">{row.quanite}</TableCell>
                  <TableCell align="left">{row.montantTotal} Ar</TableCell>
                  <TableCell style={{ width: 150 }}>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="right"
                      spacing={2}
                    >
                      <EditIcon color="primary" />
                      <DeleteIcon color="warning" />
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell padding="none">
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Ligne buggétaire"
                    value={currency}
                    onChange={handleChange}
                    variant="filled"
                    style={{ width: "100%" }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell padding="none">
                  <TextField
                    id="filled-select-currency"
                    select
                    label="Poste analytique"
                    value={poste}
                    onChange={handleChangePoste}
                    variant="filled"
                    style={{ width: "100%" }}
                  >
                    {currencies.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </TableCell>
                <TableCell padding="none">
                  <TextField
                    id="filled-basic"
                    label="Désination"
                    variant="filled"
                    style={{ width: "100%" }}
                  />
                </TableCell>
                <TableCell padding="none">
                  <TextField
                    id="filled-basic"
                    label="Prix unitaire"
                    variant="filled"
                    style={{ width: "100%" }}
                  />
                </TableCell>
                <TableCell padding="none">
                  <TextField
                    id="filled-basic"
                    label="Quantité"
                    variant="filled"
                    style={{ width: "100%" }}
                  />
                </TableCell>
                <TableCell padding="none">
                  <TextField
                    id="filled-basic"
                    label="Montant TTC"
                    variant="filled"
                    style={{ width: "100%" }}
                  />
                </TableCell>
                <TableCell style={{ width: 150 }}>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    style={{ width: 150 }}
                  >
                    <DoneIcon color="info" />
                    <CloseIcon color="warning" />
                  </Stack>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ mt: 2 }}
          >
            <Button size="small" color="info">
              <AddIcon />
              Ajouter Article
            </Button>
            <Typography variant="body2" sx={{ ml: 70 }}>
              Total
            </Typography>
            <Typography variant="body2" sx={{ ml: 15 }}>
              75000 Ar
            </Typography>
          </Grid>
        </TableContainer>
      </MyTableContainer>
    </Container>
  );
};

export default ListeArticle;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
}));
