import { Stack, styled, Typography, Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { cancelEdit } from "../../../redux/features/configuration/uniteStockSlice";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import OSTextField from "../../shared/input/OSTextField";
import useFetchLocalisationList from "./hooks/useFetchUniteStock";
import { updateLocalisation } from "../../../redux/features/configuration/localisationSlice";
import { createLocalisation } from "../../../redux/features/configuration/useCase/localisation/createLocalisation";

const LocalisationHeader = () => {
  const { isEditing, localisation } = useAppSelector(
    (state) => state.localisation
  );
  const dispatch = useAppDispatch();
  const fetchLocalisationList = useFetchLocalisationList();
  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateLocalisation({
            id: localisation.id!,
            localisation: values,
          })
        );
      } else {
        await dispatch(createLocalisation(values));
      }
      fetchLocalisationList();
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <FormContainer>
      <Formik
        enableReinitialize
        initialValues={{
          localisation: isEditing ? localisation?.localisation : "",
        }}
        validationSchema={Yup.object({
          localisation: Yup.string().required("Champ obligatoire"),
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
                  {isEditing ? "Modifier" : "Ajouter"} localisation
                </Typography>
                <OSTextField
                  id="outlined-basic"
                  label="Localisation"
                  variant="outlined"
                  name="localisation"
                  value={formikProps.values.localisation}
                  inputProps={{ autoComplete: "off" }}
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

export default LocalisationHeader;
