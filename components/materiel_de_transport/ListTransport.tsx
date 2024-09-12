import Add from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
import { usePermitted } from "../../config/middleware";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { deleteTransportationEquipment } from "../../redux/features/transportation_equipment";
import { TransportationEquipmentItem } from "../../redux/features/transportation_equipment/transportationEquipment.interface";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../shared/table/tableFeature";
import useFetchTransportationEquipments from "./hooks/useFetchTransportationEquipments";
import TransportEquipmentTableHeader from "./organism/table/TransportEquipmentTableHeader";
import TransportEquipmentTableToolbar from "./organism/table/TransportEquipmentTableToolbar";

const ListTransport = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [filtre, setFiltre] = React.useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const confirm = useConfirm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );
  const validate = usePermitted();

  const fetchTransportationEquipments = useFetchTransportationEquipments();

  React.useEffect(() => {
    fetchTransportationEquipments();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    router.push(`/materiel_de_transport/${id}/edit`);
  };

  const handleClickDetail = async (id: any) => {
    router.push(`/materiel_de_transport/${id}/detail`);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le matériel de transport",
      description: "Voulez-vous vraiment supprimer ce matériel de transport ?",
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
        await dispatch(deleteTransportationEquipment({ id }));
        fetchTransportationEquipments();
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
      ? Math.max(0, (1 + page) * rowsPerPage - transportationEquipments.length)
      : 0;
  // console.log(transportationEquipments);
  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          {validate("Logistiques Mat", "C") && (
            <Link href={"/materiel_de_transport/add"}>
              <Button variant="contained" startIcon={<Add />} size="small">
                Ajouter
              </Button>
            </Link>
          )}
          <Typography variant="h4">Tous les matériels</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <TransportEquipmentTableToolbar
              filtre={filtre}
              setFiltre={setFiltre}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <TransportEquipmentTableHeader />
                <TableBody>
                  {transportationEquipments
                    .filter((f) => f.status === "Location interne")
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort((a, b) => b.id!.localeCompare(a.id!))
                    .filter((item) =>
                      `${item.registration} ${item.brand} ${
                        item.otherInformation
                      } ${item.status} ${
                        item.fournisseur ? item?.vendor?.name : ""
                      } ${item?.typeEquipment?.type} - ${
                        item?.typeEquipment?.prefix
                      }`
                        .toLowerCase()
                        .includes(filtre.toLowerCase())
                    )
                    .map(
                      (row: TransportationEquipmentItem | any, index: any) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow hover tabIndex={-1} key={row.id}>
                            <TableCell component="th" id={labelId} align="left">
                              {row.registration}
                            </TableCell>

                            <TableCell align="left">
                              {row?.typeEquipment?.type} -{" "}
                              {row?.typeEquipment?.prefix}
                            </TableCell>

                            <TableCell align="left">{row.brand}</TableCell>

                            <TableCell align="left">
                              {row.otherInformation}
                            </TableCell>

                            <TableCell align="left">
                              {row?.fournisseur ? row?.vendor?.name : ""}
                            </TableCell>

                            {/* <TableCell align="left">{row.status}</TableCell> */}

                            <TableCell align="right" width={"150px"}>
                              <BtnActionContainer
                                direction="row"
                                justifyContent="right"
                              >
                                <Link
                                  href={`/materiel_de_transport/${row.id}/detail`}
                                >
                                  <IconButton
                                    color="accent"
                                    aria-label="Details"
                                    component="span"
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Link>
                                {validate("Logistiques Mat", "U") && (
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
                                {validate("Logistiques Mat", "D") && (
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
                      }
                    )}
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
              count={transportationEquipments.length}
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

export default ListTransport;

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
