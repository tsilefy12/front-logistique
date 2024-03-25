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
import { createArticleCommandeInterne } from "../../../../redux/features/bon_commande_interne/articleCommandeSlice";
import FormBCI from "./FormBCI";

export default function BonCommandeInterneForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();
    const valuesArticle :any[] =[]

    const { isEditing,bonCommandeInterne } = useAppSelector((state) => state.bonCommandeInterne);
    const handleSubmit = async (values: any) => {
        values.montantTotal = valuesArticle.reduce((acc:any, curr:any) => acc + curr.valeur, 0);
        try {
            const newDataBCI = {
                programme: values.programme,
                grant: values.grant,
                ligneBudgetaire: values.ligneBudgetaire,
                demandeur: values.demandeur,
                numBon: values.numBon,
                type:values.type,
                dateBonCommande: new Date(values.dateBonCommande),
                numBonCommande: values.numBonCommande,
                montantTotal : valuesArticle.reduce((acc:any, curr:any) => acc + curr.valeur, 0)
            }
            const response = await dispatch(createBonCommandeInterne(newDataBCI));
            valuesArticle.forEach((element:any, index:any) => {
                const newData = {
                    designation: element.designation,
                    caracteristik: element.caracteristique,
                    quantite: element.quantite,
                    fournisseur:element.fournisseur,
                    pu: element.pu,
                    valueArticle: element.valeur,
                    bondeCommandeInterneId: response.payload.id
                };
                dispatch(createArticleCommandeInterne(newData));
            });
        
            route.push("/materiels/bon_commande_interne");
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
                            dateBonCommande: new Date().toISOString(),
                            numBonCommande: "",
                            designation :"",
                            caracteristique:"",
                            pu:0,
                            type:"",
                            fournisseur:"",
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
                    {(formikProps) => <FormBCI formikProps={formikProps} valuesArticle={valuesArticle} />}
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

