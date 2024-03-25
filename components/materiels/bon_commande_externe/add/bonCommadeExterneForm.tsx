import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {  Formik } from "formik";

import * as Yup from "yup";

import {
  createBonCommandeExterne,
} from "../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";
import { createArticleCommandeExterne } from "../../../../redux/features/bon_commande_externe/articleBCESlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import FormBCE from "./FormBCE";
import { styled } from "@mui/material";
import { createFile } from "../../../../redux/features/file/fileSlice";

export default function BonCommandeExterneForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();
    
    const valuesArticle:any = []

    const { isEditing } = useAppSelector((state) => state.bonCommendeExterne)
    
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
            if (values.pieceJointe && values.pieceJointe.name !== null) {
            const formData = new FormData();
            formData.append("file", values.pieceJointe);
            const { images } = await dispatch(createFile(formData)).unwrap();
            values.pieceJointe = images[0].url;
        }
        const newDataBCE = {
            ref: values.ref,
            dateCommande: new Date(values.dateCommande),
            fournisseur: values.fournisseur,
            bci: values.bci,
            demandeur:values.demandeur,
            type:values.type,
            modePaiement: values.modePaiement,
            conditionLivraison: values.conditionLivraison,
            pieceJointe: values.pieceJointe,
        }

        const response = await dispatch(createBonCommandeExterne(newDataBCE));
            valuesArticle.forEach((element:any, index:any) => {
                const newData = {
                    designation: element.designation,
                    caracteristik: element.caracteristique,
                    quantite: element.quantite,
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
                        dateCommande: new Date().toISOString(),
                        fournisseur: "",
                        bci: "",
                        demandeur:"",
                        modePaiement: "",
                        conditionLivraison: "",
                        pieceJointe:"",
                        type:"",
                        designation :"",
                        caracteristique:"",
                        pu:0,
                        quantite:0
                    }}
                    validationSchema={Yup.object({
                        ref: Yup.string().required("Champ obligatoire"),
                        bci: Yup.string().required("Champ obligatoire"),
                        fournisseur: Yup.string().required("Champ obligatoire"),
                        modePaiement : Yup.string().required("Champ obligatoire"),
                        dateCommande : Yup.date().required("Champ obligatoire"),
                        demandeur: Yup.string().required("Champ obligatoire"),
                        conditionLivraison: Yup.string().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                        handleSubmit(value);
                        action.resetForm();
                    }}
                >
                    {(formikProps) => <FormBCE formikProps={formikProps} valuesArticle={valuesArticle} />}
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

