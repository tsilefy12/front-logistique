import {
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
// import Data, { Order } from "./table/type-variable";
// import { rows } from "./table/constante";
// import EnhancedTableToolbar from "./table/EnhancedTableToolbar";
// import EnhancedTableHead from "./table/EnhancedTableHead";
// import { getColorStatus, getComparator, stableSort } from "./table/function";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Badge from "@mui/material/Badge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import Add from "@mui/icons-material/Add";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../config/table.config";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import EquipmentStockTableToolbar from "./table/EquipmentStockTableToolbar";
import EquipmentStockTableHeader from "./table/EquipmentStockTableHeader";
import { EquipmentStockItem } from "../../../redux/features/equipmentStock/equipmentStock.interface";
import useFetchEquipmentStock from "./hooks/useFetchVendors";

const ListStock = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useAppDispatch();
  const { equipmentStockList } = useAppSelector(
    (state) => state.equipmentStock
  );
  const fetchEquipmentList = useFetchEquipmentStock();

  useEffect(() => {
    fetchEquipmentList();
  }, []);

  // const handleRequestSort = (
  //   event: React.MouseEvent<unknown>,
  //   property: keyof Data
  // ) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.checked) {
  //     const newSelecteds = rows.map((n) => n.article);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected: readonly string[] = [];

  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }

  //   setSelected(newSelected);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDense(event.target.checked);
  // };

  // const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - equipmentStockList.length)
      : 0;

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Link href="/materiels/stock">
          <Button
            variant="text"
            size="small"
            color="accent"
            startIcon={<ArrowBackIcon />}
          >
            retour
          </Button>
        </Link>
        <Typography variant="h4">Stock par type</Typography>
      </SectionNavigation>
      <SectionTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EquipmentStockTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <EquipmentStockTableHeader />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                  {equipmentStockList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: EquipmentStockItem, index: any) => {
                      // const isItemSelected = isSelected(row.article);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          //   onClick={(event) => handleClick(event, row.article)}
                          tabIndex={-1}
                          key={row.id}
                        >
                          <TableCell
                            padding="normal"
                            component="th"
                            id={labelId}
                            scope="row"
                            align="left"
                          >
                            {row.type}
                          </TableCell>
                          <TableCell align="left">{row.inStock}</TableCell>
                          <TableCell align="left">{row.inUse}</TableCell>
                          <TableCell align="left">{row.isBroken}</TableCell>
                          <TableCell align="right">
                            <BtnActionContainer
                              direction="row"
                              justifyContent="center"
                            >
                              <Link href="stock/1/details">
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Link>
                            </BtnActionContainer>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={equipmentStockList.length}
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

export default ListStock;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
