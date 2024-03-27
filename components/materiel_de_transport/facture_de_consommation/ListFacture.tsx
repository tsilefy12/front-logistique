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
import { useConfirm } from "material-ui-confirm";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useFetchConsumptionInvoice from "./hooks/useFetchConsumptionInvoice";
import {
  deleteConsumptionInvoice,
  getConsumptionInvoice,
} from "../../../redux/features/consumption_invoice";
import ConsumptionInvoiceTableToolbar from "./organism/table/ConsumptionInvoiceTableToolbar";
import ConsumptionInvoiceTableHeader from "./organism/table/ConsumptionInvoiceTableHeader";
import { ConsumptionInvoiceItem } from "../../../redux/features/consumption_invoice/consumptionInvoice.interface";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../shared/table/tableFeature";

const ListFacture = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const confirm = useConfirm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { consumptionInvoices } = useAppSelector(
    (state) => state.consumptionInvoice
  );
  const calculeConsommation = (depart: any, arrive: any) => {
    return parseFloat(depart) - parseFloat(arrive);
  };
  const calculateAmount = (unitPrice: any, consommation: any) => {
    return parseFloat(unitPrice) * parseFloat(consommation);
  };

  const fetchConsumptionInvoices = useFetchConsumptionInvoice();

  React.useEffect(() => {
    fetchConsumptionInvoices();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    router.push(`/materiel_de_transport/facture_de_consommation/${id}/edit`);
  };

  // const handleClickDetail = async (id: any) => {
  //   router.push(`/materiel_de_transport/facture_de_consommation/${id}/detail`);
  //   await dispatch(getConsumptionInvoice({ id }));
  //   fetchConsumptionInvoices();
  // };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le facture de consommation",
      description:
        "Voulez-vous vraiment supprimer ce facture de consommation ?",
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
        await dispatch(deleteConsumptionInvoice({ id }));
        fetchConsumptionInvoices();
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
      ? Math.max(0, (1 + page) * rowsPerPage - consumptionInvoices.length)
      : 0;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Link href={"/materiel_de_transport/facture_de_consommation/creer"}>
            <Button variant="contained" startIcon={<Add />} size="small">
              Ajouter
            </Button>
          </Link>
          <Typography variant="h4">Facture de consommation</Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <ConsumptionInvoiceTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <ConsumptionInvoiceTableHeader />
                <TableBody>
                  {consumptionInvoices
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: ConsumptionInvoiceItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell component="th" id={labelId} align="left">
                            {row.invoiceNumber}
                          </TableCell>

                          <TableCell align="left">
                            {row?.carVoucher?.number}
                          </TableCell>

                          <TableCell align="left">{row.reason}</TableCell>

                          <TableCell align="left">
                            {"arrive="} {row.arrivalKilometrage} {"/"}{" "}
                            {"depart="} {row.DepartureKilometrage}
                          </TableCell>
                          <TableCell align="left">
                            {calculeConsommation(
                              row.arrivalKilometrage,
                              row.DepartureKilometrage
                            )}
                          </TableCell>

                          <TableCell align="left">
                            {/* {row.arrivalKilometrage} */}
                            {calculateAmount(row.consommation, row.unitPrice)}
                          </TableCell>

                          <TableCell align="right" width={"150px"}>
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              <Link
                                href={`/materiel_de_transport/facture_de_consommation/${row.id}/detail`}
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
              count={consumptionInvoices.length}
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

export default ListFacture;

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
