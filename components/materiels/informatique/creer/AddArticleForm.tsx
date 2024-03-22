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
import React, { useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSSelectField from "../../../shared/select/OSSelectField";
import OSTextField from "../../../shared/input copy/OSTextField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import {
  createEquipment,
  getEmployees,
  updateEquipment,
} from "../../../../redux/features/equipment";
import { useRouter } from "next/router";
import { cancelEdit } from "../../../../redux/features/equipment/equipmentSlice";
import { getFournisseurList } from "../../../../redux/features/fournisseur/useCase/getFournisseurListe";
import { getTypeEquipmentList } from "../../../../redux/features/typeEquipment";
import { getBonCommandeInternes } from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";

const AddArticleForm = () => {
  const dispatch = useAppDispatch();
  const etat = [
    { name: "GOOD", french: "Bon etat" },
    { name: "BAD", french: "Mauvais" },
    { name: "BROKEN", french: "inutilisable" },
  ];
  const route = useRouter();

    const { employees, isEditing, equipment } = useAppSelector(
        (state) => state.equipment
    );
    const { fournisseurList } = useAppSelector( (state) => state.fournisseur);
    const { typeEquipmentList } = useAppSelector( (state) => state.typeEquipment);
    const { bonCommandeInternes } = useAppSelector((state) => state.bonCommandeInterne);
    
    const fetchUtilsData = () => {
        dispatch(getFournisseurList({}));
        dispatch(getEmployees({}));
        dispatch(getTypeEquipmentList({}));
        dispatch(getBonCommandeInternes({}));
    };

    useEffect(() => {
        fetchUtilsData();
    }, []);
    
    const LigneBudgetaireList = [
        {id :"test1",name:"test1"},
        {id :"test2",name:"test2"},
        {id :"test3",name:"test3"}
    ]
    const GrantList = [
        {id :"test1",name:"test1"},
        {id :"test2",name:"test2"},
        {id :"test3",name:"test3"}
    ]
    const categorie = [
        {id :"Informatique",name:"Informatique"},
        {id :"Eléctronique",name:"Eléctronique"}
    ]
    const handleSubmit = async (values: any) => {
      values.acquisitionDate = new Date(values?.acquisitionDate).toISOString();
      try {
        if (isEditing) {
          await dispatch(
            updateEquipment({
              id: equipment.id!,
              equipment: values,
            })
          );
        } else {
          await dispatch(createEquipment(values));
        }
        route.push("/materiels/informatiques");
      } catch (error) {
        console.log("error", error);
      }
    };
    return (
        <Container maxWidth="xl" sx={{ pb: 5 }}>
        <Formik
            enableReinitialize
            initialValues={{
                numOptim: isEditing ? equipment?.numOptim : "",
                additionalInformation: isEditing
                    ? equipment?.additionalInformation
                    : "",
                acquisitionDate: isEditing ? equipment?.acquisitionDate : new Date(),
                acquisitionValue: isEditing ? equipment?.acquisitionValue : 0,
                designation: isEditing ? equipment?.designation : "",
                status: isEditing ? equipment?.status : "",
                ownerId: isEditing ? equipment?.ownerId : "",
                typeEquipmentId: isEditing ? equipment?.typeEquipmentId: "",
                dureAmortissement: isEditing ? equipment?.dureAmortissement: 0,
                dateAmortissement: isEditing ? equipment?.dateAmortissement: new Date(),
                fournisseur: isEditing ? equipment?.fournisseur: "",
                categorieMateriel: isEditing ? equipment?.categorieMateriel: "",
                grant: isEditing ? equipment?.grant: "",
                ligneBudgetaire :isEditing ? equipment?.ligneBudgetaire: "",

            }}
            validationSchema={Yup.object({
                numOptim: Yup.string().required("Veuillez sélectionner un numOptim"),
                additionalInformation: Yup.string(),
                acquisitionDate: Yup.date(),
                acquisitionValue: Yup.number(),
                designation: Yup.string().required(
                    "Veuillez remplir le champ designation"
                ),
                status: Yup.string().required("Veuillez sélectionner un status"),
                typeEquipmentId: Yup.string().required(
                "Veuillez sélectionner un type"
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
                        {isEditing ? "Modifier" : "Ajouter"} materiels
                    </Typography>
                    </SectionNavigation>
                    <Divider />
                </NavigationContainer>
                <FormContainer spacing={2}>
                    <CustomStack
                        direction={{
                            xs: "column",
                            sm: "column",
                            md: "row",
                        }}
                        spacing={{ xs: 2, sm: 2, md: 1 }}
                    >
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            label="CODE"
                            variant="outlined"
                            name="numOptim"
                        />
                        <FormControl fullWidth>
                            <OSSelectField
                                id="outlined-basic"
                                label="Type"
                                name="typeEquipmentId"
                                options={typeEquipmentList}
                                dataKey={["type"]}
                                valueKey="id"
                                type="text"
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <OSSelectField
                                id="workplaceId"
                                label="Etat"
                                name="status"
                                options={etat}
                                dataKey="french"
                                valueKey="name"
                            />
                        </FormControl>
                    </CustomStack>
                    <CustomStack
                        direction={{
                            xs: "column",
                            sm: "column",
                            md: "row",
                        }}
                        spacing={{ xs: 2, sm: 2, md: 1 }}
                        >
                            <FormControl fullWidth>
                        <OSSelectField
                            id="outlined-basic"
                            label="Employé utilisateur"
                            name="ownerId"
                            options={employees}
                            dataKey={["id","name","surname"]}
                            valueKey="id"
                            type="text"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSSelectField
                            id="outlined-basic"
                            name="fournisseur"
                            label="Fournisseur"
                            options={fournisseurList}
                            dataKey={["name"]}
                            valueKey="id"
                            type="text"
                        />
                    </FormControl>
                    </CustomStack>
                    <CustomStack
                    direction={{
                        xs: "column",
                        sm: "column",
                        md: "row",
                    }}
                    spacing={{ xs: 2, sm: 2, md: 1 }}
                    >

                    <OSDatePicker
                        fullWidth
                        label="Date d'acquisition"
                        name="acquisitionDate"
                        onChange={(value: any) =>
                            formikProps.setFieldValue("acquisitionDate", value)
                        }
                    />
                    <OSTextField
                        name="acquisitionValue"
                        fullWidth
                        id="outlined-basic"
                        label="Valeur d'acquisition"
                        variant="outlined"
                        type="number"
                    />
                    <OSSelectField
                        id="outlined-basic"
                        label="BCI"
                        name="bci"
                        options={bonCommandeInternes}
                        dataKey="numBon"
                        valueKey="id"
                        type="text"
                    />
                    {/* <OSTextField
                        name="additionalInformation"
                        fullWidth
                        id="outlined-basic"
                        label="Information suplémentaire"
                        variant="outlined"
                    /> */}
                    </CustomStack>
                    <Stack direction="row" spacing={3} >
                        <OSTextField
                            name="designation"
                            fullWidth
                            id="outlined-basic"
                            label="Déscription"
                            variant="outlined"
                        />
                        <OSTextField
                            name="dureAmortissement"
                            fullWidth
                            id="outlined-basic"
                            label="Durée d'amortissement"
                            variant="outlined"
                            type="number"
                        />
                        <OSDatePicker
                            name="dateAmortissement"
                            fullWidth
                            id="outlined-basic"
                            label="Date d'amortissement"
                            variant="outlined"
                            onChange={(value: any) =>
                                formikProps.setFieldValue("dateAmortissement", value)
                            }
                        />
                    </Stack>
                    <Stack direction="row" spacing={3} >
                        <OSSelectField
                            id="outlined-basic"
                            name="grant"
                            label="Grant"
                            options={GrantList}
                            dataKey={["name"]}
                            valueKey="id"
                            type="text"
                        />
                        <OSSelectField
                            id="outlined-basic"
                            name="ligneBudgetaire"
                            label="Ligne budgétaire"
                            options={LigneBudgetaireList}
                            dataKey={["name"]}
                            valueKey="id"
                            type="text"
                        />
                        <OSSelectField
                            id="outlined-basic"
                            name="categorieMateriel"
                            label="Catégorie Matériel"
                            options={categorie}
                            dataKey={["name"]}
                            valueKey="id"
                            type="text"
                        />
                    </Stack>
                </FormContainer>
                </Form>
            );
            }}
        </Formik>
        </Container>
    );
};

export default AddArticleForm;

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