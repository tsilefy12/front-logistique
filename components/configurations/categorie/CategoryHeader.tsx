import { Stack, styled, Typography, Button } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import {
    createCategorieStock
} from "../../../redux/features/configuration"
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import OSTextField from "../../shared/input/OSTextField";
import {
    cancelEdit,
    updateCategorie
} from "../../../redux/features/configuration/categorieStockSlice"
import useFetchCategorieList from "./hooks/useFetchCategorie";

const CategoryHeader = () => {
    const { isEditing, categorieStock } = useAppSelector(
        (state) => state.categorieStock
    );
    const dispatch = useAppDispatch();
    const fetchCategorieList = useFetchCategorieList();
    
    const handleSubmit = async (values: any) => {
        try {
            if (isEditing) {
                await dispatch(
                    updateCategorie({
                        id: categorieStock.id!,
                        categorie: values,
                    })
                );
            } else {
                await dispatch(createCategorieStock(values));
            }
            fetchCategorieList();
        } catch (error) {
          console.log("error", error);
        }
      };
    return (
        <FormContainer>
            <Formik
                enableReinitialize
                initialValues={{
                    categorieStock: isEditing ? categorieStock?.categorieStock : "",
                }}
                validationSchema={Yup.object({
                    categorieStock: Yup.string().required("Veuillez sélectionner un code"),
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
                                { isEditing ? "Modifier" : "Ajouter"} categorie du stock
                            </Typography>
                            <OSTextField
                                id="outlined-basic" 
                                variant="outlined"
                                value = {formikProps.values.categorieStock}
                                label="Categorie"
                                name="categorieStock"
                            />
                            <BtnContainer direction="row" spacing={2} justifyContent="flex-end">
                            <Button size="medium" color="warning" variant="text"
                            onClick={() => {
                                formikProps.resetForm();
                                dispatch(cancelEdit());
                            }}
                            >
                                Annuler
                            </Button>
                            <Button size="medium" type="submit" color="primary" variant="contained">
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

export default CategoryHeader;
