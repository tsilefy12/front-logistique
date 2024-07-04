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
import { deleteTypeEquipment } from "../../../../../redux/features/typeEquipment";
import { editTypeEquipment } from "../../../../../redux/features/typeEquipment";
import { TypeEquipmentItem } from "../../../../../redux/features/typeEquipment/typeEquipmentSlice.interface";
import { useRouter } from "next/router";
import useFetchTypeEquipment from "../../hooks/useFetchTypeEquipment";
import { useConfirm } from "material-ui-confirm";
import TypeEquipmentTableToolbar from "./TypeEquipmentTableToolbar";
import TypeEquipmentTableHeader from "./TypeEquipmentTableHeader";
import formatMontant from "../../../../../hooks/format";

const ListValeurIndice = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [ filtre, setFiltre] = React.useState("")
  const dispatch: any = useAppDispatch();
  const { typeEquipmentList } = useAppSelector((state) => state.typeEquipment);
  const router = useRouter();
  const confirm = useConfirm();

  const fetchTypeEquipmentList = useFetchTypeEquipment();

  useEffect(() => {
    fetchTypeEquipmentList();
  }, [router.query]);

  const handleClickEdit = async (id: any) => {
    await dispatch(editTypeEquipment({ id }));
  };

  const handleclickDelete = async (id: any) => {
    confirm({
      title: "Supprimer type de matériel",
      description: "Voulez-vous vraiment supprimer ce type de matériel ?",
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
        await dispatch(deleteTypeEquipment({ id }));
        fetchTypeEquipmentList();
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
      ? Math.max(0, (1 + page) * rowsPerPage - typeEquipmentList.length)
      : 0;

  return (
    <TableSection>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TypeEquipmentTableToolbar filtre={filtre} setFiltre={setFiltre} />
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"small"}
            >
              <TypeEquipmentTableHeader />
              <TableBody>
                {/* if you don't need to support IE11, you can replace the `stableSort` call with:
            rows.slice().sort(getComparator(order, orderBy)) */}
                {typeEquipmentList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .sort((a, b) => (b.id!).localeCompare(a.id!))
                  .filter(item => (`${item.type} ${item.prefix}`).toLowerCase().includes(filtre.toLowerCase()))
                  .map((row: TypeEquipmentItem, index: any) => {
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
                          {row.type}
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                          align="left"
                        >
                          {row?.prefix}
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="normal"
                          align="left"
                        >
                          {row?.unitPrice! > 0 ? formatMontant(row?.unitPrice!)+`ar /km` :""} 
                        </TableCell>
                        <TableCell align="right">
                          <BtnActionContainer
                            direction="row"
                            justifyContent="center"
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
            count={typeEquipmentList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </TableSection>
  );
};

const BtnActionContainer = styled(Stack)(({ theme }) => ({}));

const TableSection = styled("div")(({ theme }) => ({
  paddingBlock: theme.spacing(2),
  paddingLeft: theme.spacing(2),
}));

export default ListValeurIndice;
