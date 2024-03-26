import {
  Button,
  Container,
  styled,
  Typography,
  Stack,
  Divider,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close, Save } from "@mui/icons-material";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  createHolder,
  updateHolder,
} from "../../../../../redux/features/holder";
import { Form, Formik } from "formik";
import { cancelEdit } from "../../../../../redux/features/holder/holderSlice";
import FormDetenteur from "./formDetenteur";
import { createHolderEquipement } from "../../../../../redux/features/holder/holderEquipementSlice";

const FormDetentionMateriel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isEditing, holder } = useAppSelector((state) => state.holder);
    const [valuesArticle, setValuesArticle] = useState < any[]> ([])

    const handleSubmit = async (values: any) => {
        try {
        if (isEditing) {
            await dispatch(
            updateHolder({
                id: holder.id!,
                holder: values,
            })
            );
        } else {
            const newDataHolder = {
                reference: values.reference,
                contact: values.contact,
                name:values.name,
                type:values.type,
                matricule: values.matricule,
                function: values.function,
            }
            const response = await dispatch(createHolder(newDataHolder));
            valuesArticle.forEach((element:any, index:any) => {
                const newData = {
                    equipmentId: element.equipmentId,
                    holderId: response.payload.id
                };
                dispatch(createHolderEquipement(newData))
            })
        }
        router.push("/materiels/detenteur");
        } catch (error) {
        console.log("error", error);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
            <Formik
                enableReinitialize
                initialValues={
                    {
                        numOptim:  "",
                        contact: "",
                        reference: "",
                        name: "",
                        matricule:  "",
                        function:"",
                        type:"",
                    }
                }
                validationSchema={Yup.object({
                    contact: Yup.string().required("Champ obligatoire"),
                    reference: Yup.string().required("Champ obligatoire"),
                    name: Yup.string().required("champ obligatoire"),
                    matricule: Yup.string().required("Champ obligatoire"),
                    function: Yup.string().required("Champ obligatoire"),
                })}
                onSubmit={(value: any, action: any) => {
                    handleSubmit(value);
                    action.resetForm();
                }}
            >
                {(formikProps) => <FormDetenteur formikProps={formikProps} valuesArticle={valuesArticle} setValuesArticle={setValuesArticle}/>}
            </Formik>
        </Container>
    );
};

export default FormDetentionMateriel;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));


  