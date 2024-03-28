import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import {
  createBonCommandeInterne, editBonCommandeInterne,cancelEdit, updateBonCommandeInterne
} from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";
import { createArticleCommandeInterne, deleteArticleCommandeInterne, updateArticleCommande } from "../../../../redux/features/bon_commande_interne/articleCommandeSlice";
import FormBCI from "./FormBCI";
import { styled } from "@mui/material";

export default function BonCommandeInterneForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();
    const { id }: any = route.query;


    const [valuesArticle, setValuesArticle] = useState < any[]> ([])
    const [ idDelete,setIdDelete] = useState < any[]> ([])

    const { isEditing,bonCommandeInterne } = useAppSelector((state) => state.bonCommandeInterne);

    const handleSubmit = async (values: any) => {
        values.montantTotal = valuesArticle.reduce((acc:any, curr:any) => acc + curr.valueArticle, 0);
        try {
            const updateData = {
                programme: values.programme,
                reference:values.reference,
                grant: values.grant,
                ligneBudgetaire: values.ligneBudgetaire,
                demandeur: values.demandeur,
                observation: values.observation,
                type:values.type,
                dateBonCommande: new Date(values.dateBonCommande),
                numBonCommande: values.numBonCommande,
                montantTotal : valuesArticle.reduce((acc:any, curr:any) => acc + curr.valueArticle, 0)
            }

            if(isEditing){
                const response = await dispatch(updateBonCommandeInterne({id,updateData}));
                valuesArticle?.forEach((element:any, index:any) => {
                    const id = element.id
                    const updateData = {
                        designation: element.designation,
                        caracteristik: element.caracteristik,
                        quantite: element.quantite,
                        fournisseurId:element.fournisseurId,
                        pu: element.pu,
                        valueArticle: element.valueArticle,
                        bondeCommandeInterneId: response.payload.id
                    };
                    if(id){
                        dispatch(updateArticleCommande({id,updateData}));
                    }else{
                        dispatch(createArticleCommandeInterne(updateData));
                    }
                });
                idDelete?.forEach((element:any, index:any) =>{
                    const id = element.id
                    dispatch(deleteArticleCommandeInterne({id}));
                })
            }else{
                const response = await dispatch(createBonCommandeInterne(updateData));
                valuesArticle.forEach((element:any, index:any) => {
                    const newData = {
                        designation: element.designation,
                        caracteristik: element.caracteristik,
                        quantite: element.quantite,
                        fournisseurId:element.fournisseurId,
                        pu: element.pu,
                        valueArticle: element.valueArticle,
                        bondeCommandeInterneId: response.payload.id
                    };
                    dispatch(createArticleCommandeInterne(newData));
                });
            }
            route.push("/materiels/bon_commande_interne");
        } catch (error) {
        console.log("error", error);
        }
    };

    const handleFech = async (id: any) => {
        try { 
            const Val = await dispatch(editBonCommandeInterne({ id , args:{
                include:{
                    ArticleCommande:true
                }
            }}));
            console.log(Val)
            setValuesArticle((prev:any[])=>{
                console.log(prev)
                prev = Val.payload.ArticleCommande
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
                            programme: isEditing ? bonCommandeInterne.programme: "",
                            grant: isEditing ? bonCommandeInterne.grant: "",
                            ligneBudgetaire: isEditing ? bonCommandeInterne.ligneBudgetaire: "",
                            demandeur: isEditing ? bonCommandeInterne.demandeur: "",
                            observation:isEditing ? bonCommandeInterne.observation :"",
                            reference: isEditing ? bonCommandeInterne.reference:"",
                            dateBonCommande: isEditing && bonCommandeInterne?.dateBonCommande ? new Date(bonCommandeInterne?.dateBonCommande).toISOString() : new Date().toISOString(),
                            numBonCommande: isEditing ? bonCommandeInterne.numBonCommande :"",
                            type:isEditing ? bonCommandeInterne.type :"",
                            designation :"",
                            caracteristik:"",
                            pu:0,
                            fournisseurId:"",
                            quantite:0,
                        }
                    }
                    validationSchema={Yup.object({
                        reference:Yup.string().required("Champ obligatoire"),
                        programme: Yup.string().required("Champ obligatoire"),
                        grant: Yup.string().required("Champ obligatoire"),
                        ligneBudgetaire: Yup.string().required("Champ obligatoire"),
                        demandeur: Yup.string().required("Champ obligatoire"),
                        observation:Yup.string().required("Champ obligatoire"),
                        dateBonCommande: Yup.date().required("Champ obligatoire"),
                        numBonCommande:Yup.string().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                        handleSubmit(value);
                        action.resetForm();
                    }}
                >
                    {(formikProps) => <FormBCI setIdDelete={setIdDelete} formikProps={formikProps} valuesArticle={valuesArticle} setValuesArticle={setValuesArticle} />}
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

