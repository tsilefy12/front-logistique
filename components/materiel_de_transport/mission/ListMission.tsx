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
 
  import {
    defaultLabelDisplayedRows,
    labelRowsPerPage,
  } from "../../shared/table/tableFeature";
  import Moment from "react-moment";
import { format } from "date-fns";
import useFetchMissionTransport from "./hooks/useFectMission";
import { deleteMissionDeTransport } from "../../../redux/features/mission_transport/missionTransportSlice";
import MissionTransportTableHeader from "./organisme/table/MissionTransportTableHeader";
import { MissionTranportItem } from "../../../redux/features/mission_transport/missionTransport.interface";
import MissionTransportTableToolbar from "./organisme/table/MissionTransportTableToolbar";
import useFetchTransportationEquipments from "../hooks/useFetchTransportationEquipments";
  
    const ListMission = () => {
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const confirm = useConfirm();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { missionTransports } = useAppSelector((state) => state.missionDeTransport);
    const fetchMissionTransport = useFetchMissionTransport();
    const fetchTransportationEquipment = useFetchTransportationEquipments();
    const { transportationEquipments } = useAppSelector((state) =>state.transportationEquipment)


    React.useEffect(() => {
      fetchMissionTransport();
      fetchTransportationEquipment();
      
    }, [router.query]);
   
    var MaterielValue = "";
    transportationEquipments.forEach((element:any) => {
      missionTransports.forEach((item:any) =>{
           if (element?.id === item["materiel"]) {
              MaterielValue = element?.registration;
           }
        })
    });

    const handleClickEdit = async (id: any) => {
      router.push(`/materiel_de_transport/mission/${id}/edit`);
    };
  
    const handleClickDelete = async (id: any) => {
      confirm({
        title: "Supprimer le suivi carburant",
        description: "Voulez-vous vraiment supprimer cette ligne ?",
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
          await dispatch(deleteMissionDeTransport({ id }));
          fetchMissionTransport();
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
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - missionTransports.length) : 0;
  
    return (
      <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
        <NavigationContainer>
          <SectionNavigation>
            <Link href={"/materiel_de_transport/mission/add"}>
              <Button variant="contained" startIcon={<Add />} size="small">
                Ajouter 
              </Button>
            </Link>
            <Typography variant="h4">Tous les missions de transport</Typography>
          </SectionNavigation>
          {/* <Divider /> */}
        </NavigationContainer>
  
        <SectionTable>
          <Box sx={{ width: "100%", mb: 2 }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <MissionTransportTableToolbar/>
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                  size="small"
                >
                  <MissionTransportTableHeader/>
                  <TableBody>
                    {
                    missionTransports
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row: MissionTranportItem | any, index: any) => {
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow hover tabIndex={-1} key={row.id}>
                            <TableCell component="th" id={labelId} align="left">
                              {MaterielValue}
                            </TableCell>

                            <TableCell align="left">{row.pj}</TableCell>
  
                            <TableCell align="left">{format(new Date(row.date), "dd/MM/yyyy")}</TableCell>
  
                            <TableCell align="left">
                                {row.libelle}
                            </TableCell>
  
                            <TableCell align="left">
                                {row.utilisateur}
                            </TableCell>
  
                            <TableCell align="left">
                                {row.montant}
                            </TableCell>

                            <TableCell align="left">
                                {row.grant}
                            </TableCell>
                            <TableCell align="left">
                                {row.ligneBudgetaire}
                            </TableCell>
                            <TableCell align="right" width={"150px"}>
                              <BtnActionContainer
                                direction="row"
                                justifyContent="right"
                              >
                            { /*   <Link
                                  href={`/materiel_de_transport/suivi_carburant/${row.id}/detail`}
                                >
                                  <IconButton
                                    color="accent"
                                    aria-label="Details"
                                    component="span"
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                </Link>*/}
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
                count={missionTransports.length}
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
  
  export default ListMission;
  
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
  