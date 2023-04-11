import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { Box, styled } from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import { cancelEdit } from "../../../../redux/features/order-form/orderFormSlice";
import {
  createOrderForm,
  updateOrderForm,
} from "../../../../redux/features/order-form";
import OSTextField from "../../../shared/input copy/OSTextField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import useFetchVendors from "../../../vendor/hooks/useFetchVendors";
import OSSelectField from "../../../shared/select/OSSelectField";
import ListArticle from "./table/article";

export default function OrderForm() {
  const route = useRouter();

  const dispatch = useAppDispatch();

  const { isEditing, orderForm } = useAppSelector((state) => state.orderForm);
  const { vendors } = useAppSelector((state) => state.vendor);

  const fetchVendorListe = useFetchVendors();

  useEffect(() => {
    fetchVendorListe();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateOrderForm({
            id: orderForm.id!,
            orderForm: values,
          })
        );
      } else {
        await dispatch(createOrderForm(values));
      }
      route.push("/materiels/bon_de_commande");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? orderForm
            : {
                number: isEditing ? orderForm?.number : "",
                reference: isEditing ? orderForm?.reference : "",
                shippingMethod: isEditing ? orderForm?.shippingMethod : "",
                deliveryDate: isEditing ? orderForm?.deliveryDate : new Date(),
                GSEValidation: isEditing ? orderForm?.GSEValidation : true,
                DEValidation: isEditing ? orderForm?.DEValidation : true,
                vendorId: isEditing ? orderForm?.vendorId : "",
              }
        }
        validationSchema={Yup.object({
          number: Yup.string().required("Champ obligatoire"),
          vendorId: Yup.string().required("Champ obligatoire"),
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
                    <Link href="/materiels/bon_de_commande">
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
                      sx={{ marginInline: 2 }}
                      type="submit"
                    >
                      Enregistrer
                    </Button>

                    <Button
                      variant="text"
                      color="warning"
                      size="small"
                      startIcon={<Close />}
                      onClick={() => {
                        formikProps.resetForm();
                        dispatch(cancelEdit());
                      }}
                    >
                      Annuler
                    </Button>
                  </Stack>
                  <Typography variant="h4">
                    {isEditing ? "Modifier" : "Ajouter"} Bon de commande
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>

              <FormContainer spacing={2}>
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSTextField
                    id="outlined-basic"
                    label="Numero"
                    name="number"
                  />
                  <OSTextField
                    id="outlined-basic"
                    label="Référence"
                    name="reference"
                  />
                </CustomStack>
                <CustomStack
                  direction={{ xs: "column", sm: "column", md: "row" }}
                  spacing={{ xs: 2, sm: 2, md: 1 }}
                >
                  <OSTextField
                    id="outlined-basic"
                    label="Mode de livraison"
                    name="shippingMethod"
                  />
                  <OSDatePicker
                    fullWidth
                    label="Date de livraison"
                    value={formikProps.values.deliveryDate}
                    onChange={(value: any) =>
                      formikProps.setFieldValue("deliveryDate", value)
                    }
                  />
                </CustomStack>
                <OSSelectField
                  id="vendorId"
                  label="Fournisseur"
                  name="vendorId"
                  options={vendors}
                  dataKey={"name"}
                  valueKey="id"
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
      {/* <Box>
        <ListArticle />
      </Box> */}
    </Container>
  );
}

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
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
