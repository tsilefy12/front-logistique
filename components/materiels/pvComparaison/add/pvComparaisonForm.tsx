import React, { useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";

import { createPvComparaison } from "../../../../redux/features/pvComparaison/pvComparaisonSlice";
import { createPvComparaisonFournisseur } from "../../../../redux/features/pvComparaison/pvComparaisonFournisseurSlice";
import FormPv from "./FormPv";
import { styled } from "@mui/material";

export default function PvComparaisonForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();

    const [valuesArticle, setValuesArticle] = useState < any[]> ([])
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
                    bce: values.type ==="BCE" ? values.ref : null,
                    bci: values.type ==="BCI" ? values.ref : null,
                    programme: values.programme,
                    grant: values.grant,
                    ligneBudgetaire: values.ligneBudgetaire,
                    materiel: values.materiel,
                    offreRetenu: values.offreRetenu,
                    argument: values.argument,
                    motif: values.motif
                }
                const response = await dispatch(createPvComparaison(newDataPV));
                if(valuesArticle.length > 0 ){
                    valuesArticle.forEach((element:any, index:any) => {
                        const newData = {
                            fournisseur: element.fournisseur,
                            modePaie: element.modePaie,
                            designation: element.designation,
                            pvComparaisonOffreId: response.payload.id
                        };
                        dispatch(createPvComparaisonFournisseur(newData));
                    });
                }
            }
            route.push("/materiels/pv_comparaison");
        } catch (error) {
        console.log("error", error);
        }
    };
    return (
        <>
            <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
                <Formik
                    enableReinitialize = { isEditing ? true :false }
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
                            fileRequired:"",
                            designation:"",
                        }
                    }
                    validationSchema={Yup.object({
                        objet:Yup.string().required("Champ obligatoire"),
                        ref:Yup.string().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                        handleSubmit(value);
                            action.resetForm();
                        }
                    }
                >
                    {(formikProps) => <FormPv formikProps={formikProps} valuesArticle={valuesArticle} setValuesArticle={setValuesArticle}/>}
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
