import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
// import Badge from "@mui/material";
import styled from "@emotion/styled";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
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
import { PvComparaisonFournisseurItem } from "../../../redux/features/pvComparaison/pvComparaisonFournisseur.interface.";
import {
  labelRowsPerPage,
  defaultLabelDisplayedRows,
} from "../../shared/table/tableFeature";
import Visibility from "@mui/icons-material/Visibility";
import useFetchpvComparaison from "./hooks/useFetchPvComparaisonFournisseur";
import { deletePvComparaison } from "../../../redux/features/pvComparaison/pvComparaisonSlice";
import PvComparaisonTableToolbar from "./table/pvComparaisonTableToolbar";
import PvComparaisonTableHeader from "./table/pvComparaisonTableHeader";
import { PvComparaisonItem } from "../../../redux/features/pvComparaison/pvComparaison.interface";

export default function PvComparaisonList() {
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // const { suplyAndConsumable } = useAppSelector(
    //   (state) => state.suplyAndConsumable
    // );
    const router = useRouter();

    const confirm = useConfirm();

    const dispatch = useAppDispatch();

    const { pvComparaisons } = useAppSelector((state) => state.pvComparaison);

    const fetchpvComparaison= useFetchpvComparaison();

    React.useEffect(() => {
        fetchpvComparaison();
    }, [router.query]);

    const handleClickDelete = async (id: any) => {
        confirm({
            title: "Supprimer le fournisseur",
            description: "Voulez-vous vraiment supprimer ce pv de comparaison d'offre ?",
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
            await dispatch(deletePvComparaison({ id }));
            fetchpvComparaison();
        })
        .catch(() => {});
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    const handleClickDetails = async (id: any) => {
        router.push(`/materiels/pv_comparaison//${id}/details`);
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pvComparaisons.length) : 0;
    return (
        <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
        <NavigationContainer>
            <SectionNavigation>
            <Link href={"/materiels/pv_comparaison/ajouter"}>
                <Button variant="contained" startIcon={<Add />} size="small">
                    Ajouter
                </Button>
            </Link>
            <Typography variant="h4"> Liste Pv Comparaison Offre</Typography>
            </SectionNavigation>
            {/* <Divider /> */}
        </NavigationContainer>
        <SectionTable>
            <Box sx={{ width: "100%", mb: 2 }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                    <PvComparaisonTableToolbar />
                    <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        <PvComparaisonTableHeader />
                        <TableBody>
                        {pvComparaisons
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: PvComparaisonItem, index: any) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                let modePaie: string | undefined = undefined;
                                let fournisseur: string | undefined = undefined;
                                
                                row.tableComparaison?.forEach((element:any, index:any) => {
                                    if (element.offreRetenu?.length > 0) {
                                        modePaie = element.modePaie;
                                        fournisseur = element.vendor?.name;
                                    }
                                })
                                return (
                                    <TableRow hover tabIndex={-1} key={row.id}>
                                        <TableCell align="left">{row?.objet}</TableCell>
                                        <TableCell align="left">{row?.bce ? row.bonDeCommandeExterne?.ref+"(BCE)" : row.bonDeCommandeInterne?.reference +"(BCI)"}</TableCell>
                                        <TableCell align="left">{fournisseur || ""}</TableCell>
                                        <TableCell align="left">{modePaie || ""}</TableCell>
                                        <TableCell align="right" width={"150px"}>
                                            <BtnActionContainer
                                            direction="row"
                                            justifyContent="right"
                                            >
                                            <IconButton
                                                color="accent"
                                                aria-label="Details"
                                                component="span"
                                                size="small"
                                                onClick={() => {
                                                    handleClickDetails(row.id);
                                                }}
                                                >
                                                <Visibility />
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
                    count={pvComparaisons.length}
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
