import React from "react";
import { Box, Checkbox, IconButton, Paper, styled,  Stack } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { getComparator, stableSort } from "./typemateriel-function";
import EtatMaterielTableHeader from "./TypeMaterielTableHeader";
import TypeMaterielTableToolbar from "./TypeMaterielTableToolbar";
import TypeMaterielData from "./typemateriel-type-variable";
import { typematerielrows } from "./typemateriel-constante";
import { Order } from "./typemateriel-type-variable";
import Link from "next/link";


const TypeMaterielList = () => {
    const [order, setOrder] = React.useState<Order>("asc");
    const [orderBy, setOrderBy] = React.useState<keyof TypeMaterielData>("type");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof TypeMaterielData
      ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
      };


      const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = typematerielrows.map((n) => n.type);
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
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - typematerielrows.length) : 0;

        return(
            <TableSection>
            <Box sx={{ width: "100%" }}>
              <Paper sx={{ width: "100%", mb: 2 }}>
                <TypeMaterielTableToolbar numSelected={selected.length} />
                <TableContainer>
                  <Table
                    sx={{ minWidth: 750 }}
                    aria-labelledby="tableTitle"
                    size={"small"}
                  >
                    <EtatMaterielTableHeader
                      numSelected={selected.length}
                      order={order}
                      orderBy={orderBy}
                      onSelectAllClick={handleSelectAllClick}
                      onRequestSort={handleRequestSort}
                      rowCount={typematerielrows.length}
                    />
                    <TableBody>
                      {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                  rows.slice().sort(getComparator(order, orderBy)) */}
                      {stableSort(typematerielrows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const isItemSelected = isSelected(row.type);
                          const labelId = `enhanced-table-checkbox-${index}`;
      
                          return (
                            <TableRow
                              hover
                              //   onClick={(event) => handleClick(event, row.reference)}
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={row.type}
                              selected={isItemSelected}
                            >
                              <TableCell
                                padding="checkbox"
                                onClick={(event) => handleClick(event, row.type)}
                              >
                                <Checkbox
                                  color="primary"
                                  checked={isItemSelected}
                                  inputProps={{
                                    "aria-labelledby": labelId,
                                  }}
                                />
                              </TableCell>
                              <TableCell
                                component="th"
                                id={labelId}
                                scope="row"
                                padding="none"
                                align="left"
                              >
                                {row.type}
                              </TableCell>
                              <TableCell align="left">{row.prefix}</TableCell>
                              <TableCell align="right">
                                <BtnActionContainer
                                  direction="row"
                                  justifyContent="flex-end"
                                >
                                  <Link href="#">
                                    <IconButton
                                      color="accent"
                                      aria-label="Details"
                                      component="span"
                                    >
                                      <VisibilityIcon />
                                    </IconButton>
                                  </Link>
                                  <IconButton
                                    color="primary"
                                    aria-label="Modifier"
                                    component="span"
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <IconButton
                                    color="warning"
                                    aria-label="Supprimer"
                                    component="span"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
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
                  count={typematerielrows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Paper>
              {/* <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
          /> */}
            </Box>
          </TableSection>
        );
}

const TableSection = styled("div")(({ theme }) => ({
    paddingBlock: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  }));
  

export default TypeMaterielList;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));