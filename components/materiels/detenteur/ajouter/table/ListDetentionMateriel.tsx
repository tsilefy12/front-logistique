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
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { rows } from "./constante";
import { styled } from "@mui/material";
import * as Yup from "yup";
import OSSelectField from "../../../../shared/select/OSSelectField";
import { useAppSelector } from "../../../../../hooks/reduxHooks";
import useFetchEquipment from "../../../informatique/hooks/useFetchEquipment";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import OSTextField from "../../../../shared/input/OSTextField";

const ListDetentionMateriel = () => {
    const { equipments } = useAppSelector((state) => state.equipment);
    const fetchEquipment = useFetchEquipment();
    const router = useRouter();
    React.useEffect(() => {
        fetchEquipment();
    }, [router.query]);
    console.log(equipments)

    const [initialValue, setInitialValue] = React.useState({
        numOptim: "",
        designation: "",
        date: "",
        valeur: "NEW"
    })
    const handleSubmint = async (values: any) => {
    };
    const handleChange= async () => {
        setInitialValue({
            numOptim: "ssss",
            designation: "SSSSS",
            date: "12/12/12",
            valeur: "NEW"
        })
    };
    return (
        <MyTableContainer>
        <Typography variant="h5">Matériel</Typography>
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
                        <TableCell component="th" scope="row">
                        {row.numero}
                        </TableCell>
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
            <Formik
                enableReinitialize
                initialValues={initialValue}
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
                                value = {formikProps.values.numOptim}
                                dataKey="numOptim"
                                onChange={handleChange}
                                sx={{ width: "100%" }}
                                valueKey="id"
                            />
                            <OSTextField
                                id="filled-basic"
                                name="designation"
                                value = {formikProps.values.designation}
                                label="Saisir désignation"
                                variant="filled"
                                sx={{ width: "100%" }}
                            />
                            <OSTextField
                                id="filled-basic"
                                name="date"
                                value = {formikProps.values.date}
                                label="Saisir date d'acquistion"
                                variant="filled"
                                sx={{ width: "100%" }}
                            />
                            <OSTextField
                                id="filled-basic"
                                name="valeur"
                                value = {formikProps.values.valeur}
                                label="Saisir valeur d'acquistion"
                                variant="filled"
                                sx={{ width: "100%" }}
                            />
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                            >
                                <DoneIcon color="info" />
                                <CloseIcon color="warning" />
                            </Stack>
                    </Stack>
                </Form>)}
            </Formik>

            <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            sx={{ mt: 2 }}
            >
            { /*<Button size="small" color="info">
                <AddIcon />
                Ajouter Article
                </Button>*/}
            </Stack>
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
