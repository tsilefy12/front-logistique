import {
    Button,
    Container,
    IconButton,
    Stack,
    styled,
    Typography,
  } from "@mui/material";
  import Link from "next/link";
  import React from "react";
  import Box from "@mui/material/Box";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TablePagination from "@mui/material/TablePagination";
  import TableHead from '@mui/material/TableHead';
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
  import Checkbox from "@mui/material/Checkbox";
  import Data, { Order } from "./table/type-variable";
  import { rows } from "./table/constante";
  import EnhancedTableToolbar from "./table/EnhancedTableToolbar";
  import { getComparator, stableSort } from "./table/function";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import Add from "@mui/icons-material/Add";
  import { defaultLabelDisplayedRows,labelRowsPerPage } from "../../../../config/table.config";
  import ArrowBackIcon from '@mui/icons-material/ArrowBack';

  const ListDetailStockParType = () => {
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof Data>("designation");
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
        const newSelecteds = rows.map((n) => n.designation);
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
  
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    return (
      <Container maxWidth="xl">
        <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
          <Link href="/stock">
            <Button variant="text" size="small" color="info" startIcon={<ArrowBackIcon />}>
                Retour
            </Button>
          </Link>
        </SectionNavigation>
        <SectionTable>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length}/>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="small"
                >
                    <TableHead>
                        <TableRow>
                                <TableCell>N° OPTIM</TableCell>
                                <TableCell align="right">Désignation</TableCell>
                                <TableCell align="right">Date début de stock</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.numero}>
                                <TableCell component="th" scope="row">
                                    {row.numero}
                                </TableCell>
                                <TableCell  align="right">
                                    {row.designation}
                                </TableCell>
                                <TableCell  align="right">
                                    {row.dateDebutStock}
                                </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>
                        )}
                    </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={labelRowsPerPage}
                labelDisplayedRows={defaultLabelDisplayedRows}
              />
            </Paper>
            {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          /> */}
          </Box>
        </SectionTable>
      </Container>
    );
  };
  
  export default ListDetailStockParType;
  
  export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
  export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
  const SectionTable = styled("div")(({ theme }) => ({}));
  