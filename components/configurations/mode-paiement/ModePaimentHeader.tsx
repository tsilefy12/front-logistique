import { Stack, styled, Typography, Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { cancelEdit } from "../../../redux/features/configuration/uniteStockSlice";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import OSTextField from "../../shared/input/OSTextField";
import useFetchModePaiementList from "./hooks/useFetchUniteStock";
import { updateModePaiement } from "../../../redux/features/configuration/modePaiementSlice";
import { createModePaiement } from "../../../redux/features/configuration/useCase/modePaiement/createModePaiement";

const ModePaiementHeader = () => {
  const { isEditing, modePaiement } = useAppSelector(
    (state) => state.modePaiement
  );
  const dispatch = useAppDispatch();
  const fetchModePaiementList = useFetchModePaiementList();
  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateModePaiement({
            id: modePaiement.id!,
            modePaiement: values,
          })
        );
      } else {
        await dispatch(createModePaiement(values));
      }
      fetchModePaiementList();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <FormContainer>
      <Formik
        enableReinitialize
        initialValues={{
          modePaiementMV: isEditing ? modePaiement?.modePaiementMV : "",
        }}
        validationSchema={Yup.object({
          modePaiementMV: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <Stack spacing={4}>
                <Typography variant="h5" color="initial">
                  {isEditing ? "Modifier" : "Ajouter"} mode de paiement
                </Typography>
                <OSTextField
                  id="outlined-basic"
                  label="Mode de paiement MV"
                  variant="outlined"
                  name="modePaiementMV"
                  value={formikProps.values.modePaiementMV}
                />
                <BtnContainer
                  direction="row"
                  spacing={2}
                  justifyContent="flex-end"
                >
                  <Button
                    size="medium"
                    color="warning"
                    variant="text"
                    onClick={() => {
                      formikProps.resetForm();
                      dispatch(cancelEdit());
                    }}
                  >
                    Annuler
                  </Button>
                  <Button
                    size="medium"
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Enregistrer
                  </Button>
                </BtnContainer>
              </Stack>
            </Form>
          );
        }}
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

export default ModePaiementHeader;
