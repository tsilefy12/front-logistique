import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
// import Badge from "@mui/material";
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
import Moment from "react-moment";
import { usePermitted } from "../../../config/middleware";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { bonTransfertItem } from "../../../redux/features/bon_transfert/bonTransfert.interface";
import { deleteBonTransfert } from "../../../redux/features/bon_transfert/bonTransfertSlice";
import { getInterns } from "../../../redux/features/employeStagiaire/stagiaireSlice";
import { getGrantList } from "../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getEmployees } from "../../../redux/features/orderEquipment";
import { getPrograms } from "../../../redux/features/program/programSlice";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../shared/table/tableFeature";
import useFetchBonTransfert from "./hooks/useFetchBonTransfert";
import BonTransfertTableHeader from "./table/BonTransfertTableHeader";
import BonTransfertTableToolbar from "./table/BonTransfertTableToolbar";

export default function BonTransfertList() {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const { suplyAndConsumable } = useAppSelector(
  //   (state) => state.suplyAndConsumable
  // );
  const router = useRouter();

  const confirm = useConfirm();

  const dispatch = useAppDispatch();

  const validate = usePermitted();

  const { bonTransferts } = useAppSelector((state) => state.bonTransfert);
  const { employees } = useAppSelector((state) => state.employe);
  const { interns } = useAppSelector((state) => state.stagiaire);
  const { grantList } = useAppSelector((state) => state.grant);
  const { programs } = useAppSelector((state) => state.program);

  const total = [
    ...employees.map((i: any) => {
      return {
        id: i.id,
        name: i.name + " " + i.surname,
        type: "employe",
      };
    }),
    ...interns.map((i: any) => {
      return {
        id: i.id,
        name: i.name + " " + i.surname,
        type: "intern",
      };
    }),
  ];

  const fetchBonTransfert = useFetchBonTransfert();

  useEffect(() => {
    fetchBonTransfert();
    dispatch(getInterns({}));
    dispatch(getEmployees({}));
    dispatch(getGrantList({}));
    dispatch(getPrograms({}));
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    router.push(`/materiels/bon_transfert/${id}/edit`);
  };
  const handleClickDetails = async (id: any) => {
    router.push(`/materiels/bon_transfert/${id}/details`);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le bon de transfert",
      description: "Voulez-vous vraiment supprimer ce bon de transfert ?",
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
        await dispatch(deleteBonTransfert({ id }));
        fetchBonTransfert();
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bonTransferts.length) : 0;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          {validate("Logistiques BT", "C") && (
            <Link href={"/materiels/bon_transfert/ajouter"}>
              <Button variant="contained" startIcon={<Add />} size="small">
                Ajouter
              </Button>
            </Link>
          )}
          <Typography variant="h4"> Liste de Bon des transferts</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>
      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <BonTransfertTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <BonTransfertTableHeader />
                <TableBody>
                  {bonTransferts
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: bonTransfertItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell align="left">{row?.reference}</TableCell>
                          <TableCell align="left">
                            {
                              total.find((e: any) => e.id === row?.expediteur)
                                ?.name
                            }
                          </TableCell>
                          <TableCell align="left">
                            {
                              total.find((e: any) => e.id === row?.designation)
                                ?.name
                            }
                          </TableCell>
                          <TableCell align="left">
                            <Moment format="DD/MM/YYYY">{row?.dateExp}</Moment>
                          </TableCell>
                          <TableCell align="left">
                            {row?.expeditionVia}
                          </TableCell>
                          <TableCell align="left">
                            {
                              programs.find((e: any) => e.id === row?.programme)
                                ?.name
                            }
                          </TableCell>
                          <TableCell align="left">
                            {
                              grantList.find((e: any) => e.id === row?.grant)
                                ?.code
                            }
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
                              {validate("Logistiques BT", "U") && (
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
                              {validate("Logistiques BT", "D") && (
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
              count={bonTransferts.length}
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
