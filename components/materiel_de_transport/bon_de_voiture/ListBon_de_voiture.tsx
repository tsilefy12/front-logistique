import {
    Button,
    Container,
    IconButton,
    Stack,
    styled,
    Typography,
  } from "@mui/material";
import Link from "next/link";
import React from "react";
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useFetchCarVouchers from "./hooks/useFetchCarVoucher";
import { deleteCarVoucher } from "../../../redux/features/car-voucher";
import CarVoucherTableToolbar from "./organism/table/CarVoucherTableToolbar";
import CarVoucherTableHeader from "./organism/table/CarVoucherTableHeader";
import { CarVoucherItem } from "../../../redux/features/car-voucher/carVoucher.interface";
import { defaultLabelDisplayedRows, labelRowsPerPage } from "../../shared/table/tableFeature";
import Moment from "react-moment";
  
  const ListTransport = () => {
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    const confirm = useConfirm();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { carVouchers } = useAppSelector(
      (state) => state.carVoucher
    );
  
    const fetchCarVouchers = useFetchCarVouchers();
  
    React.useEffect(() => {
        fetchCarVouchers();
    }, [router.query]);
  
    const handleClickEdit = async (id: any) => {
      router.push(`/materiel_de_transport/bon_de_voiture/${id}/edit`);
    };
  
    const handleClickDelete = async (id: any) => {
      confirm({
        title: "Supprimer le bon de voiture",
        description:
          "Voulez-vous vraiment supprimer ce bon de voiture ?",
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
          await dispatch(deleteCarVoucher({ id }));
          fetchCarVouchers();
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
        ? Math.max(
            0,
            (1 + page) * rowsPerPage - carVouchers.length
          )
        : 0;
  
    return (
      <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
        <NavigationContainer>
          <SectionNavigation>
            <Link href={"/materiel_de_transport/bon_de_voiture/add"}>
              <Button
                variant="contained"
                startIcon={<Add />}
                size="small"
              >
                Ajouter
              </Button>
            </Link>
            <Typography variant="h4">Tous les bons de voitures</Typography>
          </SectionNavigation>
          {/* <Divider /> */}
        </NavigationContainer>
  
        <SectionTable>
          <Box sx={{ width: "100%", mb: 2 }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <CarVoucherTableToolbar />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="small"
                >
                  <CarVoucherTableHeader />
                  <TableBody>
                    {carVouchers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map(
                        (
                          row: CarVoucherItem | any,
                          index: any
                        ) => {
                          const labelId = `enhanced-table-checkbox-${index}`;
                          return (
                            <TableRow hover tabIndex={-1} key={row.id}>
                              <TableCell
                                component="th"
                                id={labelId}
                                align="left"
                              >
                                {row.number}
                              </TableCell>
  
                              <TableCell align="left">
                                {row.registration}
                              </TableCell>
  
                              <TableCell align="left">
                                {row.type}
                              </TableCell>
  
                              <TableCell align="left">
                                <Moment format="DD/MM/YYYY">{row.departureDate}</Moment> <Moment format="HH:mm">{row.departureTime}</Moment>
                              </TableCell>
  
                              <TableCell align="left">
                              <Moment format="DD/MM/YYYY">{row.arrivalDate}</Moment> <Moment format="HH:mm">{row.arrivalTime}</Moment> 
                              </TableCell>

                              <TableCell align="right" width={"150px"}>
                                <BtnActionContainer
                                  direction="row"
                                  justifyContent="right"
                                >
                                  <Link
                                    href={`/materiel_de_transport/bon_de_voiture/${row.id}/detail`}
                                  >
                                    <IconButton
                                      color="accent"
                                      aria-label="Details"
                                      component="span"
                                    >
                                      <VisibilityIcon />
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
                                    <DeleteIcon />
                                  </IconButton>
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
                count={carVouchers.length}
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
  