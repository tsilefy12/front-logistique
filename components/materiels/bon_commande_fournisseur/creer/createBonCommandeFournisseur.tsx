import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import {
  createBonCommandeFournisseur,editBonCommandeFournisseur,cancelEdit,updateBonCommandeFournisseur
} from "../../../../redux/features/bon_commande_fournisseur/bonCommandeFournisseurSlice";
import FormBonCommandeFournisseur from "./FormBonCommandeFournisseur";
import { styled } from "@mui/material";
import { createArticleCommandeFournisseur, deleteArticleCommandeFournisseur, updateArticleCommandeFournisseur } from "../../../../redux/features/bon_commande_fournisseur/articleCommandeFournisseurSlice";

export default function BonCommandeInterneForm() {
    const dispatch = useAppDispatch();
    const route = useRouter();
    const { id }: any = route.query;


    const [ valuesArticle, setValuesArticle ] = useState < any[]> ([])
    const [ idDelete,setIdDelete] = useState < any[]> ([])

    const { isEditing,commandeFournisseur } = useAppSelector((state) => state.bonDeCommandeFournisseur);

    const handleSubmit = async (values: any) => {
        try {
            const updateData = {
                vendorId: values.vendorId,
                establishmentDate:new Date(values.establishmentDate),
                paymentMethod: values.paymentMethod,
                deliveryDate: new Date(values.deliveryDate),
                deliveryCondition: values.deliveryCondition,
                // montantTotal : valuesArticle.reduce((acc:any, curr:any) => acc + curr.valueArticle, 0)
            }

            if(isEditing){
                const response = await dispatch(updateBonCommandeFournisseur({id,updateData}));
                if(valuesArticle.length > 0){
                    valuesArticle?.forEach((element:any, index:any) => {
                        const id = element.id
                        const updateData = {
                            designation: element.designation,
                            unitPrice: element.unitPrice,
                            quantite: element.quantite,
                            montant:element.montant,
                            details: element.details ? element.details :null,
                            bonCommandeFournisseurId: response.payload.id
                        };
                        if(id){
                            dispatch(updateArticleCommandeFournisseur({id,updateData}));
                        }else{
                            dispatch(createArticleCommandeFournisseur(updateData));
                        }
                    });
                }
                
                idDelete?.forEach((element:any, index:any) =>{
                    const id = element.id
                    dispatch(deleteArticleCommandeFournisseur({id}));
                })
            }else{
                const response = await dispatch(createBonCommandeFournisseur(updateData));
                if(valuesArticle.length > 0 ){
                    valuesArticle.forEach((element:any, index:any) => {
                        const newData = {
                            designation: element.designation,
                            unitPrice: element.unitPrice,
                            quantite: element.quantite,
                            montant:element.montant,
                            details: element.details,
                            bonCommandeFournisseurId: response.payload.id
                        };
                        dispatch(createArticleCommandeFournisseur(newData));
                    });
                }
            }
            route.push("/materiels/bon_de_commande_fournisseur");
        } catch (error) {
        console.log("error", error);
        }
    };

    const handleFech = async (id: any) => {
        try { 
            const Val = await dispatch(editBonCommandeFournisseur({ id , args:{
                include:{
                    articleFournisseur:true
                }
            }}));
            console.log(Val)
            setValuesArticle((prev:any[])=>{
                console.log(prev)
                prev = Val.payload.articleFournisseur
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
                    enableReinitialize = { isEditing ? true :false }
                    initialValues={
                        {
                            vendorId: isEditing ? commandeFournisseur.vendorId: "",
                            establishmentDate: isEditing && commandeFournisseur.establishmentDate ? new Date(commandeFournisseur.establishmentDate):new Date(),
                            paymentMethod: isEditing ? commandeFournisseur.paymentMethod: "",
                            deliveryDate: isEditing && commandeFournisseur.deliveryDate? new Date(commandeFournisseur.deliveryDate): new Date(),
                            deliveryCondition:isEditing ? commandeFournisseur.deliveryCondition :"",
                            designation :"",
                            unitPrice:0,
                            quantite:0,
                            details:"",
                        }
                    }
                    validationSchema={Yup.object({
                        vendorId:Yup.string().required("Champ obligatoire"),
                    })}
                    onSubmit={(value: any, action: any) => {
                        handleSubmit(value);
                        action.resetForm();
                    }}
                >
                    {(formikProps) => <FormBonCommandeFournisseur setIdDelete={setIdDelete} formikProps={formikProps} valuesArticle={valuesArticle} setValuesArticle={setValuesArticle} />}
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