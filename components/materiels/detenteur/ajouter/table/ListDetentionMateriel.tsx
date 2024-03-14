import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";;
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import { rows } from "./constante";
import { styled } from "@mui/material";
import * as Yup from "yup";
import OSSelectField from "../../../../shared/select/OSSelectField";
import { useAppSelector ,useAppDispatch} from "../../../../../hooks/reduxHooks";
import useFetchEquipment from "../../../informatique/hooks/useFetchEquipment";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { getEquipments } from "../../../../../redux/features/equipment";
import { useEffect } from "react";

const ListDetentionMateriel = () => {
    const { equipments } = useAppSelector((state) => state.equipment);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const fetchUtilsData = () => {
        dispatch(getEquipments({}));
    };
    
    useEffect(() => {
        fetchUtilsData();
    }, [router.query]);
    console.log(equipments)
  
    const handleSubmint = async (values: any) => {
    };
    const handleChange= async () => {
    };
    return (
        <MyTableContainer>
            <Stack
                direction="row"
                sx={{
                    flex: "1 1 100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                >
                <Typography variant="h6" id="tableTitle" component="div">
                    Matériel
                </Typography>
                <Formik
                        enableReinitialize
                        initialValues={{
                            numOption : ""
                        }}
                        validationSchema={Yup.object({
                            numOptim: Yup.string(),
                            designation: Yup.string(),
                            date: Yup.string(),
                            valeur: Yup.string()
                        })}
                        onSubmit={async (value: any, action) => {
                            await handleSubmint(value);
                            action.resetForm();
                        }}
                    >
                    {(formikProps) => (
                        <Form>
                            <Stack direction="row" spacing={2}>
                                <OSSelectField
                                    id="contracType"
                                    name="codeOptim"
                                    label="Choisir un code d'OPTIM"
                                    options={equipments}
                                    dataKey="numOptim"
                                    onChange={handleChange}
                                    sx={{ width: "100%" }}
                                    valueKey="id"
                                />
                            </Stack>
                        </Form>)}
                </Formik>
            </Stack>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>N° OPTIM</TableCell>
                        <TableCell align="left">Désignation</TableCell>
                        <TableCell align="left">Date acquisition</TableCell>
                        <TableCell align="left">Valeur acquisition</TableCell>
                        <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.numero}</TableCell>
                            <TableCell align="left">{row.designation}</TableCell>
                            <TableCell align="left">{row.date_acquisition}</TableCell>
                            <TableCell align="left">{row.valeur_acquisition} Ar</TableCell>

                            <TableCell
                            align="center"
                            sx={{ width: 150, background: "#F5F5F5" }}
                            >
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <EditIcon color="primary" />
                                <DeleteIcon color="warning" />
                            </Stack>
                            </TableCell>
                        </TableRow>
                        ))} 
                    </TableBody>
                </Table>
            </TableContainer>
        </MyTableContainer>
    );
};

export default ListDetentionMateriel;

const MyTableContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  width: "100%",
  marginBottom: theme.spacing(10),
}));
