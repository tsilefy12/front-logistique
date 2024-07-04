import React, { useEffect } from "react";
import { Box, IconButton, Paper, Stack, styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import {
  Order,
  defaultLabelDisplayedRows,
  getComparator,
  labelRowsPerPage,
} from "../../../../../config/table.config";
import { useRouter } from "next/router";
import useFetchTypeJournal from "../../hooks/useFetchPassenger";
import { useConfirm } from "material-ui-confirm";
import TypeJournalTableToolbar from "./PassengerTableToolbar";
import TypeJournalTableHeader from "./PassengerTableHeader";
import Badge from "@mui/material/Badge";
import useFetchPassenger from "../../hooks/useFetchPassenger";
import { deletePassenger, editPassenger } from "../../../../../redux/features/passenger";
import { PassengerItem } from "../../../../../redux/features/passenger/passengerSlice.interface";
import PassengerTableToolbar from "./PassengerTableToolbar";
import PassengerTableHeader from "./PassengerTableHeader";



export default function PassengerListe () {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // const useFetchPCG = useFetchPlanComptable();
  const dispatch: any = useAppDispatch();
  // const { journalTypeList } = useAppSelector((state) => state.journalType);
  const { passengerListe } = useAppSelector((state) => state.passenger)
  const router = useRouter();
  const confirm = useConfirm();

  const fetchPassenger = useFetchPassenger();

  useEffect(() => {
    fetchPassenger();
  }, [router.query]);


  const handleClickEdit = async (id: any) => {
    await dispatch(editPassenger({ id }));
  };

  const handleclickDelete = async (id: any) => {
    confirm({
      title: "Supprimer ce etat matériel",
      description: "Voulez-vous vraiment supprimer ce etat matériel ?",
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
        await dispatch(deletePassenger({ id }));
        fetchPassenger();
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
      ? Math.max(0, (1 + page) * rowsPerPage - passengerListe.length)
      : 0;

  return (
    <TableSection>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <PassengerTableToolbar />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <PassengerTableHeader />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
            rows.slice().sort(getComparator(order, orderBy)) */}
                {passengerListe
                  .sort((a, b) => (b.id!).localeCompare(a.id!))
                  .map((row: PassengerItem, index: any) => {
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
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          <BtnActionContainer
                            direction="row"
                            justifyContent="flex-end"
                          >
                            <IconButton
                              color="primary"
                              aria-label="Modifier"
                              component="span"
                              onClick={() => handleClickEdit(row.id)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="warning"
                              aria-label="Supprimer"
                              component="span"
                              onClick={() => handleclickDelete(row.id)}
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
            count={passengerListe.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage={labelRowsPerPage}
            labelDisplayedRows={defaultLabelDisplayedRows}
          />
        </Paper>
      </Box>
    </TableSection>
  );
}

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));

const TableSection = styled("div")(({ theme }) => ({
  paddingBlock: theme.spacing(2),
  paddingLeft: theme.spacing(2),
}));
