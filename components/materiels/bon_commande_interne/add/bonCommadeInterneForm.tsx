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
  createBonCommandeInterne,
} from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";
import { Delete } from "@mui/icons-material";
import { createArticleCommandeInterne } from "../../../../redux/features/bon_commande_interne/articleCommandeSlice";
import { getEmployees } from "../../../../redux/features/employeStagiaire/employeeSlice";

export default function BonCommandeInterneForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();

    const { isEditing,bonCommandeInterne } = useAppSelector((state) => state.bonCommandeInterne);
    const valuesArticle :any[] =[]
    const { employees } = useAppSelector( (state) => state.employe);
   
    const ligneBudgetaireList = [
        {id : "test1",name : "TEST1"},
        {id : "test2",name : "TEST2"},
        {id : "test3",name : "TEST3"}
    ]
    const grantList = [
        {id : "test1",name : "TEST1"},
        {id : "test2",name : "TEST2"},
        {id : "test3",name : "TEST3"}
    ]
    const programmeList = [
        {id : "test1",name : "TEST1"},
        {id : "test2",name : "TEST2"},
        {id : "test3",name : "TEST3"}
    ]
    
    const fetchUtilsData = () => {
        dispatch(getEmployees({}));
    };
    
    useEffect(() => {
        fetchUtilsData();
    }, []);
    const handleSubmit = async (values: any) => {
        values.montantTotal = valuesArticle.reduce((acc:any, curr:any) => acc + curr.valeur, 0);
        try {
            const newDataBCI = {
                programme: values.programme,
                grant: values.grant,
                ligneBudgetaire: values.ligneBudgetaire,
                demandeur: values.demandeur,
                numBon: values.numBon,
                dateBonCommande: values.dateBonCommande,
                numBonCommande: values.numBonCommande,
                montantTotal : valuesArticle.reduce((acc:any, curr:any) => acc + curr.valeur, 0)
            }
            const response = await dispatch(createBonCommandeInterne(newDataBCI));
            valuesArticle.forEach((element:any, index:any) => {
                const newData = {
                    designation: element.designation,
                    caracteristik: element.caracteristique,
                    quantite:element.quantite,
                    pu: element.pu,
                    valueArticle: element.valeur,
                    bondeCommandeInterneId: response.payload.id
                };
                dispatch(createArticleCommandeInterne(newData));
            });
        
            route.push("/materiels/bon_commande_intern");
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
                            programme: "",
                            grant: "",
                            ligneBudgetaire: "",
                            demandeur: "",
                            numBon: "",
                            dateBonCommande: new Date(),
                            numBonCommande: "",
                            designation :"",
                            caracteristique:"",
                            pu:0,
                            quantite:0,
                        }
                    }
                    validationSchema={Yup.object({
                        programme: Yup.string().required("Champ obligatoire"),
                        grant: Yup.string().required("Champ obligatoire"),
                        ligneBudgetaire: Yup.string().required("Champ obligatoire"),
                        demandeur: Yup.string().required("Champ obligatoire"),
                        numBon: Yup.string().required("Champ obligatoire"),
                        dateBonCommande: Yup.date().required("Champ obligatoire"),
                        numBonCommande:Yup.string().required("Champ obligatoire"),
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
                                        <Link href="/materiels/bon_commande_intern">
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
                                        {isEditing ? "Modifier" : "Ajouter"} Bon de commande interne
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
                                            Bon de commande interne
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
                                                label="Programme/Projet"
                                                name="programme"
                                                options={programmeList.length > 0 ? programmeList :  [{ id: "", name: "Rien à aficher" }]}
                                                dataKey="name"
                                                valueKey="id"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSSelectField
                                                id="outlined-basic"
                                                label="Grant"
                                                name="grant"
                                                options={grantList.length > 0 ? grantList :  [{ id: "", name: "Rien à aficher" }]}
                                                dataKey="name"
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
                                                label="N° bon commende interne"
                                                name="numBon"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSTextField
                                                fullWidth
                                                id="outlined-basic"
                                                variant="outlined"
                                                label="N° Bon Commande"
                                                name="numBonCommande"
                                            />
                                        </FormControl>
                                    </Stack>
                                    <FormControl fullWidth>
                                        <OSSelectField
                                            id="outlined-basic"
                                            label="Demandeur"
                                            name="demandeur"
                                            options={employees}
                                            dataKey={["name","surname"]}
                                            valueKey="id"
                                        />
                                    </FormControl>
                                    <Stack
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    spacing={2}
                                    >
                                        <FormControl fullWidth>
                                            <OSSelectField
                                                id="outlined-basic"
                                                label="Ligne budgétaire"
                                                name="ligneBudgetaire"
                                                options={ligneBudgetaireList.length > 0 ? ligneBudgetaireList :  [{ id: "", name: "Rien à aficher" }]}
                                                dataKey="name"
                                                valueKey="id"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSDatePicker
                                                fullWidth
                                                label="Date bon de commande interne"
                                                value={formikProps.values.dateBonCommande}
                                                onChange={(value: any) =>
                                                    formikProps.setFieldValue("dateBonCommande", value)
                                                }
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
                                                            <TableCell align="left">Caractéristique</TableCell>
                                                            <TableCell align="left">PU</TableCell>
                                                            <TableCell align="left">Quantité</TableCell>
                                                            <TableCell align="left">Valeur</TableCell>
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
                                                                <TableCell align="left">{item.caracteristique}</TableCell>
                                                                <TableCell align="left">{item.pu}  Ar</TableCell>
                                                                <TableCell align="left">{item.quantite}</TableCell>
                                                                <TableCell align="left">{item.valeur} Ar</TableCell>
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
                                                                            id="caracteristique"
                                                                            label="Caractéristique"
                                                                            name="caracteristique"
                                                                            type="text"
                                                                        />
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <FormControl fullWidth>
                                                                        <OSTextField
                                                                            id="pu"
                                                                            label="PU"
                                                                            name="pu"
                                                                            type="number"
                                                                        />
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <FormControl fullWidth>
                                                                        <OSTextField
                                                                            id="designation"
                                                                            label="Quantité"
                                                                            name="quantite"
                                                                            type="number"
                                                                        />
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <FormControl fullWidth>
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
                                                                                const caracteristique = formikProps.values.caracteristique;
                                                                                const pu = formikProps.values.pu;
                                                                                const quantite = formikProps.values.quantite;
                                                                                 // Vérifier si les champs sont vides
                                                                                 if (designation.trim() !== '' && caracteristique.trim() !== '') {
                                                                                    valuesArticle.push({
                                                                                        designation: designation,
                                                                                        caracteristique: caracteristique,
                                                                                        pu: pu,
                                                                                        quantite: quantite,
                                                                                        valeur: quantite * pu,
                                                                                    });
                                                                                    formikProps.setFieldValue('designation', '');
                                                                                    formikProps.setFieldValue('caracteristique', '');
                                                                                    formikProps.setFieldValue('pu', '');
                                                                                    formikProps.setFieldValue('quantite', '');
                                                                                }
                                                                               
                                                                            }}
                                                                        >
                                                                            <Check color="primary"/>
                                                                        </IconButton>
                                                                        <IconButton
                                                                            type="button"
                                                                            onClick={() => {
                                                                                formikProps.setFieldValue('designation', '');
                                                                                formikProps.setFieldValue('caracteristique', '');
                                                                                formikProps.setFieldValue('pu', '');
                                                                                formikProps.setFieldValue('quantite', '');
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