import {
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Add from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../config/table.config";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useFetchEquipment from "./hooks/useFetchEquipment";
import EquipmentTableHeader from "./organism/table/EquipmentTableHeader";
import EquipmentTableToolbar from "./organism/table/EquipmentTableToolbar";
import {
  deleteEquipment,
  editEquipment,
  getEmployee,
} from "../../../redux/features/equipment";
import { useConfirm } from "material-ui-confirm";
import { axios } from "../../../lib/axios";


const ListInfo = () => {
    function getColorStatus(etat: string) {
        switch (etat) {
        case "GOOD":
            return "info";
            break;
        case "BAD":
            return "warning";
            break;
        case "BROKEN":
            return "error";
            break;

        default:
            break;
        }
    }
    function getText(etat: string) {
        switch (etat) {
        case "GOOD":
            return "Bon_état";
            break;
        case "BAD":
            return "mauvais";
            break;
        case "BROKEN":
            return "Inutilisable";
            break;

        default:
            break;
        }
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const router = useRouter();
    const confirm = useConfirm();
    const dispatch = useAppDispatch();
    const { equipments } = useAppSelector((state) => state.equipment);
    console.log(equipments);
    const fetchEquipment = useFetchEquipment();

  React.useEffect(() => {
    fetchEquipment();
  }, [router.query]);
  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer le materiel",
      description: "Voulez-vous vraiment supprimer ce materiel ?",
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
        await dispatch(deleteEquipment({ id }));
        fetchEquipment();
      })
      .catch(() => { });
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editEquipment({ id }));
    router.push(`/materiels/informatiques/${id}/edit`);
  };
  const handleClickNewInventaire = async (id: any) => {
    await dispatch(editEquipment({ id }));
    router.push(`/inventaire/${id}/edit`);
  };
  //   const name = async (id: any) => {
  //   console.log(getEmployee({ id }));
    //   await getEmployee({ id });
    // };
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - equipments.length) : 0;

  const [donneMateriel, setDonneMateriel] = useState([]);
  useEffect(() => {
    const fetchMateriles = async () => {
      await axios.get("http://192.168.1.100:3000/logistique/equipment",
        { params: { args: JSON.stringify({ include: { owner: true } }) } }).then(({ data }) => {
          setDonneMateriel(data);
        })

    }
    fetchMateriles();
  }, [])
  return (
    <Container maxWidth="xl">
      <SectionNavigation direction="row" justifyContent="space-between" mb={2}>
        <Link href="informatiques/creer">
          <Button variant="contained" size="small" startIcon={<Add />}>
            Creer
          </Button>
        </Link>
        <Typography variant="h4">Liste des matériels</Typography>
      </SectionNavigation>
      <SectionTable>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EquipmentTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <EquipmentTableHeader />
                {
                  (donneMateriel.length > 0) && (
                    donneMateriel.map((item: any, index: any) => (
                      <TableBody key={index}>
                        <TableCell align="left">{item.numOptim}</TableCell>
                        <TableCell align="left">{item.typeEquipmentId}</TableCell>
                        <TableCell align="left">{item.ownerId}</TableCell>
                        <TableCell align="left">{item.designation}</TableCell>
                        <TableCell align="left">{item.status}</TableCell>
                        <TableCell align="right">
                          <BtnActionContainer
                            direction="row"
                            justifyContent="center"
                          >
                              <IconButton
                                color="info"
                                aria-label="Add"
                                component="span"
                                onClick={() => {
                                  handleClickNewInventaire(item.id);
                                }}
                              >
                              </IconButton>
                            <Link
                              href={`/materiels/informatiques/${item.id}/detail`}
                            >
                              <Stack direction="row" spacing={2} >
                                <IconButton
                                  color="secondary"
                                  aria-label="Add"
                                  component="span"
                                >
                                </IconButton>
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                // onClick={() => {
                                //   alert("En cours de traitement ...");
                                // }}
                                >
                                  <VisibilityIcon />
                                </IconButton>
                              </Stack>
                            </Link>
                            <IconButton
                              color="primary"
                              aria-label="Modifier"
                              component="span"
                              size="small"
                              onClick={() => {
                                handleClickEdit(item.id);
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="warning"
                              aria-label="Supprimer"
                              component="span"
                              size="small"
                              onClick={() => {
                                handleClickDelete(item.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </BtnActionContainer>
                        </TableCell>
                      </TableBody>
                    ))
                  )
                }


              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={equipments.length}
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

export default ListInfo;

export const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
