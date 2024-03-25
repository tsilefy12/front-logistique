import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import {
  createproduitRecu,
} from "../../../../redux/features/bon_reception/produitRecuSlice";
import { createBonReception } from "../../../../redux/features/bon_reception/bonReceptionSlice";
import FormBonReception from "./FormBonReception";
import { styled } from "@mui/material";

export default function BonCommandeInterneForm() {
    const [valuesArticle, setValuesArticle] = useState < any[]> ([])
    const dispatch = useAppDispatch();
    const route = useRouter();

    const handleSubmit = async (values: any) => {
        try {
            const newDataBCI = {
                bce: values.bce,
                reference: values.reference,
                dateReception: new Date(values.dateReception)
            }
            const response = await dispatch(createBonReception(newDataBCI));
            valuesArticle.forEach((element:any, index:any) => {
                const newData = {
                    designation: element.designation,
                    quantite:element.quantite,
                    bonDeReceptionId: response.payload.id
                };
                dispatch(createproduitRecu(newData));
            });
        
            route.push("/materiels/bon_reception");
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
                            reference:"",
                            dateReception: new Date().toISOString(),
                            designation :"",
                            quantite:0,
                        }
                    }
                    validationSchema={Yup.object({
                        bce: Yup.string().required("Champ obligatoire"),
                        reference: Yup.string().required("Champ obligatoire"),
                        dateReception: Yup.date().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                        handleSubmit(value);
                        action.resetForm();
                    }}
                >
                    {(formikProps) => <FormBonReception formikProps={formikProps} valuesArticle={valuesArticle} setValuesArticle={setValuesArticle} />}
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
