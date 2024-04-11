import React, { useEffect, useState } from "react";
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
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Radio, styled } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import {
  createLogSuplyAndConsumable,
  updateLogSuplyAndConsumable,
} from "../../../redux/features/logSuplyAndConsumable";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { cancelEdit } from "../../../redux/features/logSuplyAndConsumable/log-supply-and-consumableSlice";
import OSTextField from "../../shared/input/OSTextField";
import OSDatePicker from "../../shared/date/OSDatePicker";
import RadioGroup from "@mui/material/RadioGroup";
import { editSuplyAndConsumable, updateSuplyAndConsumable } from "../../../redux/features/supply-and-consumable";
import useFetchLogSuplyAndConsumableList from "../entreSortie/hooks/useFetchLogSupplyAndConsumable";
// import useFetchSuplysAndConsumableList from "../../Order-Supply-And-Consumable/hooks/useFetchSuplyAndConsumableList";

const FormLogEntreSortie = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const ficheStock = router.query.id;
  const { logSuplyAndConsumable, isEditing } = useAppSelector(
    (state) => state.logSuplyAndConsumable
  );
  const { suplyAndConsumable} = useAppSelector(
    (state) => state.suplyAndConsumable
  );
 const fetchLogSypplyAndConsumable = useFetchLogSuplyAndConsumableList();
  useEffect(() => {
    if (router.query.id) {
      getSuplyAndConsumable(router.query.id);
    }
    fetchLogSypplyAndConsumable();
  }, [router.query.id]);


  const getSuplyAndConsumable = async (id: any) => {
    await dispatch(editSuplyAndConsumable({ id }));
  };
  const handleSubmit = async (values: any) => {
    (values.quantity = +values.quantity),
      (values.unitPrice = +values.unitPrice),
      (values.date = new Date(values?.date).toISOString());
    try {
      if (isEditing) {
        await dispatch(
          updateLogSuplyAndConsumable({
            id: logSuplyAndConsumable.id!,
            logSuplyAndConsumable: values,
          })
        );
      } else {
        await dispatch(createLogSuplyAndConsumable(values));
        updateFicehDeStock(values);
          }
      router.push("/fournitures_et_consommables/entre_et_sortie");
      fetchLogSypplyAndConsumable();
    } catch (error) {
      console.log("error", error);
    }
  };
  const updateFicehDeStock = async (values: any) => {
    try {
      if (suplyAndConsumable.id != "") {
        const updatedReste = calculateUpdatedReste(values);
  
        await dispatch(
          updateSuplyAndConsumable({
            id: suplyAndConsumable.id!,
            suplyAndConsumable: {
              ...suplyAndConsumable,
              reste: updatedReste,
            },
          })
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const calculateUpdatedReste = (values: any): number => {
    const currentReste = suplyAndConsumable.reste;
    const newQuantity = values.quantity;
    if (currentReste !== undefined && newQuantity !== undefined) {
      if (values.OperationType === "OUTPUT") {
        const updatedReste = currentReste - newQuantity;
        return updatedReste >= 0 ? updatedReste : 0;
      } else {
        const updatedReste = currentReste + newQuantity;
        return updatedReste>= 0 ? updatedReste : 0;
      }
    } else {
      return currentReste !== undefined ? currentReste : 0;
    }
    
  };
  
  return (
    <Container maxWidth="xl">
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? logSuplyAndConsumable
            : {
                date: isEditing ? logSuplyAndConsumable?.date : new Date(),
                quantity: isEditing ? logSuplyAndConsumable?.quantity : 0,
                // SKU: isEditing ? logSuplyAndConsumable?.SKU : ,
                OperationType: isEditing
                  ? logSuplyAndConsumable?.OperationType
                  : "",
                unitPrice: isEditing ? logSuplyAndConsumable?.unitPrice : 0,
                // inventoryValue: isEditing
                //   ? logSuplyAndConsumable?.inventoryValue
                //   : 0,
                supplyAndConsumableId: isEditing
                  ? logSuplyAndConsumable?.supplyAndConsumableId
                  : suplyAndConsumable.id,
              }
        }
        validationSchema={Yup.object({
          quantity: Yup.number().required("Champ obligatoire"),
          OperationType: Yup.string()
            .oneOf(["INPUT", "OUTPUT"], "Veuillez choisier type d'operation")
            .required("Veuillez choisir type d'operation "),
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
                    // fullWidth
                    label="Date"
                    value={formikProps.values.date}
                  />
                  {/* <Stack
                    // flexDirection="row"
                    display="flex"
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  > */}

                  {/* </Stack> */}
                </CustomStack>
                <OSTextField
                  id="outlined-basic"
                  label="Quantité"
                  name="quantity"
                  type="number"
                  min="0"
                  value={formikProps.values.quantity}
                  onChange={(event: any) => {
                    const newValue = parseInt(event.target.value);
                    formikProps.setFieldValue("quantity", newValue);
                    const newMontant = newValue * (formikProps.values.unitPrice ?? 0);
                    formikProps.setFieldValue("inventoryValue", newMontant);
                  }}
                />
                <OSTextField
                  id="outlined-basic"
                  label="Prix unitaire"
                  name="unitPrice"
                  type="number"
                  min="0"
                  value={formikProps.values.unitPrice}
                  onChange={(event: any) => {
                    const newValue = parseInt(event.target.value);
                    formikProps.setFieldValue("unitPrice", newValue);
                    const newMontant = newValue * (formikProps.values.quantity ?? 0);
                    formikProps.setFieldValue("inventoryValue", newMontant);
                  }}
                />
                <OSTextField
                  id="outlined-basic"
                  label="Valeur de stock"
                  name="inventoryValue"
                  type="number"
                  min="0"
                  value={(formikProps.values.quantity ?? 0) * (formikProps.values.unitPrice ?? 0)}
                  disabled
                />
                <FormControl>
                  <Field as={RadioGroup} row name="OperationType">
                    <FormControlLabel
                      value="INPUT"
                      control={<Radio />}
                      label="Entré"
                      name="OperationType"
                    />
                    <FormControlLabel
                      value="OUTPUT"
                      control={<Radio />}
                      label="Sortie"
                      name="OperationType"
                    />
                  </Field>
                </FormControl>
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
