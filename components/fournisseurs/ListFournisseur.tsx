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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteFournisseur } from "../../redux/features/fournisseur";
import { editFournisseur } from "../../redux/features/fournisseur";
import { FournisseurItem } from "../../redux/features/fournisseur/fournisseurSlice.interface";
import {
  defaultLabelDisplayedRows,
  getComparator,
  labelRowsPerPage,
  Order,
} from "../../config/table.config";
import { useRouter } from "next/router";
import useFetchFournisseur from "./hooks/useFetchFournisseur";
import { useConfirm } from "material-ui-confirm";
import FournisseurTableHead from "./table/FournisseurTableHead";
import FournisseurTableToolbar from "./table/FournisseurTableToolbar";

const ListFournisseur = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch: any = useAppDispatch();
  const { fournisseurList } = useAppSelector((state) => state.fournisseur);
  const router = useRouter();
  const confirm = useConfirm();

  const fetchFournisseurtList = useFetchFournisseur();

  useEffect(() => {
    fetchFournisseurtList();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    await dispatch(editFournisseur({ id }));
  };

  const handleclickDelete = async (id: any) => {
    confirm({
      title: "Supprimer Fournisseur",
      description: "Voulez-vous vraiment supprimer ce fournisseur ?",
      cancellationText: "Annuler",
      confirmationText: "Supprimer",
      cancellationButtonProps: {
        color: "warning",
      },
      confirmationButtonProps: {
        color: "error",
      },
    })
      .then(async () => {
        await dispatch(deleteFournisseur({ id }));
        fetchFournisseurtList();
      })
      .catch(() => {});
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - fournisseurList.length)
      : 0;

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Link href="/fournisseurs/add">
          <Button variant="contained" size="small" startIcon={<Add />}>
            Créer
          </Button>
        </Link>
        <Typography variant="h4">Fournisseurs</Typography>
      </SectionNavigation>
      <SectionTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <FournisseurTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <FournisseurTableHead />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
                  {fournisseurList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: FournisseurItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            {row.address}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            {row.phone}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            {row.email}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            {row.website}
                          </TableCell>

                          <TableCell align="right">
                            <BtnActionContainer
                              direction="row"
                              justifyContent="center"
                            >
                              <Link href={`/fournisseurs/${row.id}/edit`}>
                                <IconButton
                                  color="primary"
                                  aria-label="Modifier"
                                  component="span"
                                >
                                  <EditIcon />
                                </IconButton>
                              </Link>
                              <IconButton
                                color="warning"
                                aria-label="Supprimer"
                                component="span"
                                onClick={() => handleclickDelete(row.id)}
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
              count={fournisseurList.length}
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

export default ListFournisseur;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
