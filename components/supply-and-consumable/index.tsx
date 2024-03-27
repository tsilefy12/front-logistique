import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useConfirm } from "material-ui-confirm";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  labelRowsPerPage,
  defaultLabelDisplayedRows,
} from "../shared/table/tableFeature";
import Visibility from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import Edit from "@mui/icons-material/Edit";
import useFetchSuplyAndConsumableList from "./entreSortie/hooks/useFetchSupplyAndConsumables";
import {
  deleteSuplyAndConsumable,
  editSuplyAndConsumable,
} from "../../redux/features/supply-and-consumable";
import SuplyAndConsumableTableToolbar from "./organism/table/SupplyAndConsumableTableToolbar";
import SuplyAndConsumableTableHeader from "./organism/table/SupplyAndConsumableTableHeader";
import { SuplyAndConsumableItem } from "../../redux/features/supply-and-consumable/supply-and-consumable.interface";

export default function SuplyAndCosumableList() {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const router = useRouter();

  const confirm = useConfirm();

  const dispatch = useAppDispatch();

  const { suplyAndConsumableList } = useAppSelector(
    (state) => state.suplyAndConsumable
  );

  const fetchSuplyAndConsumableList = useFetchSuplyAndConsumableList();

  React.useEffect(() => {
    fetchSuplyAndConsumableList();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    await dispatch(editSuplyAndConsumable({ id }));
    router.push(`/fournitures_et_consommables/fiche_de_stock/${id}/edit`);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer Fiche de stock",
      description: "Voulez-vous vraiment supprimer cet fiche de stock ?",
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
        await dispatch(deleteSuplyAndConsumable({ id }));
        fetchSuplyAndConsumableList();
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
      ? Math.max(0, (1 + page) * rowsPerPage - suplyAndConsumableList.length)
      : 0;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Link href={"/fournitures_et_consommables/fiche_de_stock/ajouter"}>
            <Button variant="contained" startIcon={<Add />} size="small">
              Ajouter
            </Button>
          </Link>
          <Typography variant="h4"> Fiche de Stock </Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            {/* <ArticleTableToolbar /> */}
            <SuplyAndConsumableTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                {/* <ArticleTableHeader /> */}
                <SuplyAndConsumableTableHeader />
                <TableBody>
                  {suplyAndConsumableList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: SuplyAndConsumableItem | any, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell component="th" id={labelId} align="left">
                            {row.designation}
                          </TableCell>

                          <TableCell align="left">{row.quantity}</TableCell>

                          <TableCell align="left">{row.unitPrice}</TableCell>

                          <TableCell align="left">{row.SKU}</TableCell>
                          <TableCell align="left">{row.montant}</TableCell>

                          {/* <TableCell align="left">
														{row.website}
													</TableCell> */}
                          <TableCell align="right" width={"150px"}>
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              <Link
                                href={`/fournitures_et_consommables/fiche_de_stock/${row.id}/entre_sortie`}
                              >
                                <Button
                                  sx={{ mr: 1 }}
                                  color="accent"
                                  variant="outlined"
                                  size="small"
                                >
                                  <AddIcon />
                                  Gerer
                                </Button>
                              </Link>
                              <Link
                                href={`/fournitures_et_consommables/fiche_de_stock/${row.id}/details`}
                              >
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                  size="small"
                                >
                                  <Visibility />
                                </IconButton>
                              </Link>

                              <IconButton
                                color="primary"
                                aria-label="Modifier"
                                component="span"
                                size="small"
                                onClick={() => {
                                  handleClickEdit(row.id);
                                }}
                              >
                                <Edit />
                              </IconButton>
                              <IconButton
                                color="warning"
                                aria-label="Supprimer"
                                component="span"
                                size="small"
                                onClick={() => {
                                  handleClickDelete(row.id);
                                }}
                              >
                                <Delete />
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
              count={suplyAndConsumableList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={labelRowsPerPage}
              labelDisplayedRows={defaultLabelDisplayedRows}
            />
          </Paper>
        </Box>
      </SectionTable>
    </Container>
  );
}

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: "16px",
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "5px",
}));

const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
