import React from "react";
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
import { styled } from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSTextField from "../../shared/input copy/OSTextField";
import { cancelEdit } from "../../../redux/features/supply-and-consumable/supply-and-consumable";
import { createArticl, updateArticl } from "../../../redux/features/supply-and-consumable";

export default function ArticleForm() {
  const route = useRouter();

  const dispatch = useAppDispatch();

  const { isEditing, articl } = useAppSelector((state) => state.articl);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateArticl({
            id: articl.id!,
            articl: values,
          })
        );
      } else {
        await dispatch(createArticl(values));
      }
      route.push("/fournitures_et_consommables/article");
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
            ? articl
            : {
                designation: isEditing ? articl?.designation : "",
                quantity: isEditing ? articl?.quantity : "",
                unitPrice: isEditing ? articl?.unitPrice : "",
                SKU: isEditing ? articl?.SKU : "",
              }
        }
        validationSchema={Yup.object({
          designation: Yup.string().required("Champ obligatoire"),
          unitPrice: Yup.number().required("champ obligatoir"),
          quantity: Yup.number().required("Champ obligatoir"),
          SKU: Yup.string().required("Unité de Gestion de Stock invalide"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          // console.log(value);
          // alert("test");
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            
            <Form>
              <NavigationContainer>
                <SectionNavigation>
                  <Stack flexDirection={"row"}>
                    <Link href="/fournitures_et_consommables/article">
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
                    {isEditing ? "Modifier" : "Ajouter"} article
                  </Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>

              <FormContainer spacing={2}>
                <OSTextField
                  id="outlined-basic"
                  label="Désignation"
                  name="designation"
                />
                <OSTextField
                  id="outlined-basic"
                  label="Quantite"
                  name="quantity"
                  type= "number"
                />
                <OSTextField
                  id="outlined-basic"
                  label="Prix Unitaire"
                  name="unitPrice"
                  type= "number"
                />
                <OSTextField
                  id="outlined-basic"
                  label="Unité de Gestion de Stock"
                  name="SKU"
                />
              </FormContainer>
            </Form>
          );
        }}
      </Formik>
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
