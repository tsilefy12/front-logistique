import {
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
  Badge,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { deleteOrderEquipment } from "../../../redux/features/orderEquipment";
import { editOrderEquipment } from "../../../redux/features/orderEquipment";
import { OrderEquipmentItem } from "../../../redux/features/orderEquipment/orderEquipmentSlice.interface";
import {
  defaultLabelDisplayedRows,
  getComparator,
  labelRowsPerPage,
  Order,
} from "../../../config/table.config";
import { useRouter } from "next/router";
import useFetchOrderEquipement from "./hooks/useFetchOrderEquipment";
import { useConfirm } from "material-ui-confirm";
import { OrderEquipementTableProps } from "./table/orderEquipement.interface";
import OrderEquipementTableHead from "./table/OrderEquipementTableHead";
import { Delete, Edit } from "@mui/icons-material";
import Moment from "react-moment";
import OrderEquipementTableToolbar from "./table/OrderEquipementTableToolbar";

const ListCommande = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch: any = useAppDispatch();
  const { orderEquipmentList } = useAppSelector(
    (state) => state.orderEquipment
  );
  const router = useRouter();
  const confirm = useConfirm();

  const fetchOrderEquipmentList = useFetchOrderEquipement();

  useEffect(() => {
    fetchOrderEquipmentList();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    await dispatch(editOrderEquipment({ id }));
  };

  const getColorsStatus = (status: string | undefined) => {
    switch (status) {
      case "PENDING":
        return "info";
        break;
      case "APPROVED":
        return "primary";
        break;
      case "REJECTED":
        return "error";
        break;
      default:
        return "primary";
        break;
    }
  };

  const getTextStatus = (status: string | undefined) => {
    switch (status) {
      case "PENDING":
        return "En_attent";
        break;
      case "APPROVED":
        return "Approuvé";
        break;
      case "REJECTED":
        return "Rejeté";
        break;
      default:
        return "primary";
        break;
    }
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le commande",
      description: "Voulez-vous vraiment supprimer cette commande ?",
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
        await dispatch(deleteOrderEquipment({ id }));
        fetchOrderEquipmentList();
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
      ? Math.max(0, (1 + page) * rowsPerPage - orderEquipmentList.length)
      : 0;

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Link href="/materiels/commande/creer">
          <Button variant="contained" size="small" startIcon={<Add />}>
            Créer
          </Button>
        </Link>
        <Typography variant="h4">Commandes</Typography>
      </SectionNavigation>
      <SectionTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <OrderEquipementTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <OrderEquipementTableHead />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
                  {orderEquipmentList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: OrderEquipmentItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            {row.designation}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            {row.reason}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            <Moment format="DD/MM/YYYY">
                              {row.deadlineOfReception}
                            </Moment>
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            {row.numberOfAuthorisedOffersPossible}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            {row.applicant?.name}
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="center"
                          >
                            <Badge
                              badgeContent={getTextStatus(row.status)}
                              color={getColorsStatus(row.status)}
                            />
                          </TableCell>

                          <TableCell align="right">
                            <BtnActionContainer
                              direction="row"
                              justifyContent="center"
                            >
                              <Link href="/materiels/commande/$/offre">
                                {/* <Link href={`commande/${row.id}/offre`}> */}
                                <Button
                                  variant="outlined"
                                  size="small"
                                  startIcon={<Add />}
                                  color="info"
                                  sx={{ mr: 1 }}
                                >
                                  Gérer Offres
                                </Button>
                              </Link>
                              {/* <Link href={`commande/${row.id}/details`}>
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Link> */}
                              <Link href={`commande/${row.id}/edit`}>
                                <IconButton
                                  color="primary"
                                  aria-label="Details"
                                  component="span"
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
              count={orderEquipmentList.length}
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

export default ListCommande;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
