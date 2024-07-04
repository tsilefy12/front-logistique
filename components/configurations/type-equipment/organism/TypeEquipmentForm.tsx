import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { cancelEdit } from "../../../../redux/features/typeEquipment/typeEquipmentSlice";
import { createTypeEquipment } from "../../../../redux/features/typeEquipment";
import { updateTypeEquipment } from "../../../../redux/features/typeEquipment";
import useFetchTypeEquipment from "../hooks/useFetchTypeEquipment";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import OSTextField from "../../../shared/input/OSTextField";

const TypeEquipmentForm = () => {
  const { isEditing, typeEquipment } = useAppSelector(
    (state) => state.typeEquipment
  );
  const dispatch = useAppDispatch();
  const fetchTypeEquipmentList = useFetchTypeEquipment();

  const handleSubmint = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateTypeEquipment({
            id: typeEquipment.id!,
            typeEquipment: values,
          })
        );
      } else {
        await dispatch(createTypeEquipment(values));
      }
      fetchTypeEquipmentList();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FormContainer>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? typeEquipment
            : {
                type: isEditing ? typeEquipment.type :"",
                prefix: isEditing ? typeEquipment.prefix :"",
                unitPrice:isEditing ? typeEquipment.unitPrice :0
              }
        }
        validationSchema={Yup.object({
          type: Yup.string().required("Champ obligatoire"),
          prefix: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={async (value: any, action) => {
          await handleSubmint(value);
          action.resetForm();
        }}
      >
        {(formikProps) => (
          <Form>
            <Stack spacing={4}>
              <Typography variant="h5" color="initial">
                Nouveau / Modification
              </Typography>
              <OSTextField label="Matériel (Ex: Table)" name="type" />
              <OSTextField label="Type" name="prefix" />
              <OSTextField label="Prix unitaire" name="unitPrice" type="number"/>
              <BtnContainer
                direction="row"
                spacing={2}
                justifyContent="flex-end"
              >
                <Button
                  size="medium"
                  type="reset"
                  color="warning"
                  variant="text"
                >
                  Annuler
                </Button>
                <Button
                  size="medium"
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Enregistrer
                </Button>
              </BtnContainer>
            </Stack>
          </Form>
        )}
      </Formik>
    </FormContainer>
  );
};

const BtnContainer = styled(Stack)(({ theme }) => ({}));

const FormContainer = styled("div")(({ theme }) => ({
  // border: "1px solid #E0E0E0",
  borderRadius: 20,
  padding: theme.spacing(2),
  marginBlock: theme.spacing(2),
  background: "#fff",
}));

export default TypeEquipmentForm;
