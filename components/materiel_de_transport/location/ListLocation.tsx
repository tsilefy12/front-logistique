import {
    Button,
    Container,
    IconButton,
    Stack,
    styled,
    Typography,
  } from "@mui/material";
  import Link from "next/link";
  import React, { useState } from "react";
  import Box from "@mui/material/Box";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TablePagination from "@mui/material/TablePagination";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
  import Edit from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import Add from "@mui/icons-material/Add";
  import { useRouter } from "next/router";
  import { useConfirm } from "material-ui-confirm";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { deleteLocation } from "../../../redux/features/location/locationSlice";
import LocationDeTransportTableToolbar from "./organisme/table/LocationDeTransportTableToolbar";
import LocationTransportTableHeader from "./organisme/table/LocationDeTransportTableHeader";
import { LocationItem } from "../../../redux/features/location/location.interface";
import { format } from "date-fns";
import { defaultLabelDisplayedRows, labelRowsPerPage } from "../../../config/table.config";
import useFetchLocationDeTransport from "./hooks/useFetchLocationDeTransport";
import useFetchVendors from "../../vendor/hooks/useFetchVendors";
import useFetchTransportationEquipments from "../hooks/useFetchTransportationEquipments";
import Moment from "react-moment";

    const ListLocation = () => {
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const confirm = useConfirm();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { locationDeTransports } = useAppSelector((state) => state.locationDeTransport);
    const fetchLocationTransport = useFetchLocationDeTransport();
    

   
    React.useEffect(() => {
      fetchLocationTransport();
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
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - locationDeTransports.length) : 0;

    return (
      <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
        <NavigationContainer>
          <SectionNavigation>
            <Link href={"/materiel_de_transport/location/add"}>
              <Button variant="contained" startIcon={<Add />} size="small">
                Ajouter 
              </Button>
            </Link>
            <Typography variant="h4">Toutes locations de transport</Typography>
          </SectionNavigation>
          {/* <Divider /> */}
        </NavigationContainer>
  
        <SectionTable>
          <Box sx={{ width: "100%", mb: 2 }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <LocationDeTransportTableToolbar/>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="small"
                >
                  <LocationTransportTableHeader/>
                  <TableBody>
                    {
                    locationDeTransports
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: LocationItem, index: any) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow hover tabIndex={-1} key={row.id}>
                            <TableCell component="th" id={labelId} align="left" className="gogo">
                              {row?.materiel ? row.transportationEquipment?.registration: ''}
                            </TableCell>

                            <TableCell align="left">
                              <Moment format="DD/MM/yyyy">{row.date}</Moment>
                            </TableCell>
  
                            <TableCell align="left">{row.responsable}</TableCell>
  
                            <TableCell align="left">
                                {row.referenceBudgetaire}
                            </TableCell>

                         <TableCell align="left">
                                {row?.fournisseur ? row.vendor?.fournisseur: ''}
                            </TableCell>
                            <TableCell align="left">
                                {row.montant}
                            </TableCell>
                            <TableCell align="left">
                                {row.grant}
                            </TableCell>
                            <TableCell align="left">
                                {row.ligneBudgetaire}
                            </TableCell>
                            <TableCell align="left">
                                {row.itineraire}
                            </TableCell>
                            <TableCell align="right" width={"150px"}>
                              <BtnActionContainer
                                direction="row"
                                justifyContent="right"
                              >
                            { /*   <Link
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
  