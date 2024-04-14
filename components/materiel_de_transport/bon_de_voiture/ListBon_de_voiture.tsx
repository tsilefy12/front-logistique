import {
  Button,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
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
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../shared/table/tableFeature";
import Moment from "react-moment";
import { format } from "date-fns";
import useFetchTransportationEquipments from "../hooks/useFetchTransportationEquipments";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Label } from "@mui/icons-material";



const ListTransport = () => {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //const []

  const confirm = useConfirm();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { carVouchers } = useAppSelector((state) => state.carVoucher);
  const { transportationEquipment } = useAppSelector((state) => state.transportationEquipment)
  const fetchTransportEquipements = useFetchTransportationEquipments()

  const fetchCarVouchers = useFetchCarVouchers();
  const [positionMois, setPositionMois]: any = useState(0)
  const [mois, setMois]: any = useState(0)
  const [annee, setAnne]: any = useState(0)
  const [montantMensuel, setMontantMensuel]: any = useState(0);
  const [filteredCarVouchers, setFilteredCarVouchers] = useState<CarVoucherItem[]>([]);

  React.useEffect(() => {
    fetchTransportEquipements()
    fetchCarVouchers();
  }, [router.query, positionMois]);

  const handleClickEdit = async (id: any) => {
    router.push(`/materiel_de_transport/bon_de_voiture/${id}/edit`);
  };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le bon de voiture",
      description: "Voulez-vous vraiment supprimer cet entretien ?",
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - carVouchers.length) : 0;

  //Filtre par mois 
  const ListMois: any = [
    { id: 1, name: "Janvier" }, { id: 2, name: "Février" },
    { id: 3, name: "Mars" }, { id: 4, name: "Avril" },
    { id: 5, name: "Mai" }, { id: 6, name: "Juin" },
    { id: 7, name: "Juillet" }, { id: 8, name: "Août" },
    { id: 9, name: "Septembre" }, { id: 10, name: "Octobre" },
    { id: 11, name: "Novembre" }, { id: 12, name: "Décembre" }
  ];
  const ListeAnnee: any = useMemo(() =>{
    if (carVouchers && carVouchers.length > 0) {
       return new Set(carVouchers.map((item: any) => new Date(item.date!).getFullYear()))
    }
    return [];
  }, [carVouchers])

 React.useEffect(() =>{
     filtreData()
 }, [mois, annee])
 
  const filtreData = () => {
    let temp = [...carVouchers]
    if (mois === 0 && annee === 0) {
      setFilteredCarVouchers(carVouchers);
    }else{
      if (mois != "tous") {
        temp = temp.filter((row: CarVoucherItem) => {
          const rowDate = new Date(row.date!).getMonth() + 1;
          if (rowDate == mois) {
            return row
          }
        });
        
      }
      if (annee!="tous") {
        temp = temp.filter((row: CarVoucherItem) => {
          const rowDate = new Date(row.date!).getFullYear();
          if (rowDate == annee) {
            return row
          }
        });
      }
      let calcul = 0;
      temp.forEach((item: any) => {
        const montantM = item["montantTotal"];
        calcul += montantM;
        setMontantMensuel(calcul);
      })
      setFilteredCarVouchers(temp)
    }
  }


  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Typography>
            <Stack direction="row" spacing={4}>
              <Link href={"/materiel_de_transport/bon_de_voiture/add"}>
                <Button variant="contained" startIcon={<Add />} size="small" sx={{height: 40, width: "260px" }}>
                  Ajouter
                </Button>
              </Link>
              <FormControl fullWidth>
                  <TextField
                    select
                    label="Mois"
                    value={mois}
                    onChange={(e) => setMois(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="tous">Tous les mois</MenuItem>
                    {ListMois.map((element: any) => (
                      <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    ))}
                  </TextField>
              </FormControl>
              <FormControl fullWidth>
                  <TextField
                    select
                    label="Année"
                    value={annee}
                    onChange={(e) => setAnne(e.target.value)}
                    size="small"
                  >
                    <MenuItem value="tous">Tous les années</MenuItem>
                    {[...ListeAnnee].map((element: any) => (
                      <MenuItem key={element} value={element}>{element}</MenuItem>
                    ))}
                  </TextField>
              </FormControl>
            </Stack>
          </Typography>
          <Typography variant="h4">Tous les entretiens</Typography>
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
                  {filteredCarVouchers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .sort((a, b) => {
                    const dateA: any = new Date(a.date || '');
                    const dateB: any = new Date(b.date || '');
                    
                    return dateA - dateB;
                  })
                    .map((row: CarVoucherItem, index: any) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell component="th" id={labelId} align="left">
                            {row?.materiel ? row.transportationEquipment?.registration : ''}
                          </TableCell>

                          <TableCell align="left">
                            <Moment format="DD/MM/yyyy">{row.date}</Moment>
                          </TableCell>

                          <TableCell align="left">
                            {row.reference}
                          </TableCell>
                          <TableCell align="left">{row.montantTotal} Ariary</TableCell>
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
              <FormControl sx={{ display: (montantMensuel == 0 || mois == "tous" || filteredCarVouchers.length == 0) ? 'none' : 'block', marginTop: 4 }}>
                <label><strong>Montant mensuel</strong> : <b><span>{montantMensuel} Ariary</span></b></label>
              </FormControl>
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
