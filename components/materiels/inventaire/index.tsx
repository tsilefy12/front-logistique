import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
// import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  labelRowsPerPage,
  defaultLabelDisplayedRows,
} from "../../../config/table.config";
import InventaireTableToolbar from "./table/InventaireTableToolbar";
import InventaireTableHeader from "./table/InventaireHeader";
import { InventaireItem } from "../../../redux/features/inventaire/inventaire.interface";
import useFetchInventaireList from "./hooks/useFetchInventaire";
import Moment from "react-moment";
import { Badge, RadioGroup, FormControlLabel,Radio } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function InventaireList() {
  const dispatch = useAppDispatch();
  function getText(OperationType: string) {
    switch (OperationType) {
      case "INPUT":
        return "ENTRE";
        break;
      case "OUTPUT":
        return "SORTIE";
        break;
      default:
        break;
    }
  }
  
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const router = useRouter();

  const {inventaireList} = useAppSelector(
    (state) => state.inventaire
  );

  const fetchInventaireList = useFetchInventaireList();

  React.useEffect(() => {
    fetchInventaireList();
  }, [router.query]);

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
      ? Math.max(0, (1 + page) * rowsPerPage - InventaireList.length)
      : 0;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Stack direction='row' spacing={3}>
            <Link href="/materiels/informatiques/">
              <Button color="info" variant="text" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
          </Stack>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <InventaireTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <InventaireTableHeader />
                <TableBody>
                  {inventaireList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: InventaireItem | any, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell component="th" id={labelId} align="left">
                            {row.equipment?.designation} {row.equipment?.numOptim}
                          </TableCell>
                          <TableCell component="th" id={labelId} align="left">
                            <Moment format="DD/MM/YYYY">{row.dateInventaire}</Moment>
                          </TableCell>
                          <TableCell component="th" id={labelId} align="left">
                            <Moment format="DD/MM/YYYY">{row.datePreciation}</Moment>
                          </TableCell>
                          <TableCell align="left">
                            {row.dureDeVie}
                          </TableCell>
                          <TableCell align="left">{row.etatMateriel}</TableCell>
                          <TableCell align="left">{row.valeurInventaire}</TableCell>
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
              count={inventaireList.length}
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
