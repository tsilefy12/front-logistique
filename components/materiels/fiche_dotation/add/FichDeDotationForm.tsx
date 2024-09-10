import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { styled } from "@mui/material";
import {
  createFicheDotation,
  editFicheDotation,
  updateFicheDotation,
} from "../../../../redux/features/fiche_dotation/ficheDotationSlice";
import FormFicheDotation from "./FormFicheDotation";
import { createFile } from "../../../../redux/features/file/fileSlice";
import { createPersonneConcerner } from "../../../../redux/features/fiche_dotation/personneConcernerSlice";

export default function FichDotationForm() {
  const dispatch = useAppDispatch();
  const route = useRouter();

  const [valuesArticle, setValuesArticle] = useState<any[]>([]);
  const [idDelete, setIdDelete] = useState<any[]>([]);

  const { id }: any = route.query;
  const { isEditing, ficheDotation } = useAppSelector(
    (state) => state.ficheDotation
  );

  const handleSubmit = async (values: any) => {
    try {
      if (values.pieceJointe && values.pieceJointe.name !== null) {
        const formData = new FormData();
        formData.append("file", values.pieceJointe);
        const { images } = await dispatch(createFile(formData)).unwrap();
        values.pieceJointe = images[0].url;
      }
      const updateData = {
        reference: values.reference,
        date: new Date(values.date),
        region: values.region,
        district: values.district,
        commune: values.commune,
        grant: values.grant,
        ligneBudgetaire: values.ligneBudgetaire,
        fokontany: values.fokontany,
        pieceJointe:
          values.pieceJointe && values.pieceJointe.name !== null
            ? values.pieceJointe
            : null,
      };
      if (isEditing) {
        const response = await dispatch(
          updateFicheDotation({ id, updateData })
        );
        if (valuesArticle.length > 0) {
          valuesArticle?.forEach((element: any, index: any) => {
            const updateData = {
              nomPrenom: element.nomPrenom,
              cin: element.cin,
              fonction: element.fonction,
              designation: element.designation,
              ficheDotationId: response.payload.id,
            };
            dispatch(createPersonneConcerner(updateData));
          });
        }
      } else {
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
  };

  useEffect(() => {
    if (id) {
      handleFech(id);
    }
  }, [id]);

  return (
    <>
      <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
        <Formik
          enableReinitialize={isEditing ? true : false}
          initialValues={{
            date:
              isEditing && ficheDotation.date
                ? new Date(ficheDotation.date)
                : new Date().toISOString(),
            reference: isEditing ? ficheDotation.reference : "",
            region: isEditing ? ficheDotation.region : "",
            district: isEditing ? ficheDotation.district : "",
            commune: isEditing ? ficheDotation.commune : "",
            fokontany: isEditing ? ficheDotation.fokontany : "",
            grant: isEditing ? ficheDotation.grant : "",
            ligneBudgetaire: isEditing ? ficheDotation.ligneBudgetaire : "",
            pieceJointe: "",
          }}
          validationSchema={Yup.object({
            reference: Yup.string().required("Champ obligatoire"),
            region: Yup.string().required("Champ obligatoire"),
            district: Yup.string().required("Champ obligatoire"),
            date: Yup.date().required("Champ obligatoire"),
            commune: Yup.string().required("Champ obligatoire"),
            fokontany: Yup.string().required("Champ obligatoire"),
            grant: Yup.string().required("Champ obligatoire"),
          })}
          onSubmit={(value: any, action: any) => {
            handleSubmit(value);
            action.resetForm();
          }}
        >
          {(formikProps) => (
            <FormFicheDotation
              setIdDelete={setIdDelete}
              formikProps={formikProps}
              valuesArticle={valuesArticle}
              setValuesArticle={setValuesArticle}
            />
          )}
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
