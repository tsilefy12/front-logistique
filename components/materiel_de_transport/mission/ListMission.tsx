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
import { MissionTranportItem } from "../../../redux/features/mission_transport/missionTransport.interface";
import { deleteMissionDeTransport } from "../../../redux/features/mission_transport/missionTransportSlice";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../shared/table/tableFeature";
import useFetchTransportationEquipments from "../hooks/useFetchTransportationEquipments";
import useFetchMissionTransport from "./hooks/useFectMission";
import MissionTransportTableHeader from "./organisme/table/MissionTransportTableHeader";
import MissionTransportTableToolbar from "./organisme/table/MissionTransportTableToolbar";

const ListMission = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const validate = usePermitted();

  const confirm = useConfirm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { missionTransports } = useAppSelector(
    (state) => state.missionDeTransport
  );
  const fetchMissionTransport = useFetchMissionTransport();
  const fetchTransportationEquipment = useFetchTransportationEquipments();
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);

  React.useEffect(() => {
    fetchMissionTransport();
    fetchTransportationEquipment();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    router.push(`/materiel_de_transport/mission/${id}/edit`);
  };

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
        await dispatch(deleteMissionDeTransport({ id }));
        fetchMissionTransport();
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
      ? Math.max(0, (1 + page) * rowsPerPage - missionTransports.length)
      : 0;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          {validate("Logistiques LI", "C") && (
            <Link href={"/materiel_de_transport/mission/add"}>
              <Button variant="contained" startIcon={<Add />} size="small">
                Ajouter
              </Button>
            </Link>
          )}
          <Typography variant="h4">Tous les missions de transport</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <MissionTransportTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <MissionTransportTableHeader />
                <TableBody>
                  {missionTransports
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: MissionTranportItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell component="th" id={labelId} align="left">
                            {row?.materiel
                              ? row.transportationEquipment?.registration
                              : ""}
                          </TableCell>

                          <TableCell align="left">{row.pj}</TableCell>

                          <TableCell align="left">
                            <Moment format="DD/MM/yyyy">{row.date}</Moment>
                          </TableCell>

                          <TableCell align="left">{row.libelle}</TableCell>

                          <TableCell align="left">{row.utilisateur}</TableCell>

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
                          <TableCell align="right" width={"150px"}>
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
                              {validate("Logistiques LI", "U") && (
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
                              {validate("Logistiques LI", "D") && (
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
              count={missionTransports.length}
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

export default ListMission;

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
