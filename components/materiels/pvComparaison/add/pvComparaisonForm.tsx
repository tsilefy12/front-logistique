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
import { cancelEdit } from "../../../../redux/features/vendor/vendorSlice";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import { createPvComparaison } from "../../../../redux/features/pvComparaison/pvComparaisonSlice";
import { createPvComparaisonFournisseur } from "../../../../redux/features/pvComparaison/pvComparaisonFournisseurSlice";

export default function PvComparaisonForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();

    const { isEditing,pvComparaison } = useAppSelector((state) => state.pvComparaison);
    const { pvComparaisonFournisseur } = useAppSelector((state) => state.pvComparaisonFournisseurs);
    const handleSubmit = async (values: any) => {
        try {
            if (isEditing) {
                // await dispatch(
                //   updateConsumable({
                //     id: consumable.id!,
                //     consumable: values,
                //   })
                // );
            } else {
                const newDataPV = {
                    objet: values.objet,
                    ref: values.ref,
                    programme: values.programme,
                    grant: values.grant,
                    ligneBudgetaire: values.ligneBudgetaire,
                    materiel: values.materiel,
                    offreRetenu: values.offreRetenu,
                    justification: values.justification,
                    argument: values.argument
                }
                const response = await dispatch(createPvComparaison(newDataPV));
                valuesArticle.forEach((element:any, index:any) => {
                    const newData = {
                        fournisseur: element.fournisseur,
                        modePaie: element.modePaie,
                        offre: element.offre,
                        designation: element.designation,
                        pvComparaisonOffreId: response.payload.id
                    };
                    dispatch(createPvComparaisonFournisseur(newData));
                });
            }
            route.push("/materiels/pv_comparaison");
        } catch (error) {
        console.log("error", error);
        }
    };
    const valuesArticle: any= []
    return (
        <>
            <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
                <Formik
                    enableReinitialize
                    initialValues={
                        {
                            objet:"",
                            ref: "",
                            programme: "",
                            grant: "",
                            ligneBudgetaire: "",
                            materiel:"",
                            offreRetenu: "",
                            justification: "",
                            argument: "",
                            fournisseur:"",
                            modePaie:"",
                            offre:"",
                            designation:"",
                        }
                    }
                    validationSchema={Yup.object({
                        objet:Yup.string().required("Champ obligatoire"),
                        ref:Yup.string().required("Champ obligatoire"),
                        programme:Yup.string().required("Champ obligatoire"),
                        grant:Yup.string().required("Champ obligatoire"),
                        ligneBudgetaire:Yup.string().required("Champ obligatoire"),
                        materiel:Yup.string().required("Champ obligatoire"),
                        offreRetenu:Yup.string().required("Champ obligatoire"),
                        justification:Yup.string().required("Champ obligatoire"),
                        argument:Yup.string().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                        handleSubmit(value);
                        action.resetForm();
                        }
                    }
                >
                    {(formikProps) => {
                        return (
                            <Form>
                                <NavigationContainer>
                                    <SectionNavigation>
                                    <Stack flexDirection={"row"}>
                                        <Link href="/materiels/pv_comparaison">
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
                                        {isEditing ? "Modifier" : "Ajouter"} Pv de Comparaison Offre
                                    </Typography>
                                    </SectionNavigation>
                                    <Divider />
                                </NavigationContainer>
                                <FormContainer spacing={2}>
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
                                                label="Objet"
                                                name="objet"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSTextField
                                                fullWidth
                                                id="outlined-basic"
                                                variant="outlined"
                                                label="Ref BCI/BCE"
                                                name="ref"
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
                                                label="Programme/Projet"
                                                name="programme"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSTextField
                                                fullWidth
                                                id="outlined-basic"
                                                variant="outlined"
                                                label="Grant"
                                                name="grant"
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
                                                label="Ligne Budgétaire"
                                                name="ligneBudgetaire"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSTextField
                                                fullWidth
                                                id="outlined-basic"
                                                variant="outlined"
                                                label="Matériel"
                                                name="materiel"
                                                type="number"
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
                                                    Comparaison
                                                </Typography>
                                            </Stack>
                                            <TableContainer component={Paper}>
                                                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Fournisseur</TableCell>
                                                            <TableCell align="left">Mode de Paie</TableCell>
                                                            <TableCell align="left">Offres</TableCell>
                                                            <TableCell align="left">Désignation</TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {valuesArticle.map((element:any, index:any) => (
                                                            <TableRow
                                                                key={index}
                                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                            >
                                                                <TableCell component="th" scope="row">{element.fournisseur}</TableCell>
                                                                <TableCell align="left">{element.modePaie}</TableCell>
                                                                <TableCell align="left">{element.offre}</TableCell>
                                                                <TableCell align="left">{element.designation} Ar</TableCell>

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
                                                                                valuesArticle.remove(index)
                                                                            }}
                                                                        >
                                                                        <Delete />
                                                                    </IconButton>
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
                                                                            id=""
                                                                            label="Fournisseur"
                                                                            name="fournisseur"
                                                                        />
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <FormControl fullWidth>
                                                                        <OSTextField
                                                                            id="designation"
                                                                            label="Mode de paie"
                                                                            name="modePaie"
                                                                        />
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <FormControl fullWidth>
                                                                        <OSTextField
                                                                            id="designation"
                                                                            label="Offres"
                                                                            name="offre"
                                                                        />
                                                                    </FormControl>
                                                                    </TableCell>
                                                                <TableCell align="left">
                                                                <FormControl fullWidth>
                                                                    <OSTextField
                                                                        id="designation"
                                                                        label="Designation"
                                                                        name="designation"
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
                                                                        <Button
                                                                            type="button"
                                                                            onClick={() => {
                                                                                const fournisseur = formikProps.values.fournisseur;
                                                                                const offre = formikProps.values.offre;
                                                                                const modePaie = formikProps.values.modePaie;
                                                                                const designation = formikProps.values.designation;
                                                                                 // Vérifier si les champs sont vides
                                                                                 if (fournisseur.trim() !== '' && offre.trim() !== '' && modePaie.trim() !== '' && designation.trim() !== '') {
                                                                                    valuesArticle.push({
                                                                                        fournisseur: fournisseur,
                                                                                        offre: offre,
                                                                                        modePaie: modePaie,
                                                                                        designation: designation,
                                                                                    });
                                                                                    formikProps.setFieldValue('fournisseur', '');
                                                                                    formikProps.setFieldValue('offre', '');
                                                                                    formikProps.setFieldValue('modePaie', '');
                                                                                    formikProps.setFieldValue('designation', '');
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
                                <Box>
                                    <FormContainer spacing={2}>
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
                                                label="Offres Retenu"
                                                name="offreRetenu"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                        <OSTextField
                                            fullWidth
                                            id="outlined-basic"
                                            variant="outlined"
                                            label="Argument"
                                            name="argument"
                                            type="text"
                                            />
                                        </FormControl>
                                        </Stack>
                                        <OSTextField
                                            fullWidth
                                            id="outlined-basic"
                                            variant="outlined"
                                            label="Justification"
                                            name="justification"
                                            type="text"
                                        />
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