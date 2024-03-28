import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {  Formik } from "formik";
import * as Yup from "yup";
import {
  createBonTransfert, editBonTransfert, updateBonTransfert,
} from "../../../../redux/features/bon_transfert/bonTransfertSlice";
import { createArticleTransfert, deleteArticleTransfert, updateArticleTransfert } from "../../../../redux/features/bon_transfert/articleTransfertSlice";
import FormBonTransfert from "./FormBonTransfert";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { styled } from "@mui/material";

export default function BonTransfertForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();
    const { id }: any = route.query;

    const { isEditing, bonTransfert} = useAppSelector((state) => state.bonTransfert);
    const [ idDelete,setIdDelete] = useState < any[]> ([])
    
    const [valuesArticle, setValuesArticle] = useState < any[]> ([])

    const handleSubmit = async (values: any) => {
        try {
            const updateData = {
                reference:values.reference,
                expediteur: values.expediteur,
                designation: values.destination,
                dateExp:new Date(values.dateExp),
                expeditionVia: values.expeditionVia,
                programme:values.programme,
                grant: values.grant,
                type:values.type
            }
            if(isEditing){
                const response = await dispatch(updateBonTransfert({id,updateData}));
                valuesArticle?.forEach((element:any, index:any) => {
                    const id = element.id
                    if(id){
                        const updateData = {
                            designation: element.designation,
                            quantiteCommande: element.quantiteCommande,
                            quantiteExpedie:element.quantiteExpedie,
                            observation: element.observation,
                            bonDeTransfertId: response.payload.id,
                        };
                        dispatch(updateArticleTransfert({id,updateData}));
                    }else{
                        const newData = {
                            designation: element.designation,
                            quantiteCommande: element.quantiteCommande,
                            quantiteExpedie:element.quantiteExpedie,
                            observation: element.observation,
                            bonDeTransfertId: response.payload.id,
                        };
                        dispatch(createArticleTransfert(newData));
                    }
                });
                idDelete?.forEach((element:any, index:any) =>{
                    const id = element.id
                    dispatch(deleteArticleTransfert({id}));
                })
            }else{
                const response = await dispatch(createBonTransfert(updateData));
                valuesArticle.forEach((element:any, index:any) => {
                    const newData = {
                        designation: element.designation,
                        quantiteCommande: element.quantiteCommande,
                        quantiteExpedie:element.quantiteExpedie,
                        observation: element.observation,
                        bonDeTransfertId: response.payload.id,
                    };
                    dispatch(createArticleTransfert(newData));
                });
            }
            route.push("/materiels/bon_transfert");
        } catch (error) {
        console.log("error", error);
        }
    };

    const handleFech = async (id: any) => {
        try { 
            const Val = await dispatch(editBonTransfert({ id , args:{
                include:{
                    articleTransfert:true
                }
            }}));
            console.log(Val)
            setValuesArticle((prev:any[])=>{
                console.log(prev)
                prev = Val.payload.articleTransfert
                return prev
            })
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
                    initialValues={
                        {
                            reference: isEditing && bonTransfert ? bonTransfert.reference:"",
                            expediteur:isEditing && bonTransfert ? bonTransfert.expediteur:"",
                            destination:isEditing && bonTransfert ? bonTransfert.designation: "",
                            dateExp:isEditing && bonTransfert.dateExp ? new Date(bonTransfert.dateExp).toISOString(): new Date().toISOString(),
                            expeditionVia: isEditing && bonTransfert ? bonTransfert.expeditionVia:"",
                            programme:isEditing && bonTransfert ? bonTransfert.programme:"",
                            grant:isEditing && bonTransfert ? bonTransfert.grant: "",
                            type:isEditing && bonTransfert ? bonTransfert.type:"",
                            designation: "",
                            quantiteCommande: 0,
                            quantiteExpedie:0,
                            observation: "",
                        }
                    }
                    validationSchema={Yup.object({
                        reference:Yup.string().required("Champ obligatoire"),
                        expediteur: Yup.string().required("Champ obligatoire"),
                        destination: Yup.string().required("Champ obligatoire"),
                        dateExp:Yup.date().required("Champ obligatoire"),
                        expeditionVia:Yup.string().required("Champ obligatoire"),
                        programme:Yup.string().required("Champ obligatoire"),
                        grant: Yup.string().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                        handleSubmit(value);
                        action.resetForm();
                    }}
                >
                    {(formikProps) => <FormBonTransfert setIdDelete={setIdDelete} formikProps={formikProps} valuesArticle={valuesArticle} setValuesArticle={setValuesArticle}/>}
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