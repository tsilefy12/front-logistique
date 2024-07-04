import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import {
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useConfirm } from "material-ui-confirm";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";

import Moment from "react-moment";
import { usePermitted } from "../../../config/middleware";
import formatMontant from "../../../hooks/format";
import { SuiviCarburantItem } from "../../../redux/features/suivi_carburant/suivi_carburant.interface";
import { deleteSuiviCarburant } from "../../../redux/features/suivi_carburant/suiviCarburantSlice";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../shared/table/tableFeature";
import useFetchTransportationEquipments from "../hooks/useFetchTransportationEquipments";
import useFetchGrant from "./hooks/useFetchGrant";
import useFetchLigneBudgetaire from "./hooks/useFetchLigneBudgetaire";
import useFetchSuiviCarburants from "./hooks/useFetchSuiviCarburant";
import SuiviCarburantTableHeader from "./organisme/table/SuiviCarburantTableHeader";
import SuiviCarburantTableToolbar from "./organisme/table/SuiviCarburantTableToolbar";

const ListSuiviCarburant = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filtre, setFiltre] = React.useState("")

  const confirm = useConfirm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { suiviCarburants } = useAppSelector((state) => state.suiviCarburant);

  const fetchSuiviCarburant = useFetchSuiviCarburants();
  const fetchTransportationEquipment = useFetchTransportationEquipments();
  const fetchGrant = useFetchGrant();
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);
  const fetchLignebudgetaire = useFetchLigneBudgetaire();
  // const { transportationEquipments } = useAppSelector((state) =>state.transportationEquipment)

  React.useEffect(() => {
    fetchSuiviCarburant();
    fetchTransportationEquipment();
    fetchGrant();
    fetchLignebudgetaire();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    router.push(`/materiel_de_transport/suivi_carburant/${id}/edit`);
  };

  const validate = usePermitted();

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le suivi carburant",
      description: "Voulez-vous vraiment supprimer cette ligne ?",
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
        await dispatch(deleteSuiviCarburant({ id }));
        fetchSuiviCarburant();
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
      ? Math.max(0, (1 + page) * rowsPerPage - suiviCarburants.length)
      : 0;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          {validate("Logistiques CV", "C") && (
            <Link href={"/materiel_de_transport/suivi_carburant/add"}>
              <Button variant="contained" startIcon={<Add />} size="small">
                Ajouter
              </Button>
            </Link>
          )}
          <Typography variant="h4">Tous les courses ville</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <SuiviCarburantTableToolbar filter={filtre} setFilter={setFiltre} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <SuiviCarburantTableHeader />
                <TableBody>
                  {suiviCarburants
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort((a, b) => (b.id!).localeCompare(a.id!))
                    .filter(item => (`${item.transportationEquipment?.registration} ${item.itineraire} ${item.personnelTransporte} ${grantList.find((e: any) => e.id === item?.grant)?.code} ${budgetLineList.find((e: any) => e.id === item?.ligneBudgetaire)?.code} ${item?.modePaiement}`).toLowerCase().includes(filtre.toLowerCase()))
                    .map((row: SuiviCarburantItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell component="th" id={labelId} align="left">
                            {row?.materiel
                              ? row.transportationEquipment?.registration
                              : ""}
                          </TableCell>

                          <TableCell align="left">
                            <Moment format="DD/MM/yyyy">{row.date}</Moment>
                          </TableCell>

                          <TableCell align="left">{row.itineraire}</TableCell>

                          <TableCell align="left">
                            {row.personnelTransporte}
                          </TableCell>

                          <TableCell align="left">
                            {row.kilometrageFinal} Km
                          </TableCell>

                          <TableCell align="left">
                            {formatMontant(row.montant!)}
                          </TableCell>

                          <TableCell align="left">
                            {
                              grantList.find((e: any) => e.id === row?.grant)
                                ?.code
                            }
                          </TableCell>
                          <TableCell align="left">
                            {
                              budgetLineList.find(
                                (e: any) => e.id === row?.ligneBudgetaire
                              )?.code
                            }
                          </TableCell>
                          <TableCell align="left">{row.modePaiement}</TableCell>
                          <TableCell align="right" width={"100px"}>
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              {/*   <Link
                                  href={`/materiel_de_transport/suivi_carburant/${row.id}/detail`}
                                >
                                  <IconButton
                                    color="accent"
                                    aria-label="Details"
                                    component="span"
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Link>*/}
                              {validate("Logistiques CV", "U") && (
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
                              {validate("Logistiques CV", "D") && (
                                <IconButton
                                  color="warning"
                                  aria-label="Supprimer"
                                  component="span"
                                  size="small"
                                  onClick={() => {
                                    handleClickDelete(row.id);
                                  }}
                                >
                                  <DeleteIcon />
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
              count={suiviCarburants.length}
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
};

export default ListSuiviCarburant;

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
