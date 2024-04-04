import {
    Button,
    Container,
    styled,
    Typography,
    FormControl,
    Stack,
    Divider,
} from "@mui/material";
  import Link from "next/link";
  import React from "react";
  import ArrowBack from "@mui/icons-material/ArrowBack";
  import { Check, Close, Save } from "@mui/icons-material";
  import { Form, Formik } from "formik";
  import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
  import * as Yup from "yup";
  import OSSelectField from "../../../shared/select/OSSelectField";
  import OSTextField from "../../../shared/input copy/OSTextField";
  import OSDatePicker from "../../../shared/date/OSDatePicker";
  import {
    createInventaire,
  } from "../../../../redux/features/inventaire";
  import { useRouter } from "next/router";
  import { cancelEdit } from "../../../../redux/features/equipment/equipmentSlice";
  
  const AddInventaireForm = () => {
    const dispatch:any = useAppDispatch();
    const etat = [
      { name: "GOOD", french: "Bon etat" },
      { name: "BAD", french: "Mauvais" },
      { name: "BROKEN", french: "inutilisable" },
    ];
    const route = useRouter();
    const { isEditing, equipment } = useAppSelector(
        (state) => state.equipment
    );
   
    const dureAmortissement = isEditing ? equipment?.dureAmortissement : null;
    const acquisitionValue = isEditing ? equipment?.acquisitionValue : null;
    const handleSubmit = async (values: any) => {
        try {
            if (isEditing) {
                await dispatch(createInventaire(values));
                route.push("/materiels/inventaire");
            }
            route.push("/materiels/inventaire");
        } catch (error) {
            console.log("error", error);
        }
    };
    return (
        <Container maxWidth="xl" sx={{ pb: 5 }}>
            <Formik
                enableReinitialize
                initialValues={{
                    equipmentId: isEditing? equipment?.id : "",
                    dateInventaire: new Date(),
                    datePreciation: new Date(),
                    etatMateriel: "",
                    dureDeVie: 0,
                    valeurInventaire: 0,
                }}
                validationSchema={Yup.object({
                    dateInventaire: Yup.date().required("Veuillez saisir une date"),
                    datePreciation: Yup.date().required("Veuillez saisir une date"),
                    etatMateriel: Yup.string().required("Veuillez sélectionner un eta matériel"),
                    dureDeVie: Yup.number().required(
                        "Veuillez remplir le durée de vie"
                    ),
                    valeurInventaire: Yup.number().required(
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
                            Ajouter inventaire
                        </Typography>
                    </SectionNavigation>
                    <Divider />
                    </NavigationContainer>
                    <FormContainer spacing={2}>
                        <input name="equipmentId" value={formikProps.values.equipmentId} type="text" hidden/>
                        <Typography variant="h6" id="materiel" component="div">
                                Inventaire {isEditing? equipment?.designation +" "+equipment?.numOptim : ""}
                        </Typography>
                        <OSDatePicker
                            fullWidth
                            label="Date inventaire"
                            name = "dateInventaire"
                            value={formikProps.values.dateInventaire}
                            onChange={(value: any) =>
                                formikProps.setFieldValue("dateInventaire", value)
                            }
                        />
                        <OSDatePicker
                            fullWidth
                            name="datePreciation"
                            label="Date dépréciation"
                            value={formikProps.values.datePreciation}
                            onChange={(value: any) =>
                                formikProps.setFieldValue("datePreciation", value)
                            }
                        />
                        <OSTextField
                            name="dureDeVie"
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Durée de vie"
                            type="number"
                            min="0"
                        />
                        <OSTextField
                            name="valeurInventaire"
                            fullWidth
                            value = { 
                                dureAmortissement && acquisitionValue ? (
                                    (formikProps.values.dureDeVie > dureAmortissement ) ? null : Math.round( acquisitionValue - (formikProps.values.dureDeVie * acquisitionValue / dureAmortissement))
                                ):0
                            }
                            id="outlined-basic"
                            label="Valeur"
                            variant="outlined"
                            type="number"
                            min="0"
                        />
                        <FormControl fullWidth>
                        <OSSelectField
                            id="outlined-basic"
                            label="Etat matériel"
                            name="etatMateriel"
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
  