import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {  Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { styled } from "@mui/material";
import { createFicheDotation, editFicheDotation, updateFicheDotation } from "../../../../redux/features/fiche_dotation/ficheDotationSlice";
import FormFicheDotation from "./FormFicheDotation";

export default function FichDotationForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();
    // const valuesArticle :any[] =[]

    const { id }: any = route.query;
    const { isEditing,ficheDotation } = useAppSelector((state) => state.ficheDotation);

    const handleSubmit = async (values: any) => {
        try {
            const updateData = {
                reference: values.reference,
                date:new Date(values.date),
                region: values.region,
                district: values.district,
                commune: values.commune,
                grant:values.grant,
                ligneBudgetaire: values.ligneBudgetaire,
                fokontany:values.fokontany
            }
            if(isEditing){
                await dispatch(updateFicheDotation({id,updateData}));
            }else{
                await dispatch(createFicheDotation(updateData));
            }
            route.push("/materiels/fiche_dotation");
        } catch (error) {
            console.log("error", error);
        }
    };

    const handleFech = async (id: any) => {
        try { 
            await dispatch(editFicheDotation({ id }));
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (id) {
          handleFech(id)
        }
    }, [id]);

    return (
        <>
            <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
                <Formik
                    enableReinitialize
                    initialValues={
                        {
                            date:isEditing && ficheDotation.date ? new Date(ficheDotation.date):new Date().toISOString(),
                            reference:isEditing ? ficheDotation.reference :"",
                            region:isEditing ? ficheDotation.region : "",
                            district:isEditing ? ficheDotation.district :"",
                            commune: isEditing ? ficheDotation.commune :"",
                            fokontany:isEditing ? ficheDotation.fokontany :"",
                            grant:isEditing ? ficheDotation.grant : "",
                            ligneBudgetaire:isEditing ? ficheDotation.ligneBudgetaire :"",
                        }
                    }
                    validationSchema={Yup.object({
                        reference:Yup.string().required("Champ obligatoire"),
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