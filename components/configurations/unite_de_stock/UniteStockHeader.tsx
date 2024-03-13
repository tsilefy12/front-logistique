import { Stack, styled, Typography, Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { createUniteStock } from "../../../redux/features/configuration"
import { cancelEdit } from "../../../redux/features/configuration/uniteStockSlice"
import { Form, Formik } from "formik";
import * as Yup from "yup";
import OSTextField from "../../shared/input/OSTextField";

const UniteStockHeader = () => {
    const { isEditing, uniteStock } = useAppSelector(
        (state) => state.uniteStock
    );
    const dispatch = useAppDispatch();
    const route = useRouter();
    const handleSubmit = async (values: any) => {
        try {
            if ( !isEditing) {
                await dispatch(createUniteStock(values));
                route.push("/configurations/unite_de_stock");
            } 

        } catch (error) {
            console.log("error", error);
        }
    };
    return (
        <FormContainer>
            <Formik
                enableReinitialize
                initialValues={{
                    uniteStock: isEditing ? uniteStock?.uniteStock : "",
                }}
                validationSchema={Yup.object({
                    uniteStock: Yup.string().required("Veuillez remplir l'unité de stock"),
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
                            { isEditing ? "Modifier" : "Ajouter"} unité de stock
                            </Typography>
                            <OSTextField
                                id="outlined-basic" 
                                label="Unité de stock" 
                                variant="outlined" 
                                name="uniteStock"
                                value = {formikProps.values.uniteStock}
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

export default UniteStockHeader;
