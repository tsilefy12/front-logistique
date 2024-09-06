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
import Moment from "react-moment";
import { usePermitted } from "../../../config/middleware";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../config/table.config";
import formatMontant from "../../../hooks/format";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { LocationItem } from "../../../redux/features/location/location.interface";
import { deleteLocation } from "../../../redux/features/location/locationSlice";
import useFetchEmployes from "../../Order-Supply-And-Consumable/hooks/useFetchEmployees";
import useFetchVendors from "../../vendor/hooks/useFetchVendors";
import useFetchTransportationEquipments from "../hooks/useFetchTransportationEquipments";
import useFetchLocationDeTransport from "./hooks/useFetchLocationDeTransport";
import LocationTransportTableHeader from "./organisme/table/LocationDeTransportTableHeader";
import LocationDeTransportTableToolbar from "./organisme/table/LocationDeTransportTableToolbar";

const ListLocation = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filtre, setFiltre] = React.useState("");
  const validate = usePermitted();
  const confirm = useConfirm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { locationDeTransports } = useAppSelector(
    (state) => state.locationDeTransport
  );
  const fetchLocationTransport = useFetchLocationDeTransport();
  const fetchTransportationEquipment = useFetchTransportationEquipments();
  const fetchVendor = useFetchVendors();
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);
  const fetchEmploye = useFetchEmployes();
  const { employees } = useAppSelector((state) => state.employe);

  React.useEffect(() => {
    fetchLocationTransport();
    fetchTransportationEquipment();
    fetchVendor();
    fetchEmploye();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    router.push(`/materiel_de_transport/location/${id}/edit`);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer la location de transport",
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
        await dispatch(deleteLocation({ id }));
        fetchLocationTransport();
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
      ? Math.max(0, (1 + page) * rowsPerPage - locationDeTransports.length)
      : 0;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          {validate("Logistiques LE", "C") && (
            <Link href={"/materiel_de_transport/location/add"}>
              <Button variant="contained" startIcon={<Add />} size="small">
                Ajouter
              </Button>
            </Link>
          )}
          <Stack direction={"row"} gap={2} alignItems={"center"}>
            <Link href={"/materiel_de_transport/location_externe"}>
              <Button variant="contained" size="small">
                Liste matériels de location externe
              </Button>
            </Link>
            <Typography variant="h4">Location externe</Typography>
          </Stack>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <LocationDeTransportTableToolbar
              filtre={filtre}
              setFiltre={setFiltre}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <LocationTransportTableHeader />
                <TableBody>
                  {locationDeTransports
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort((a, b) => b.id!.localeCompare(a.id!))
                    .filter((item) =>
                      `${item.transportationEquipment?.registration} ${
                        item.vendor?.name
                      } ${item.itineraire} ${
                        employees.find((e: any) => e.id! === item.responsable)
                          ?.name
                      } ${
                        employees.find((e: any) => e.id! === item.responsable)
                          ?.surname
                      } ${
                        budgetLineList.find(
                          (e: any) => e.id === item?.ligneBudgetaire
                        )?.code
                      } ${item?.referenceBudgetaire}`
                        .toLowerCase()
                        .includes(filtre.toLowerCase())
                    )
                    .map((row: LocationItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell
                            component="th"
                            id={labelId}
                            align="left"
                            className="gogo"
                          >
                            {row?.materiel
                              ? row.transportationEquipment?.registration
                              : ""}
                          </TableCell>

                          <TableCell align="left">
                            <Moment format="DD/MM/yyyy">{row.date}</Moment>
                          </TableCell>

                          <TableCell align="left">
                            {
                              employees.find(
                                (e: any) => e.id! === row.responsable
                              )?.name
                            }{" "}
                            {
                              employees.find(
                                (e: any) => e.id! === row.responsable
                              )?.surname
                            }
                          </TableCell>

                          <TableCell align="left">
                            {row.referenceBudgetaire}
                          </TableCell>

                          <TableCell align="left">
                            {row?.fournisseur ? row.vendor?.name : ""}
                          </TableCell>
                          <TableCell align="left">
                            {formatMontant(Number(row.montant))}
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
                          <TableCell align="left">{row.itineraire}</TableCell>
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
                              {validate("Logistiques LE", "U") && (
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
                              {validate("Logistiques LE", "D") && (
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
              count={locationDeTransports.length}
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

export default ListLocation;

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
