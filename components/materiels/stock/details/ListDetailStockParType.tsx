import {
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import Checkbox from "@mui/material/Checkbox";
import Data, { Order } from "./table/type-variable";
import { rows } from "./table/constante";
import EnhancedTableToolbar from "./table/EnhancedTableToolbar";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../config/table.config";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getEquipment } from "../../../../redux/features/equipment/useCases/getEquipment";
import { useRouter } from "next/router";
import useFetchEquipment from "../../informatique/hooks/useFetchEquipment";
import Moment from "react-moment";
import formatMontant from "../../../../hooks/format";

const getTextStatus = (status: string | undefined) => {
  switch (status) {
    case "GOOD":
      return "Bon etat";
      break;
    case "BAD":
      return "Mauvais";
      break;
    case "BROKEN":
      return "Inutilisable";
      break;
    default:
      break;
  }
};

const ListDetailStockParType = () => {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Data>("designation");
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [categori, setCategory] = React.useState("")
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const router = useRouter();
  const { id }: any = router.query;
  const { equipments } = useAppSelector((state) =>state.equipment);
  const fetchEquipmentList = useFetchEquipment();
  useEffect(() =>{
   if (equipments.length > 0) {
      const categories = equipments.find(e => e.type.id === id)
      setCategory(categories?.type.type)
   } else {
     setCategory("")
   }
  },[equipments])

  useEffect(() =>{
    fetchEquipmentList();
  },[])

  const listMateriel: { code: string, designation: string, date: any,acquisitionValue: any, etat: string }[] = [];

  if (equipments.length > 0) {
      equipments.forEach((element: any) => {
          if (element["typeEquipmentId"] === id) {
                listMateriel.push({ 
                  code: element.numOptim, 
                  designation: element.designation, 
                  date: element.acquisitionDate, 
                  acquisitionValue: element.acquisitionValue, 
                  etat: element.status});
          }
      });
  } else {
    listMateriel.push({ code: '', designation: '', date: '', acquisitionValue: '', etat: ''});
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Link href="/materiels/stock">
          <Button
            variant="text"
            size="small"
            color="info"
            startIcon={<ArrowBackIcon />}
          >
            Retour
          </Button>
        </Link>
        <Typography variant="h4">Détails</Typography>
      </SectionNavigation>
      <SectionTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length}  category={categori}/>
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Code</TableCell>
                    <TableCell align="left">Désignation</TableCell>
                    <TableCell align="left">Date d'acquisition</TableCell>
                    <TableCell align="left">Valeur d'acquisition</TableCell>
                    <TableCell align="left">Etat</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {( listMateriel
                  ).map((row) => (
                    <TableRow key={row.code}>
                      <TableCell component="th" scope="row">
                        {row.code}
                      </TableCell>
                      <TableCell align="left">{row.designation}</TableCell>
                      <TableCell align="left">
                        <Moment format="DD/MM/yyyy">{row.date}</Moment>
                      </TableCell>
                      <TableCell align="left">{formatMontant(row.acquisitionValue)}</TableCell>
                      <TableCell align="left">{getTextStatus(row.etat)}</TableCell>
                    </TableRow>
                  ))}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={labelRowsPerPage}
              labelDisplayedRows={defaultLabelDisplayedRows}
            />
          </Paper>
          {/* <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          /> */}
        </Box>
      </SectionTable>
    </Container>
  );
};

export default ListDetailStockParType;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
