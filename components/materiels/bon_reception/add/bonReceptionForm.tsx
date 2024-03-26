import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import {
  createproduitRecu, deleteproduitRecu, updateProduiRecu,
} from "../../../../redux/features/bon_reception/produitRecuSlice";
import { createBonReception, editBonReception, updateBonReception } from "../../../../redux/features/bon_reception/bonReceptionSlice";
import FormBonReception from "./FormBonReception";
import { styled } from "@mui/material";

export default function BonReceptionForm() {
    const [valuesArticle, setValuesArticle] = useState < any[]> ([])
    const [ idDelete,setIdDelete] = useState < any[]> ([])
    const dispatch = useAppDispatch();
    const route = useRouter();
    const { id }: any = route.query;
    const { isEditing ,bonReception } = useAppSelector((state) => state.bonReceptions);

    const handleSubmit = async (values: any) => {
        try {
            if(isEditing){
                const updateDataBR = {
                    bce: values.bce,
                    reference: values.reference,
                    dateReception: new Date(values.dateReception)
                }
                const response = await dispatch(updateBonReception({id,updateDataBR}));
                valuesArticle?.forEach((element:any, index:any) => {
                    const id = element.id
                    if(id){
                        const updateProduitRecu = {
                            designation: element.designation,
                            quantite:element.quantite,
                            bonDeReceptionId: response.payload.id
                        };
                        dispatch(updateProduiRecu({id,updateProduitRecu}));
                    }else{
                        const newData = {
                            designation: element.designation,
                            quantite:element.quantite,
                            bonDeReceptionId: response.payload.id
                        };
                        dispatch(createproduitRecu(newData));
                    }
                });
                idDelete?.forEach((element:any, index:any) =>{
                    const id = element.id
                    dispatch(deleteproduitRecu({id}));
                })
            }else{
                const newDataBR = {
                    bce: values.bce,
                    reference: values.reference,
                    dateReception: new Date(values.dateReception)
                }
                const response = await dispatch(createBonReception(newDataBR));
                valuesArticle.forEach((element:any, index:any) => {
                    const newData = {
                        designation: element.designation,
                        quantite:element.quantite,
                        bonDeReceptionId: response.payload.id
                    };
                    dispatch(createproduitRecu(newData));
                });
            }
            route.push("/materiels/bon_reception");
        } catch (error) {
        console.log("error", error);
        }
    };

    const handleFech = async (id: any) => {
        try { 
            const Val = await dispatch(editBonReception({ id , args:{
                include:{
                    produitRecu:true,
                }
            }}));
            console.log(Val)
            setValuesArticle((prev:any[])=>{
                console.log(prev)
                prev = Val.payload.produitRecu
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
                    enableReinitialize
                    initialValues={
                        {
                            bce: isEditing && bonReception ? bonReception.bce:"",
                            reference:isEditing && bonReception ? bonReception.reference:"",
                            dateReception: isEditing && bonReception.dateReception ? new Date(bonReception.dateReception).toISOString(): new Date().toISOString(),
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
                    {(formikProps) => <FormBonReception formikProps={formikProps} valuesArticle={valuesArticle} setValuesArticle={setValuesArticle} setIdDelete={setIdDelete}/>}
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
