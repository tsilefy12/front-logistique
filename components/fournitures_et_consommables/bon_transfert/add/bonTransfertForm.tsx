import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { Box, FormControl, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSTextField from "../../../shared/input copy/OSTextField";
import OSSelectField from "../../../shared/select/OSSelectField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { cancelEdit } from "../../../../redux/features/vendor/vendorSlice";
import {
  createBonTransfert,
} from "../../../../redux/features/bon_transfert/bonTransfertSlice";
import { Delete } from "@mui/icons-material";
import { createArticleTransfert } from "../../../../redux/features/bon_transfert/articleTransfertSlice";
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";
import { getEmployees } from "../../../../redux/features/employeStagiaire/employeeSlice";

export default function BonTransfertForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();

    const { isEditing,bonTransfert } = useAppSelector((state) => state.bonTransfert);
    const { employees } = useAppSelector((state) => state.employe);
    const { interns } = useAppSelector((state) => state.stagiaire);
    const total = [...employees.map((i:any)=>{
        return {
        id : i.id, name: i.name +" "+ i.surname, type: "employe"
        }
    }),...interns.map((i:any)=>{
        return {
        id : i.id, name: i.name +" "+ i.surname, type: "intern"
        }
    })]
    const fetchUtilsData = () => {
        dispatch(getEmployees({}));
        dispatch(getInterns({}));
    };
    const grantList = [
        {id : "test1",name : "TEST1"},
        {id : "test2",name : "TEST2"},
        {id : "test3",name : "TEST3"}
    ]
    const valuesArticle :any[] =[]
    const handleSubmit = async (values: any) => {
        values.montantTotal = valuesArticle.reduce((acc:any, curr:any) => acc + curr.valeur, 0);
        try {
            const newDataBT = {
                expediteur: values.expediteur,
                destination: values.destination,
                dateExp:values.dateExp,
                expeditionVia: values.expeditionVia,
                departement:values.departement,
                grant: values.grant,
            }
            const response = await dispatch(createBonTransfert(newDataBT));
            valuesArticle.forEach((element:any, index:any) => {
                const newData = {
                    designation: element.designation,
                    quantiteCommander: element.quantiteCommander,
                    quantiteExpedie:element.quantiteExpedie,
                    observation: element.observation,
                    bonTransfertId: response.payload.id
                };
                dispatch(createArticleTransfert(newData));
            });
        
            route.push("/fournitures_et_consommables/bon_commande_intern");
        } catch (error) {
        console.log("error", error);
        }
    };
    return (
        <>
            <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
                <Formik
                    enableReinitialize
                    initialValues={
                        {
                            expediteur:"",
                            destination: "",
                            dateExp: new Date(),
                            expeditionVia: "",
                            departement:"",
                            grant: "",
                            designation: "",
                            quantiteCommander: 0,
                            quantiteExpedie:"",
                            observation: "",
                        }
                    }
                    validationSchema={Yup.object({
                        expediteur: Yup.string().required("Champ obligatoire"),
                        destination: Yup.string().required("Champ obligatoire"),
                        dateExp:Yup.date().required("Champ obligatoire"),
                        expeditionVia:Yup.string().required("Champ obligatoire"),
                        departement:Yup.string().required("Champ obligatoire"),
                        grant: Yup.string().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                    handleSubmit(value);
                    action.resetForm();
                    }}
                >
                    {(formikProps) => {
                        return (
                            <Form>
                                <NavigationContainer>
                                    <SectionNavigation>
                                    <Stack flexDirection={"row"}>
                                        <Link href="/fournitures_et_consommables/bon_transfert">
                                        <Button
                                            color="info"
                                            variant="text"
                                            startIcon={<ArrowBack />}
                                            onClick={() => {
                                            formikProps.resetForm();
                                            dispatch(cancelEdit());
                                            }}
                                        >
                                            Retour
                                        </Button>
                                        </Link>
                                        <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        startIcon={<Check />}
                                        sx={{ marginInline: 3 }}
                                        type="submit"
                                        >
                                        Enregistrer
                                        </Button>
                                        <Button
                                        variant="text"
                                        color="warning"
                                        size="small"
                                        type="reset"
                                        startIcon={<Close />}
                                        onClick={() => {
                                            formikProps.resetForm();
                                            dispatch(cancelEdit());
                                        }}
                                        >
                                        Annuler
                                        </Button>
                                    </Stack>
                                    <Typography variant="h4">
                                        {isEditing ? "Modifier" : "Ajouter"} Bon de transfert
                                    </Typography>
                                    </SectionNavigation>
                                    <Divider />
                                </NavigationContainer>
                                <FormContainer spacing={2}>
                                    <Stack
                                        direction="row"
                                        sx={{
                                            flex: "1 1 100%",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                        >
                                        <Typography variant="h6" id="tableTitle" component="div">
                                            Bon de transfert
                                        </Typography>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        spacing={2}
                                        >
                                        <FormControl fullWidth>
                                            <OSSelectField
                                                id="outlined-basic"
                                                label="Expediteur"
                                                name="expediteur"
                                                options={employees}
                                                dataKey={["name","surname"]}
                                                valueKey="id"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSSelectField
                                                id="outlined-basic"
                                                label="Destination"
                                                name="destination"
                                                options={total}
                                                dataKey={["name"]}
                                                valueKey="id"
                                            />
                                        </FormControl>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        spacing={2}
                                        >
                                        <FormControl fullWidth>
                                            <OSTextField
                                                fullWidth
                                                id="outlined-basic"
                                                variant="outlined"
                                                label="Expedition via"
                                                name="expeditionVia"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSDatePicker
                                                fullWidth
                                                label="Date expedition"
                                                value={formikProps.values.dateExp}
                                                onChange={(value: any) =>
                                                    formikProps.setFieldValue("dateExp", value)
                                                }
                                            />
                                        </FormControl>
                                    </Stack>
                                    <Stack
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        spacing={2}
                                    >
                                        <FormControl fullWidth>
                                            <OSTextField
                                                fullWidth
                                                id="outlined-basic"
                                                variant="outlined"
                                                label="Departement"
                                                name="departement"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSSelectField
                                                id="outlined-basic"
                                                label="Grant"
                                                name="grant"
                                                options={grantList}
                                                dataKey={["name"]}
                                                valueKey="id"
                                            />
                                    </FormControl>
                                    </Stack>
                                </FormContainer>
                                <Box>
                                    <FormContainer spacing={2}>
                                        <Stack
                                            direction="row"
                                            sx={{
                                                flex: "1 1 100%",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                            >
                                            <Typography variant="h6" id="tableTitle" component="div">
                                                Article à commander
                                            </Typography>
                                        </Stack>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Designation</TableCell>
                                                        <TableCell align="left">Quantité commander</TableCell>
                                                        <TableCell align="left">Quantité expedié</TableCell>
                                                        <TableCell align="left">Observation</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {valuesArticle.map((item:any , index:any) => (
                                                        <TableRow
                                                            key={index}
                                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">{item.designation}</TableCell>
                                                            <TableCell align="left">{item.quantiteCommander}</TableCell>
                                                            <TableCell align="left">{item.quantiteExpedie}</TableCell>
                                                            <TableCell align="left">{item.observation}</TableCell>
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
                                                                <IconButton
                                                                        color="warning"
                                                                        aria-label="Supprimer"
                                                                        component="span"
                                                                        size="small"
                                                                        onClick={() => {
                                                                            valuesArticle.splice(index, 1)
                                                                        }}
                                                                    >
                                                                    <Delete />
                                                                </IconButton>
                                                                {/* <EditIcon color="primary" />
                                                                <DeleteIcon color="warning" /> */}
                                                            </Stack>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow
                                                            key="index"
                                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                        >
                                                            <TableCell component="th" scope="row">
                                                                <FormControl fullWidth>
                                                                    <OSTextField
                                                                        id="designation"
                                                                        label="Désignation"
                                                                        name="designation"
                                                                        type="text"
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <FormControl fullWidth>
                                                                    <OSTextField
                                                                        id="quantiteCommander"
                                                                        label="Quantité commander"
                                                                        name="quantiteCommander"
                                                                        type="text"
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <FormControl fullWidth>
                                                                    <OSTextField
                                                                        id="quantiteExpedie"
                                                                        label="Quantité expedié"
                                                                        name="quantiteExpedie"
                                                                        type="number"
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                <FormControl fullWidth>
                                                                    <OSTextField
                                                                        id="observation"
                                                                        label="observation"
                                                                        name="observation"
                                                                        type="text"
                                                                    />
                                                                </FormControl>
                                                            </TableCell>
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
                                                                    <IconButton
                                                                        type="button"
                                                                        onClick={() => {
                                                                            const designation = formikProps.values.designation;
                                                                            const quantiteCommander = formikProps.values.quantiteCommander;
                                                                            const quantiteExpedie = formikProps.values.quantiteExpedie;
                                                                            const observation = formikProps.values.observation;
                                                                                // Vérifier si les champs sont vides
                                                                                if (designation.trim() !== '' && observation.trim() !== '') {
                                                                                valuesArticle.push({
                                                                                    designation: designation,
                                                                                    quantiteCommander: quantiteCommander,
                                                                                    quantiteExpedie: quantiteExpedie,
                                                                                    observation: observation,
                                                                                });
                                                                                formikProps.setFieldValue('designation', '');
                                                                                formikProps.setFieldValue('quantiteCommander', '');
                                                                                formikProps.setFieldValue('quantiteExpedie', '');
                                                                                formikProps.setFieldValue('observation', '');
                                                                            }
                                                                            
                                                                        }}
                                                                    >
                                                                        <Check color="primary"/>
                                                                    </IconButton>
                                                                    <IconButton
                                                                        type="button"
                                                                        onClick={() => {
                                                                            formikProps.setFieldValue('designation', '');
                                                                            formikProps.setFieldValue('quantiteCommander', '');
                                                                            formikProps.setFieldValue('quantiteExpedie', '');
                                                                            formikProps.setFieldValue('observation', '');
                                                                        }}
                                                                        >
                                                                        <Close />
                                                                    </IconButton>
                                                                </Stack>
                                                            </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </FormContainer>
                                </Box>
                            </Form>
                        );
                    }}
                </Formik>
            </Container>
        </>
    );
}

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    borderRadius: 20,
    background: "#fff",
    marginBottom:30,
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    flex: 1,
    width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: "5px",
}));