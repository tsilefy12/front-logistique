import {
  Stack,
  styled,
  Typography,
  Button,
  FormControlLabel,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { useAppSelector, useAppDispatch } from "../../../../hooks/reduxHooks";
import { createPassenger, updatePassenger } from "../../../../redux/features/passenger";
import { cancelEdit } from "../../../../redux/features/passenger/passengerSlice";
import OSTextField from "../../../shared/input/OSTextField";
import useFetchPassenger from "../hooks/useFetchPassenger";



const PassengerForm = () => {
  const { isEditing, passenger } = useAppSelector(
    (state) => state.passenger
  );
  const dispatch = useAppDispatch();
  const fetchPassenger = useFetchPassenger();

  const handleSubmint = async (values: any) => {
    try {
      if (isEditing) {
        // delete values.id;
        await dispatch(
          updatePassenger({
            id: passenger.id!,
            passenger: values,
          })
        );
      } else {
        await dispatch(createPassenger(values));
      }
      fetchPassenger();
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
            ? passenger
            : {
                name: "",
              }
        }
        validationSchema={Yup.object({
          name: Yup.string().required("Champ obligatoire"),
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
                Formulaire (Créer/Modifier)
              </Typography>
              <OSTextField label="Etat article" name="name"></OSTextField>
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
                  type="submit"
                  size="medium"
                  color="primary"
                  variant="contained"
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
  borderRadius: 20,
  padding: theme.spacing(2),
  marginBlock: theme.spacing(2),
  background: "#fff",
}));

export default PassengerForm;
