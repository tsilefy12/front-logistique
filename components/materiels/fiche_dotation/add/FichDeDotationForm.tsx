import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {  Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { styled } from "@mui/material";
import { createFicheDotation } from "../../../../redux/features/fiche_dotation/ficheDotationSlice";
import FormFicheDotation from "./FormFicheDotation";

export default function FichDotationForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();
    // const valuesArticle :any[] =[]

    const handleSubmit = async (values: any) => {
        try {
            const newDataBT = {
                date:new Date(values.date),
                region: values.region,
                district: values.district,
                commune: values.commune,
                grant:values.grant,
                ligneBudgetaire: values.ligneBudgetaire,
                fokontany:values.fokontany
            }
            await dispatch(createFicheDotation(newDataBT));
            route.push("/materiels/fiche_dotation");
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
                            date:new Date().toISOString(),
                            region: "",
                            district:"",
                            commune: "",
                            fokontany:"",
                            grant: "",
                            ligneBudgetaire:"",
                        }
                    }
                    validationSchema={Yup.object({
                        region: Yup.string().required("Champ obligatoire"),
                        district: Yup.string().required("Champ obligatoire"),
                        date:Yup.date().required("Champ obligatoire"),
                        commune:Yup.string().required("Champ obligatoire"),
                        fokontany:Yup.string().required("Champ obligatoire"),
                        grant: Yup.string().required("Champ obligatoire"),
                        ligneBudgetaire: Yup.string().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                        handleSubmit(value);
                        action.resetForm();
                    }}
                >
                    {(formikProps) => <FormFicheDotation formikProps={formikProps}/>}
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