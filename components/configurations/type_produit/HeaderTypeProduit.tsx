import { Stack, styled, Typography, Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { createTypeProduit } from "../../../redux/features/configuration"
import { cancelEdit, updateTypeProduit } from "../../../redux/features/configuration/typeProduitSlice"
import { Form, Formik } from "formik";
import * as Yup from "yup";
import OSTextField from "../../shared/input/OSTextField";
import useFetchTypeProduitList from "./hooks/useFetchTypeProduitList";
const HeaderTypeProduit = () => {
    const { isEditing, typeProduit } = useAppSelector(
        (state) => state.typeProduit
    );
    const dispatch = useAppDispatch();
    const fetchTypeProduitList = useFetchTypeProduitList();
    const handleSubmit = async (values: any) => {
        try {
            if (isEditing) {
                await dispatch(
                    updateTypeProduit({
                        id: typeProduit.id!,
                        typeProduit: values,
                    })
                );
            } else {
                await dispatch(createTypeProduit(values));
            }
            fetchTypeProduitList();
        } catch (error) {
            console.log("error", error);
        }
    };
    return (
        <FormContainer>
            <Formik
                enableReinitialize
                initialValues={{
                    typeProduct: isEditing ? typeProduit?.typeProduct : "",
                }}
                validationSchema={Yup.object({
                    typeProduct: Yup.string().required("Veuillez remplir le type de produit"),
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
                            { isEditing ? "Modifier" : "Ajouter"} type de produit 
                            </Typography>
                            <OSTextField
                                name="typeProduct"
                                id="outlined-basic" 
                                variant="outlined"
                                label="Type de produit"
                                value = {formikProps.values.typeProduct}
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

export default HeaderTypeProduit;
