import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import Badge from "@mui/material";
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
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ConsumableItem } from "../../redux/features/order-supply-and-consumable/OrderSupplyAndConsumable.interface";
import {
  labelRowsPerPage,
  defaultLabelDisplayedRows,
} from "../shared/table/tableFeature";
import Visibility from "@mui/icons-material/Visibility";
import useFetchConsConsumables from "./hooks/useFetchOrderSupplyAndConsumables";
import { deleteConsumable } from "../../redux/features/order-supply-and-consumable";
import ConsumableTableToolbar from "./organism/table/OrderSupplyAndConsumableTableToolbar";
import ConsumableTableHeader from "./organism/table/OrderSupplyAndConsumableTableHeader";
import Moment from "react-moment";
import { Badge } from "@mui/material";

export default function ConsumableList() {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const { suplyAndConsumable } = useAppSelector(
  //   (state) => state.suplyAndConsumable
  // );
  const router = useRouter();

  const confirm = useConfirm();

  const dispatch = useAppDispatch();

  const { consumables } = useAppSelector((state) => state.consumable);

  const fetchConsumables = useFetchConsConsumables();

  React.useEffect(() => {
    fetchConsumables();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    router.push(`/fournitures_et_consommables/commande/${id}/edit`);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le fournisseur",
      description: "Voulez-vous vraiment supprimer ce fournisseur ?",
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
        await dispatch(deleteConsumable({ id }));
        fetchConsumables();
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - consumables.length) : 0;

  const getColorsStatus = (status: string | undefined) => {
    switch (status) {
      case "PENDING":
        return "primary";
        break;
      case "APPROVEDBYMANAGER":
        return "success";
        break;
      case "APPROVED":
        return "info";
        break;
      case "REJECTED":
        return "error";
        break;
      case "CANCELLED":
        return "warning";
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
      case "APPROVEDBYMANAGER":
        return "Approuvé_Par_Directeur";
        break;
      case "APPROVED":
        return "Approuvé";
        break;
      case "REJECTED":
        return "Rejeté";
        break;
      case "CANCELLED":
        return "Annulé";
        break;
      default:
        return "primary";
        break;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Link href={"/fournitures_et_consommables/commande/ajouter"}>
            <Button variant="contained" startIcon={<Add />} size="small">
              Ajouter
            </Button>
          </Link>
          <Typography variant="h4"> Liste des commandes </Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <ConsumableTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <ConsumableTableHeader />
                <TableBody>
                  {consumables
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: ConsumableItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell component="th" id={labelId} align="left">
                            {row?.item}
                          </TableCell>

                          <TableCell align="left">
                            {row.applicant?.name} {row.applicant?.surname}
                          </TableCell>

                          <TableCell align="left">
                            {row.requestedQuantity}
                          </TableCell>

                          <TableCell align="left">
                            {row.deliveredQuantity}
                          </TableCell>

                          <TableCell align="left">
                            <Moment format="DD/MM/YYYY">
                              {row.deliveryDate}
                            </Moment>
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            align="left"
                          >
                            <Badge
                              // badgeContent={row.status}
                              badgeContent={getTextStatus(row.status)}
                              color={getColorsStatus(row.status)}
                            />
                          </TableCell>
                          <TableCell align="right" width={"150px"}>
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              <Link
                                href={`/fournitures_et_consommables/commande/${row.id}/details`}
                              >
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                  size="small"
                                >
                                  <Visibility />
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
              count={consumables.length}
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
