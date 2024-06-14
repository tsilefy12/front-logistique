import styled from "@emotion/styled";
import Add from "@mui/icons-material/Add";
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
import Moment from "react-moment";
import { usePermitted } from "../../../config/middleware";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { CommandeFournisseurItem } from "../../../redux/features/bon_commande_fournisseur/bonCommandeFournisseur.interface";
import { deleteBonCommandeFournisseur } from "../../../redux/features/bon_commande_fournisseur/bonCommandeFournisseurSlice";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../shared/table/tableFeature";
import useFechBonCommandeFournisseur from "./hooks/useFetchBonCmmandeFournisseur";
import BonCommandeFournisseurTableHeader from "./table/BonCommandeFournisseurTableHeader";
import BonCommandeFournisseurTableToolbar from "./table/BonCommandeFournisseurTableToolbar";

export default function BonCommandeFournisseurList() {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter();

  const confirm = useConfirm();

  const dispatch = useAppDispatch();

  const { commandeFournisseurs } = useAppSelector(
    (state) => state.bonDeCommandeFournisseur
  );
  const validate = usePermitted();

  const fetchBonCommandeFournisseurs = useFechBonCommandeFournisseur();

  React.useEffect(() => {
    fetchBonCommandeFournisseurs();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    router.push(`/materiels/bon_de_commande_fournisseur/${id}/edit`);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le bon commande fournisseur",
      description:
        "Voulez-vous vraiment supprimer ce bon commande fournisseur ?",
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
        await dispatch(deleteBonCommandeFournisseur({ id }));
        fetchBonCommandeFournisseurs();
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

  const handleClickDetails = async (id: any) => {
    router.push(`/materiels/bon_de_commande_fournisseur/${id}/details`);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - commandeFournisseurs.length)
      : 0;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          {validate("Logistiques BCF", "C") && (
            <Link href={"/materiels/bon_de_commande_fournisseur/ajouter"}>
              <Button variant="contained" startIcon={<Add />} size="small">
                Ajouter
              </Button>
            </Link>
          )}
          <Typography variant="h4">
            Liste de bon de commande fournisseur
          </Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>
      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <BonCommandeFournisseurTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <BonCommandeFournisseurTableHeader />
                <TableBody>
                  {commandeFournisseurs
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: CommandeFournisseurItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell align="left">
                            {row?.vendor?.name}
                          </TableCell>
                          <TableCell align="left">
                            <Moment format="DD/MM/YYYY">
                              {row?.establishmentDate}
                            </Moment>
                          </TableCell>
                          <TableCell align="left">
                            {row?.paymentMethod}
                          </TableCell>
                          <TableCell align="left">
                            {row?.deliveryCondition}
                          </TableCell>
                          <TableCell align="left">
                            <Moment format="DD/MM/YYYY">
                              {row?.deliveryDate}
                            </Moment>
                          </TableCell>
                          <TableCell align="right" width={"150px"}>
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              <IconButton
                                color="accent"
                                aria-label="Details"
                                component="span"
                                size="small"
                                onClick={() => {
                                  handleClickDetails(row.id);
                                }}
                              >
                                <Visibility />
                              </IconButton>
                              {validate("Logistiques BCF", "U") && (
                                <IconButton
                                  color="primary"
                                  aria-label="Modifier"
                                  component="span"
                                  size="small"
                                  onClick={() => {
                                    handleClickEdit(row?.id);
                                  }}
                                >
                                  <Edit />
                                </IconButton>
                              )}
                              {validate("Logistiques BCF", "D") && (
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
              count={commandeFournisseurs.length}
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
