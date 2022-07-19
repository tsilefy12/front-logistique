import {
  Button,
  Container,
  Stack,
  styled,
  Typography,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Data, { Order } from "./table/type-variable";
import { rows } from "./table/constante";
import EnhancedTableToolbar from "./table/EnhancedTableToolbar";
import EnhancedTableHead from "./table/EnhancedTableHead";
import Badge from "@mui/material/Badge";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { getColorStatus } from "./table/function";
import KeyValue from "../../../../shared/keyValue";

const DetailsArticle = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("date");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.date);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Container maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation>
          <Link href="/fournitures_et_consommables/article">
            <Button color="info" variant="text" startIcon={<ArrowBack />}>
              Retour
            </Button>
          </Link>
          <Typography variant="h4">Details d'un article</Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>

      <SectionDetails>
        <Typography variant="h6" mb={1}>
          Article séléctionné
        </Typography>
        <KeyValue keyName="Designation" value="Cahier" />
      </SectionDetails>

      <SectionTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", padding: 3 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                  rows.slice().sort(getComparator(order, orderBy)) */}
                  {rows.map((row, index) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.date}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          padding="none"
                          align="left"
                        >
                          {row.date}
                        </TableCell>
                        <TableCell align="left">
                          <Badge
                            badgeContent={row.type}
                            color={getColorStatus(row.type)}
                          />
                        </TableCell>
                        <TableCell align="left">{row.quantité}</TableCell>
                        <TableCell align="left">
                          {row.quantité_stocké}
                        </TableCell>
                        <TableCell align="left">{row.prix_Unitaire}</TableCell>
                        <TableCell align="left">{row.valeur_stockée}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </SectionTable>
    </Container>
  );
};

export default DetailsArticle;
const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
}));

export const SectionDetails = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
