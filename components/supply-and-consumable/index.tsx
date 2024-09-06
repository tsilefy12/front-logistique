import styled from "@emotion/styled";
import { default as Add, default as AddIcon } from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { usePermitted } from "../../config/middleware";
import formatMontant from "../../hooks/format";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  deleteSuplyAndConsumable,
  editSuplyAndConsumable,
} from "../../redux/features/supply-and-consumable";
import { SuplyAndConsumableItem } from "../../redux/features/supply-and-consumable/supply-and-consumable.interface";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../shared/table/tableFeature";
import useFetchSuplyAndConsumableList from "./entreSortie/hooks/useFetchSupplyAndConsumables";
import SuplyAndConsumableTableHeader from "./organism/table/SupplyAndConsumableTableHeader";
import SuplyAndConsumableTableToolbar from "./organism/table/SupplyAndConsumableTableToolbar";
import * as XLSX from "xlsx";
import { FormLabel } from "@mui/material";
import { Download } from "@mui/icons-material";

export default function SuplyAndCosumableList() {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filtre, setFiltre] = React.useState("");

  const router = useRouter();

  const confirm = useConfirm();

  const dispatch = useAppDispatch();

  const { suplyAndConsumableList } = useAppSelector(
    (state) => state.suplyAndConsumable
  );

  const fetchSuplyAndConsumableList = useFetchSuplyAndConsumableList();

  const validate = usePermitted();

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

  //Export Excell
  const exportToExcel = (data: SuplyAndConsumableItem[]) => {
    const formattedData = data.map((item) => ({
      Designation: item.designation,
      Quantité: "",
      "Prix unitaire": "",
      SKU: "",
      "Unité de stock": item.uniteStock?.uniteStock,
      Montant: formatMontant(item.montant!),
      Reste: item.reste,
      Seuil: item.seuil,
      "Mois de prévision": "",
      Fournisseur: "",
      "Catégorie de stock": "",
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    ws["!cols"] = [
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
      { wpx: 200 },
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Supplies & Consumables");
    XLSX.writeFile(wb, "Supplies_and_Consumables.xlsx");
  };

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Stack direction="row" gap={2} alignItems="center">
            {validate("Logistiques FS", "C") && (
              <Link
                href={"/fournitures_et_consommables/fiche_de_stock/ajouter"}
              >
                <Button variant="contained" startIcon={<Add />} size="small">
                  Ajouter
                </Button>
              </Link>
            )}
            {validate("Logistiques FS", "C") && (
              <Button
                onClick={() => exportToExcel(suplyAndConsumableList)}
                variant="contained"
                color="primary"
                size="small"
                startIcon={<Download />}
              >
                Excel
              </Button>
            )}

            <FormLabel>{`Année ${new Date().getFullYear()}`}</FormLabel>
          </Stack>
          <Typography variant="h4">Fiche de stock </Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            {/* <ArticleTableToolbar /> */}
            <SuplyAndConsumableTableToolbar
              filtre={filtre}
              setFiltre={setFiltre}
            />
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
                    .sort((a, b) => b.id!.localeCompare(a.id!))
                    .filter((item) =>
                      `${item.designation} ${item.reste} ${item.seuil}`
                        .toLowerCase()
                        .includes(filtre.toLowerCase())
                    )
                    .map((row: SuplyAndConsumableItem | any, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell component="th" id={labelId} align="left">
                            {row.designation}
                          </TableCell>

                          <TableCell align="left">{row.quantity}</TableCell>

                          <TableCell align="left">
                            {formatMontant(row.unitPrice!)}
                          </TableCell>

                          <TableCell align="left">
                            {row.uniteStock?.uniteStock}
                          </TableCell>
                          <TableCell align="left">
                            {formatMontant(row.montant!)}
                          </TableCell>

                          <TableCell align="left">{row.reste}</TableCell>
                          <TableCell align="left">{row.seuil}</TableCell>
                          <TableCell align="right" width={"150px"}>
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              {validate("Logistiques ES", "C") && (
                                <Link
                                  href={`/fournitures_et_consommables/fiche_de_stock/${row.id}/entre_sortie`}
                                >
                                  <Button
                                    sx={{ mr: 1 }}
                                    color="accent"
                                    variant="outlined"
                                    size="small"
                                    disabled={(() => {
                                      const currentDate = new Date();
                                      const targetDate = new Date(`2024-09-06`);
                                      return (
                                        currentDate.getFullYear() ===
                                          targetDate.getFullYear() &&
                                        currentDate.getMonth() ===
                                          targetDate.getMonth() &&
                                        currentDate.getDate() ===
                                          targetDate.getDate()
                                      );
                                    })()}
                                  >
                                    <AddIcon />
                                    Gerer
                                  </Button>
                                </Link>
                              )}
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

                              {validate("Logistiques FS", "U") && (
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
                              )}
                              {validate("Logistiques FS", "D") && (
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
                              )}
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
