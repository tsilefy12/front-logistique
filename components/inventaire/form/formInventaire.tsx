import {
    Button,
    Container,
    styled,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Stack,
    Grid,
    Divider,
  } from "@mui/material";
  import Link from "next/link";
  import React from "react";
  import ArrowBack from "@mui/icons-material/ArrowBack";
  import { Check, Close, Save } from "@mui/icons-material";
  import { Form, Formik } from "formik";
  import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
  import * as Yup from "yup";
  import OSSelectField from "../../shared/select/OSSelectField";
  import OSTextField from "../../shared/input copy/OSTextField";
  import OSDatePicker from "../../shared/date/OSDatePicker";
  import {
    createInventaire,
    updateInventaire,
  } from "../../../redux/features/inventaire";
  import { useRouter } from "next/router";
  import { cancelEdit } from "../../../redux/features/equipment/equipmentSlice";
  
  const AddInventaireForm = () => {
    const dispatch = useAppDispatch();
    const etat = [
      { name: "GOOD", french: "Bon etat" },
      { name: "BAD", french: "Mauvais" },
      { name: "BROKEN", french: "inutilisable" },
    ];
    const route = useRouter();
    const { isEditing} = useAppSelector(
      (state) => state.equipment
    );
   
    const handleSubmit = async (values: any) => {
      values.acquisitionDate = new Date(values?.acquisitionDate).toISOString();
      try {
        if (isEditing) {
        //   await dispatch(
        //     updateInventaire({
        //       id: equipment.id!,
        //       equipment: values,
        //     })
        //   );
        } else {
          await dispatch(createInventaire(values));
        }
        route.push("/materiels/informatiques");
      } catch (error) {
        console.log("error", error);
      }
    };
  
    const FourniseurList = [
      { id: "1", name: "1" },
      { id: "2", name: "2" }
    ]
    return (
        <Container maxWidth="xl" sx={{ pb: 5 }}>
            <Formik
                enableReinitialize
                initialValues={{
                    date_inventaire: new Date(),
                    date_depreciation: new Date(),
                    etat: "",
                    duree_vie: 0,
                    valeur_inventaire: 0,
                }}
                validationSchema={Yup.object({
                    date_inventaire: Yup.date(),
                    date_depreciation: Yup.date(),
                    etat: Yup.string().required("Veuillez sélectionner un numOptim"),
                    duree_vie: Yup.number().required(
                        "Veuillez remplir le durée de vie"
                    ),
                    valeur_inventaire: Yup.number().required(
                        "Veuillez remplir le valeur"
                    ),
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
                        <Link href="/materiels/informatiques">
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
                            variant="text"
                            color="warning"
                            size="small"
                            startIcon={<Close />}
                            sx={{ marginInline: 3 }}
                            onClick={() => {
                            formikProps.resetForm();
                            dispatch(cancelEdit());
                            }}
                        >
                            Annuler
                        </Button>
                        </Stack>
                        <Typography variant="h4">
                        {isEditing ? "Modifier" : "Ajouter"} inventaire
                        </Typography>
                    </SectionNavigation>
                    <Divider />
                    </NavigationContainer>
                    <FormContainer spacing={2}>
                        <OSDatePicker
                            fullWidth
                            label="Date inventaire"
                            value={formikProps.values.date_inventaire}
                            onChange={(value: any) =>
                                formikProps.setFieldValue("date_inventaire", value)
                            }
                        />
                        <OSDatePicker
                            fullWidth
                            label="Date dépréciation"
                            value={formikProps.values.date_depreciation}
                            onChange={(value: any) =>
                                formikProps.setFieldValue("date_depreciation", value)
                            }
                        />
                        <OSTextField
                            name="duree_vie"
                            fullWidth
                            id="outlined-basic"
                            label="Durée de vie"
                            variant="outlined"
                            type="number"
                        />
                        <OSTextField
                            name="valeur_inventaire"
                            fullWidth
                            id="outlined-basic"
                            label="Valeur inventaire"
                            variant="outlined"
                            type="number"
                        />
                        <FormControl fullWidth>
                        <OSSelectField
                            id="etat_materiel"
                            label="Etat matériel"
                            name="status"
                            options={etat}
                            dataKey="french"
                            valueKey="name"
                        />
                        </FormControl>
                    </FormContainer>
                </Form>
                );
            }}
            </Formik>
        </Container>
    );
  };
  
  export default AddInventaireForm;
  
    export const CustomStack = styled(Stack)(({ theme }) => ({
        [theme.breakpoints.down("sm")]: {
        flexWrap: "wrap",
        },
    }));
    
    const FormContainer = styled(Stack)(({ theme }) => ({
        padding: 30,
        // border: "1px solid #E0E0E0",
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
  