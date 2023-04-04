import React from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { styled } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import {
  createLogSuplyAndConsumable,
  updateLogSuplyAndConsumable,
} from "../../../redux/features/logSuplyAndConsumable";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { cancelEdit } from "../../../redux/features/logSuplyAndConsumable/log-supply-and-consumableSlice";
import OSTextField from "../../shared/input/OSTextField";
import OSDatePicker from "../../shared/date/OSDatePicker";

const FormLogEntreSortie = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const ficheStock = router.query.id;
  const { logsuplyAndConsumable, isEditing } = useAppSelector(
    (state) => state.logSuplyAndConsumable
  );
  const handleSubmit = async (values: any) => {
    (values.quantity = +values.quantity),
      (values.unitPrice = +values.unitPrice),
      (values.date = new Date(values?.date).toISOString());
    try {
      if (isEditing) {
        await dispatch(
          updateLogSuplyAndConsumable({
            id: logsuplyAndConsumable.id!,
            logsuplyAndConsumable: values,
          })
        );
      } else {
        await dispatch(createLogSuplyAndConsumable(values));
      }
      router.push("/fournitures_et_consommables/fiche_de_stock");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? logsuplyAndConsumable
            : {
                date: isEditing ? logsuplyAndConsumable?.date : new Date(),
                quantity: isEditing ? logsuplyAndConsumable?.quantity : "",
                SKU: isEditing ? logsuplyAndConsumable?.SKU : "",
                OperationType: isEditing
                  ? logsuplyAndConsumable?.OperationType
                  : "INPUT",
                unitPrice: isEditing ? logsuplyAndConsumable?.unitPrice : "",
                inventoryValue: isEditing
                  ? logsuplyAndConsumable?.inventoryValue
                  : 0,
                supplyAndConsumableId: ficheStock,
              }
        }
        validationSchema={Yup.object({
          quantity: Yup.number().required("Champ obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              <NavigationContainer>
                <SectionNavigation>
                  <Stack flexDirection={"row"}>
                    <Link href="/fournitures_et_consommables/fiche_de_stock">
                      <Button
                        color="info"
                        variant="text"
                        startIcon={<ArrowBack />}
                        onClick={() => {
                          formikProps.resetForm();
                          dispatch(cancelEdit());
                        }}
                      >
                        Retour
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<Check />}
                      sx={{ marginInline: 3 }}
                      type="submit"
                    >
                      Enregistrer
                    </Button>
                    <Button
                      color="warning"
                      variant="text"
                      startIcon={<Close />}
                      onClick={() => {
                        formikProps.resetForm();
                        dispatch(cancelEdit());
                      }}
                    >
                      Annuler
                    </Button>
                  </Stack>
                  {/* <Typography variant="h4">
                    Créer fourniture et consommable
                  </Typography> */}
                  <Typography variant="h4">
                    creer fourniture et consumable
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>
              <FormContainer spacing={2} sx={{ mt: 3 }}>
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSDatePicker
                    fullWidth
                    label="Date"
                    value={formikProps.values.date}
                  />
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="Entré"
                      sx={{ ml: 20 }}
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="Sortie"
                    />
                  </Stack>
                </CustomStack>
                <OSTextField
                  id="outlined-basic"
                  label="Quantité"
                  name="quantity"
                />
                <OSTextField
                  id="outlined-basic"
                  label="Prix unitaire"
                  name="unitPrice"
                />
                <OSTextField
                  id="outlined-basic"
                  label="Valeur de stock"
                  name="SKU"
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};

export default FormLogEntreSortie;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  padding: 30,
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
