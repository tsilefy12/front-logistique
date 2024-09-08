import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import {
  Button,
  Container,
  IconButton,
  MenuItem,
  Stack,
  styled,
  TextField,
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
import React, { useEffect, useMemo } from "react";
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
import useFetchVendors from "../../vendor/hooks/useFetchVendors";
import useFetchTransportationEquipments from "../hooks/useFetchTransportationEquipments";
import useFetchLocationDeTransport from "./hooks/useFetchLocationDeTransport";
import LocationTransportTableHeader from "./organisme/table/LocationDeTransportTableHeader";
import LocationDeTransportTableToolbar from "./organisme/table/LocationDeTransportTableToolbar";
import { getInterns } from "../../../redux/features/employeStagiaire/stagiaireSlice";
import useFetchPrestataire from "../../materiels/bon_commande_externe/hooks/getPrestataire";
import useFetchEmployes from "../../materiels/informatique/hooks/useFetchEmployees";
import useFetchLigneBudget from "./hooks/useFetchLigneBudget";

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
  const { interns } = useAppSelector((state) => state.stagiaire);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector((state) => state.prestataire);
  const fetchLigneBudget = useFetchLigneBudget();
  const { lineBudgetList } = useAppSelector((state) => state.ligneBudget);
  const [filter, setFilter] = React.useState<string>("");
  const [dataFilter, setDataFilter] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetchLocationTransport();
    fetchTransportationEquipment();
    fetchVendor();
    fetchEmploye();
    dispatch(getInterns({}));
    fetchPrestataire();
    fetchLigneBudget();
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
  const total = [
    ...employees.map((i: any) => {
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "employe",
      };
    }),
    ...interns.map((i: any) => {
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "intern",
      };
    }),
    ...prestataireListe.map((i: any) => {
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "prestataire",
      };
    }),
  ];

  const ListeDate: any = useMemo(() => {
    if (locationDeTransports && locationDeTransports.length > 0) {
      return new Set(
        locationDeTransports.map((item: LocationItem) =>
          new Date(item.date!).toLocaleDateString()
        )
      );
    }
    return [];
  }, [locationDeTransports]);

  const [filterParDate, setFilterParDate] = React.useState<any>("");

  React.useEffect(() => {
    if (filterParDate === "") {
      setDataFilter([...locationDeTransports].reverse());
    } else {
      const data = locationDeTransports.filter(
        (item: any) =>
          new Date(item?.date).toLocaleDateString() === filterParDate
      );
      setDataFilter(data);
    }
  }, [filterParDate, locationDeTransports]);

  useEffect(() => {
    const donnee = locationDeTransports.filter((item) =>
      `${item.transportationEquipment?.registration} ${item.vendor?.name} ${
        item.itineraire
      } ${total.find((e: any) => e.id! === item.responsable)?.name} ${
        total.find((e: any) => e.id! === item.responsable)?.name
      } ${
        budgetLineList.find((e: any) => e.id === item?.ligneBudgetaire)?.code
      } ${lineBudgetList.find((f) => f.id === item?.referenceBudgetaire)?.name}`
        .toLowerCase()
        .includes(filtre.toLowerCase())
    );
    setDataFilter(donnee);
  }, [locationDeTransports, filtre]);
  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Stack direction="row" gap={2} alignItems="center">
            {validate("Logistiques LE", "C") && (
              <Link href={"/materiel_de_transport/location/add"}>
                <Button variant="contained" startIcon={<Add />} size="small">
                  Ajouter
                </Button>
              </Link>
            )}
            <TextField
              fullWidth
              select
              id="outlined-basic"
              label="Filtre par date"
              variant="outlined"
              value={filterParDate}
              onChange={(e: any) => setFilterParDate(e.target.value)}
              size="small"
              sx={{ width: 150 }}
            >
              <MenuItem value="">Toutes les dates</MenuItem>
              {[...ListeDate].map((element: any) => (
                <MenuItem key={element} value={element}>
                  {element instanceof Date
                    ? element.toLocaleDateString()
                    : element}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
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
                  {dataFilter
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort((a, b) => b.id!.localeCompare(a.id!))

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
                              total.find((e: any) => e.id! === row.responsable)
                                ?.name
                            }{" "}
                          </TableCell>

                          <TableCell align="left">
                            {
                              lineBudgetList.find(
                                (f) => f.id === row?.referenceBudgetaire
                              )?.name
                            }
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
