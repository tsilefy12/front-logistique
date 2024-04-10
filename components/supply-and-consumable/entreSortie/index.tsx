import React, { useState } from "react";
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
import { useAppSelector } from "../../../hooks/reduxHooks";
import {
  labelRowsPerPage,
  defaultLabelDisplayedRows,
} from "../../../config/table.config";
import LogSupplyAndConsumableTableToolbar from "./table/LogSuppluAndConsumableTableToolbar";
import LogSupplyAndConsumableTableHeader from "./table/LogSupplyAndConsumableHeader";
import { LogSuplyAndConsumableItem } from "../../../redux/features/logSuplyAndConsumable/log-supply-and-consumable.interface";
import useFetchLogSuplyAndConsumableList from "./hooks/useFetchLogSupplyAndConsumable";
import Moment from "react-moment";
import { RadioGroup, FormControlLabel,Radio } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function LogSupplyAndConsumableList() {
    
    // const dispatch = useAppDispatch();
    // function getText(OperationType: string) {
    //     switch (OperationType) {
    //     case "INPUT":
    //         return "ENTRE";
    //         break;
    //     case "OUTPUT":
    //         return "SORTIE";
    //         break;
    //     default:
    //         break;
    //     }
    // }
    // const getColorsText = (OperationType: string | undefined) => {
    //     switch (OperationType) {
    //     case "INPUT":
    //         return "primary";
    //         break;
    //     case "OUTPUT":
    //         return "info";
    //         break;
    //     default:
    //         return "primary";
    //         break;
    //     }
    // };

    // const articlee = ["Non de l'article"];
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [operate, setOperate] = useState<"INPUT" | "OUTPUT">("INPUT")
    const [operationLabel, setOperationLabel] = useState<"Entrée" | "Sortie">("Entrée")

    const router = useRouter();

    const { logSuplyAndConsumableList } = useAppSelector(
        (state) => state.logSuplyAndConsumable
    );

    const fetchLogSupplyAndConsumableList = useFetchLogSuplyAndConsumableList();

    React.useEffect(() => {
        fetchLogSupplyAndConsumableList();
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
        ? Math.max(0, (1 + page) * rowsPerPage - logSuplyAndConsumableList.length)
        : 0;

        return (
        <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
        <NavigationContainer>
            <SectionNavigation>
            <Stack direction='row' spacing={3}>
                <Link href="/fournitures_et_consommables/fiche_de_stock">
                <Button color="info" variant="text" startIcon={<ArrowBack />}>
                    Retour
                </Button>
                </Link>
                <Stack direction='row' spacing={2} width={200}>
                <Stack direction="row" spacing={2} margin={4}>
                    <RadioGroup
                    aria-label="choixEntreSortie"
                    name="choixEntreSortie"
                    >
                    <Stack direction='row' spacing={4}>
                    <FormControlLabel value="INPUT" onChange={(e, c)=>{
                        if (!c) { setOperate("OUTPUT")} 
                        setOperate("INPUT")
                        setOperationLabel("Entrée")
                    }} control={<Radio checked={operate === "INPUT"} />} label="Entrée" />
                    <FormControlLabel value="OUTPUT" onChange={(e, c)=>{
                        if (!c) { setOperate("INPUT") } 
                        setOperate("OUTPUT")
                        setOperationLabel("Sortie")
                    }} control={<Radio checked={operate === "OUTPUT"} />} label="Sortie" />
                    </Stack>
                    </RadioGroup>
                </Stack>
                </Stack>
            </Stack>
            </SectionNavigation>
            {/* <Divider /> */}
        </NavigationContainer>

            <SectionTable>
                <Box sx={{ width: "100%", mb: 2 }}>
                <Paper sx={{ width: "100%", mb: 2 }}>
                    <LogSupplyAndConsumableTableToolbar operation={operationLabel}/>
                    <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        <LogSupplyAndConsumableTableHeader operation={operate}/>
                        <TableBody>
                        {logSuplyAndConsumableList.filter(i=> i.OperationType === operate)
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: LogSuplyAndConsumableItem | any, index) => {
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <TableRow hover tabIndex={-1} key={row.id}>
                                <TableCell component="th" id={labelId} align="left">
                                    <Moment format="DD/MM/YYYY">{row.date}</Moment>
                                </TableCell>
                                <TableCell align="left">
                                    {row?.supplyAndConsumableId? row.supplyAndConsumable?.designation: ""}
                                </TableCell>

                                <TableCell align="left">{row.quantity}</TableCell>
                                {
                                    operate ==="INPUT" ? (
                                        <TableCell align="left">{row.unitPrice}</TableCell>
                                    ):(
                                        <TableCell align="left">{row.unitPrice}</TableCell>
                                )}
                                <TableCell align="left">
                                {row?.supplyAndConsumableId? row.supplyAndConsumable?.seuil: ""}
                                </TableCell>

                                {/*<TableCell align="center">
                                    <Badge
                                    badgeContent={getText(row.OperationType)}
                                    color={getColorsText(row.OperationType)}
                                    />
                                </TableCell>*/}
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
                    count={logSuplyAndConsumableList.length}
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
