import { Container, styled, Stack } from "@mui/material";
import React from "react";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import {
  createEquipment,
  updateEquipment,
} from "../../../../redux/features/equipment";
import { useRouter } from "next/router";
import FormArticle from "./FormArticle";
import { createFile } from "../../../../redux/features/file/fileSlice";

const AddArticleForm = () => {
  const dispatch = useAppDispatch();
  const route = useRouter();

  const { isEditing, equipment } = useAppSelector((state) => state.equipment);
  const handleSubmit = async (values: any) => {
    values.acquisitionDate = new Date(values?.acquisitionDate).toISOString();
    try {
      if (isEditing) {
        if (values.image && values.image.name !== null) {
          const formData = new FormData();
          formData.append("file", values.image);
          const { images } = await dispatch(createFile(formData)).unwrap();
          values.image = images[0].url;
        }
        await dispatch(
          updateEquipment({
            id: equipment.id!,
            equipment: values,
          })
        );
      } else {
        if (values.image && values.image.name !== null) {
          const formData = new FormData();
          formData.append("file", values.image);
          const { images } = await dispatch(createFile(formData)).unwrap();
          values.image = images[0].url;
        }
        await dispatch(createEquipment(values)).unwrap();
      }
      route.push("/materiels/informatiques");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize
        initialValues={{
          numOptim: isEditing ? equipment?.numOptim : "",
          acquisitionDate: isEditing ? equipment?.acquisitionDate : new Date(),
          acquisitionValue: isEditing ? equipment?.acquisitionValue : 0,
          designation: isEditing ? equipment?.designation : "",
          status: isEditing ? equipment?.status : "",
          ownerId: isEditing ? equipment?.ownerId : "",
          typeEquipmentId: isEditing ? equipment?.typeEquipmentId : "",
          // dureAmortissement: isEditing ? equipment?.dureAmortissement : 0,
          dateAmortissement: isEditing
            ? equipment?.dateAmortissement
            : new Date(),
          fournisseur: isEditing ? equipment?.fournisseur : "",
          categorieMateriel: isEditing ? equipment?.categorieMateriel : "",
          grant: isEditing ? equipment?.grant : "",
          ligneBudgetaire: isEditing ? equipment?.ligneBudgetaire : "",
          image: isEditing ? equipment?.image : "",
        }}
        validationSchema={Yup.object({
          numOptim: Yup.string().required("Veuillez sélectionner un numOptim"),
          // additionalInformation: Yup.string(),
          acquisitionDate: Yup.date(),
          acquisitionValue: Yup.number(),
          designation: Yup.string().required(
            "Veuillez remplir le champ designation"
          ),
          status: Yup.string().required("Veuillez sélectionner un status"),
          typeEquipmentId: Yup.string().required(
            "Veuillez sélectionner un type"
          ),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => <FormArticle formikProps={formikProps} />}
      </Formik>
    </Container>
  );
};

export default AddArticleForm;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  // border: "1px solid #E0E0E0",
  borderRadius: 20,
  background: "#fff",
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "5px",
}));
