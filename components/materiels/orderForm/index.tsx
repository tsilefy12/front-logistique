import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useConfirm } from "material-ui-confirm";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { labelRowsPerPage, defaultLabelDisplayedRows } from "../../../config/table.config";
import Visibility from "@mui/icons-material/Visibility";
import useFetchOrderFormListe from "./hooks/useFetchOrderFormListe";
import { deleteOrderForm } from "../../../redux/features/order-form";
import { OrderFormItem } from "../../../redux/features/order-form/orderForm.interface";
import Moment from "react-moment";
import OrderFormTableToolbar from "./organism/table/OrderFormTableToolbar";
import OrderFormTableHeader from "./organism/table/OrderFormTableHeader";
import { Print } from "@mui/icons-material";




export default function OrderFormList() {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const router = useRouter();

  const confirm = useConfirm();

  const dispatch = useAppDispatch();

  const { orderFormListe } = useAppSelector((state) => state.orderForm);

  const fetchOrderFormListe = useFetchOrderFormListe();

  React.useEffect(() => {
    fetchOrderFormListe();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    router.push(`bon_de_commande/${id}/edit`);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le Bon de commande",
      description: "Voulez-vous vraiment supprimer ce bon de commande ?",
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
        await dispatch(deleteOrderForm({ id }));
        fetchOrderFormListe();
      })
      .catch(() => { });
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
      ? Math.max(0, (1 + page) * rowsPerPage - orderFormListe.length)
      : 0;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Stack direction="row" spacing={2} width={200} >
            <Link href={"/materiels/bon_de_commande/creer"}>
              <Button
                variant="contained"
                startIcon={<Add />}
                size="small"
              >
                Ajouter
              </Button>
            </Link>
            <Button
            variant=""
              startIcon={<Print />}
              size="small"
            >
              Imprimer
            </Button>
          </Stack>
          <Typography variant="h4"> Bon de commande </Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <OrderFormTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <OrderFormTableHeader />
                <TableBody>
                  {orderFormListe
                    .slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row: OrderFormItem, index: any) => {
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
                            {row.reference}
                          </TableCell>

                          <TableCell align="left">
                            {row.shippingMethod}
                          </TableCell>

                          <TableCell align="left">
                            <Moment format="DD/MM/YYYY">
                              {row.deliveryDate}
                            </Moment>
                          </TableCell>

                          <TableCell align="left">
                            {row?.vendor?.name}
                          </TableCell>

                          <TableCell align="right" width={"150px"}>
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              <Link href={`bon_de_commande/${row.id}/detail`}>
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                  size="small"
                                // onClick={() => {
                                // 	handleClickDetail(row.id);
                                // }}
                                >
                                  <Visibility />
                                </IconButton>
                              </Link>
                              <Link href={`bon_de_commande/${row.id}/edit`}>
                                <IconButton
                                  color="primary"
                                  aria-label="Modifier"
                                  component="span"
                                  size="small"
                                >
                                  <Edit />
                                </IconButton>
                              </Link>
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
              count={orderFormListe.length}
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
