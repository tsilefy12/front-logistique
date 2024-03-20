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
import React, { useEffect } from "react";
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
import OSTextField from "../../../../shared/input copy/OSTextField";
import OSSelectField from "../../../../shared/select/OSSelectField";
import ListDetentionMateriel from "../table/ListDetentionMateriel";
import { getEmployees } from "../../../../../redux/features/employeStagiaire/employeeSlice";
import { getInterns } from "../../../../../redux/features/employeStagiaire/stagiaireSlice";
import { getEquipments } from "../../../../../redux/features/equipment";
import { getEquipment } from "../../../../../redux/features/equipment/useCases/getEquipment";
import FormDetenteur from "./formDetenteur";

const FormDetentionMateriel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isEditing, holder } = useAppSelector((state) => state.holder);

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
            await dispatch(createHolder(values));
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
                        firstName: "",
                        lastName: "",
                        matricule:  "",
                        function:"",
                    }
                }
                validationSchema={Yup.object({
                    contact: Yup.string().required("Champ obligatoire"),
                    reference: Yup.string().required("Champ obligatoire"),
                    firstName: Yup.string().required("champ obligatoire"),
                    lastName: Yup.string().required("Champ obligatoire"),
                    matricule: Yup.string().required("Champ obligatoire"),
                    function: Yup.string().required("Champ obligatoire"),
                })}
                onSubmit={(value: any, action: any) => {
                handleSubmit(value);
                action.resetForm();
                }}
            >
                {(formikProps) => <FormDetenteur isEditing={isEditing} formikProps={formikProps}/>}
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


  