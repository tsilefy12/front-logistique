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
  createBonCommandeExterne,
} from "../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";
import { CheckBox, Delete } from "@mui/icons-material";
import { createArticleCommandeExterne } from "../../../../redux/features/bon_commande_externe/articleBCESlice";
import { getBonCommandeInternes } from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";
import { getFournisseurList } from "../../../../redux/features/fournisseur";

export default function BonCommandeExterneForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();

    const { isEditing } = useAppSelector((state) => state.bonCommendeExterne)
    const { bonCommandeInternes } = useAppSelector((state) => state.bonCommandeInterne);
    const { fournisseurList } = useAppSelector( (state) => state.fournisseur);

    const fetchUtilsData = () => {
        dispatch(getBonCommandeInternes({}));
        dispatch(getFournisseurList({}));
    };
    
    useEffect(() => {
        fetchUtilsData();
    }, []);
    const valuesArticle :any = []
    

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
            const newDataBCE = {
                ref: values.ref,
                dateCommande: values.dateCommande,
                fournisseur: values.fournisseur,
                bci: values.bci,
                modePaiement: values.modePaiement,
                conditionLivraison: values.conditionLivraison,
                dateLivraison: values.dateLivraison,
            }
            
            const response = await dispatch(createBonCommandeExterne(newDataBCE));
            console.log(valuesArticle)
            valuesArticle.forEach((element:any, index:any) => {
                const newData = {
                    designation: element.designation,
                    caracteristik: element.caracteristique,
                    quantite:element.quantite,
                    pu: element.pu,
                    valueArticle: element.valeur,
                    bonDeCommandeExterneId: response.payload.id
                };
                dispatch(createArticleCommandeExterne(newData));
            });
        }
            route.push("/materiels/bon_commande_externe/");
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <>
            <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
                <Formik
                    enableReinitialize
                    initialValues={{
                        ref: "",
                        dateCommande: new Date(),
                        fournisseur: "",
                        bci: "",
                        modePaiement: "",
                        conditionLivraison: "",
                        dateLivraison: new Date(),
                        designation :"",
                        caracteristique:"",
                        pu:0,
                        quantite:0,
                    }}
                    validationSchema={Yup.object({
                        ref: Yup.string().required("Champ obligatoire"),
                        bci: Yup.string().required("Champ obligatoire"),
                        fournisseur: Yup.string().required("Champ obligatoire"),
                        modePaiement : Yup.string().required("Champ obligatoire"),
                        dateCommande : Yup.date().required("Champ obligatoire"),
                        conditionLivraison: Yup.string().required("Champ obligatoire"),
                        dateLivraison: Yup.date().required("Champ obligatoire"),
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
                                        <Link href="/materiels/bon_commande_externe">
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
                                        {isEditing ? "Modifier" : "Ajouter"} Bon de commande Externe
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
                                            Bon de commande externe
                                        </Typography>
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
                                                label="Réference"
                                                name="ref"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSSelectField
                                                id="outlined-basic"
                                                label="BCI"
                                                name="bci"
                                                options={bonCommandeInternes}
                                                dataKey="numBon"
                                                valueKey="id"
                                                type="text"
                                            />
                                        </FormControl>
                                    </Stack>
                                    <OSSelectField
                                        id="outlined-basic"
                                        label="Fournisseur"
                                        name="fournisseur"
                                        options={fournisseurList}
                                        dataKey={["name"]}
                                        valueKey="id"
                                        type="text"
                                    />
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
                                                label="Mode de paiement"
                                                name="modePaiement"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSDatePicker
                                                fullWidth
                                                id="outlined-basic"
                                                variant="outlined"
                                                label="Date de commande"
                                                onChange={(value: any) =>
                                                    formikProps.setFieldValue("dateCommande", value)
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
                                                label="Condition de livraison"
                                                name="conditionLivraison"
                                                type="text"
                                            />
                                        </FormControl>
                                        <FormControl fullWidth>
                                            <OSDatePicker
                                                fullWidth
                                                label="Date de livraison"
                                                // value={formikProps.values.dateLivraison}
                                                onChange={(value: any) =>
                                                    formikProps.setFieldValue("dateLivraison", value)
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
                                                    Article à Commander
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
                                                                <TableCell align="left">{item.pu}Ar</TableCell>
                                                                <TableCell align="left">{item.quantite} </TableCell>
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
                                                                        />
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <FormControl fullWidth>
                                                                        <OSTextField
                                                                            id="c"
                                                                            label="Caractéristique"
                                                                            name="caracteristique"
                                                                        />
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell align="left">
                                                                    <FormControl fullWidth>
                                                                        <OSTextField
                                                                            id="designation"
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
                                                                                    formikProps.setFieldValue('quantite', '')
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