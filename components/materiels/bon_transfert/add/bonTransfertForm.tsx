import React from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {  Formik } from "formik";
import * as Yup from "yup";
import {
  createBonTransfert,
} from "../../../../redux/features/bon_transfert/bonTransfertSlice";
import { createArticleTransfert } from "../../../../redux/features/bon_transfert/articleTransfertSlice";
import FormBonTransfert from "./FormBonTransfert";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { styled } from "@mui/material";

export default function BonTransfertForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();
    const valuesArticle :any[] =[]

    const handleSubmit = async (values: any) => {
        values.montantTotal = valuesArticle.reduce((acc:any, curr:any) => acc + curr.valeur, 0);
        try {
            const newDataBT = {
                expediteur: values.expediteur,
                designation: values.destination,
                dateExp:new Date(values.dateExp),
                expeditionVia: values.expeditionVia,
                departement:values.departement,
                grant: values.grant,
                type:values.type
            }
            const response = await dispatch(createBonTransfert(newDataBT));
            valuesArticle.forEach((element:any, index:any) => {
                const newData = {
                    designation: element.designation,
                    quantiteCommande: element.quantiteCommander,
                    quantiteExpedie:element.quantiteExpedie,
                    observation: element.observation,
                    bonDeTransfertId: response.payload.id,
                };
                dispatch(createArticleTransfert(newData));
            });
        
            route.push("/materiels/bon_transfert");
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
                            expediteur:"",
                            destination: "",
                            dateExp: new Date().toISOString(),
                            expeditionVia: "",
                            departement:"",
                            grant: "",
                            type:"",
                            designation: "",
                            quantiteCommander: 0,
                            quantiteExpedie:0,
                            observation: "",
                        }
                    }
                    validationSchema={Yup.object({
                        expediteur: Yup.string().required("Champ obligatoire"),
                        destination: Yup.string().required("Champ obligatoire"),
                        dateExp:Yup.date().required("Champ obligatoire"),
                        expeditionVia:Yup.string().required("Champ obligatoire"),
                        departement:Yup.string().required("Champ obligatoire"),
                        grant: Yup.string().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                    handleSubmit(value);
                    action.resetForm();
                    }}
                >
                    {(formikProps) => <FormBonTransfert formikProps={formikProps} valuesArticle={valuesArticle} />}
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