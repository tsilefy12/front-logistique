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
  createproduitRecu,
} from "../../../../redux/features/bon_reception/produitRecuSlice";
import { Delete } from "@mui/icons-material";
import { createBonReception } from "../../../../redux/features/bon_reception/bonReceptionSlice";

export default function BonCommandeInterneForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();

    const { isEditing,bonReception } = useAppSelector((state) => state.bonReceptions);
    const valuesArticle :any[] =[]
    const handleSubmit = async (values: any) => {
        try {
            const newDataBCI = {
                bce: values.bce,
                dateReception: values.dateReception,
            }
            const response = await dispatch(createBonReception(newDataBCI));
            valuesArticle.forEach((element:any, index:any) => {
                const newData = {
                    designation: element.designation,
                    quantite:element.quantite,
                    bonReceptionId: response.payload.id
                };
                dispatch(createproduitRecu(newData));
            });
        
            route.push("/fournitures_et_consommables/bon_reception");
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
                            bce: "",
                            dateReception: new Date(),
                            designation :"",
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
                                        <Link href="/fournitures_et_consommables/bon_reception">
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
                                        {isEditing ? "Modifier" : "Ajouter"} Bon de reception
                                    </Typography>
                                    </SectionNavigation>
                                    <Divider />
                                </NavigationContainer>
                                <FormContainer spacing={2}>
                                    <FormControl fullWidth>
                                        <OSTextField
                                            id="programme"
                                            label="bce"
                                            name="programme"
                                        />
                                    </FormControl>
                                    <FormControl fullWidth>
                                    <OSDatePicker
                                        fullWidth
                                        label="Date bon de reception"
                                        value={formikProps.values.dateReception}
                                        onChange={(value: any) =>
                                            formikProps.setFieldValue("dateBonCommande", value)
                                        }
                                    />
                                    </FormControl>
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
                                                    Article
                                                </Typography>
                                            </Stack>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Designation</TableCell>
                                                            <TableCell align="left">Quantité</TableCell>
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
                                                                <TableCell align="left">{item.quantite}</TableCell>
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
                                                                        <Button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                const designation = formikProps.values.designation;
                                                                                const quantite = formikProps.values.quantite;
                                                                                 // Vérifier si les champs sont vides
                                                                                 if (designation.trim() !== '') {
                                                                                    valuesArticle.push({
                                                                                        designation: designation,
                                                                                        quantite: quantite
                                                                                    });
                                                                                    formikProps.setFieldValue('designation', '')
                                                                                    formikProps.setFieldValue('quantite', '');
                                                                                }
                                                                               
                                                                            }}
                                                                        >
                                                                            Ajouter au tableau
                                                                        </Button>
                                                                        {/* <EditIcon color="primary" />
                                                                        <DeleteIcon color="warning" /> */}
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