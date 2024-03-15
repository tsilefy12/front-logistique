import {
  Button,
  Container,
  styled,
  Typography,
  Stack,
  Divider,
  Box,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close, Save } from "@mui/icons-material";
import * as Yup from "yup";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import useFetchDetenteurListe from "../../hooks/useFetchDetenteurListe";
import {
  createHolder,
  updateHolder,
} from "../../../../../redux/features/holder";
import { Form, Formik } from "formik";
import { cancelEdit } from "../../../../../redux/features/holder/holderSlice";
import OSTextField from "../../../../shared/input copy/OSTextField";
import OSSelectField from "../../../../shared/select/OSSelectField";
import ListDetentionMateriel from "../table/ListDetentionMateriel";
import { getEmployees } from "../../../../../redux/features/employeStagiaire/employeeSlice";
import { getInterns } from "../../../../../redux/features/employeStagiaire/stagiaireSlice";

const FormDetentionMateriel = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isEditing, holder } = useAppSelector((state) => state.holder);
    const { employees } = useAppSelector((state) => state.employe);
    const { interns } = useAppSelector((state) => state.stagiaire);
    console.log(employees)
    const total = [...employees.map((i:any)=>{
        return {
        id : i.id, name: i.name +" "+ i.surname, type: "employe"
        }
    }),...interns.map((i:any)=>{
        return {
        id : i.id, name: i.name +" "+ i.surname, type: "intern"
        }
    })]
    const fetchUtilsData = () => {
        dispatch(getEmployees({}));
        dispatch(getInterns({}));
    };
    
    useEffect(() => {
        fetchUtilsData();
    }, []);

    const handleSubmit = async (values: any) => {
        try {
        if (isEditing) {
            await dispatch(
            updateHolder({
                id: holder.id!,
                holder: values,
            })
            );
        } else {
            await dispatch(createHolder(values));
        }
        router.push("/materiels/detenteur");
        } catch (error) {
        console.log("error", error);
        }
    };
    const fonctionListe = [
        { id: "COMMUNAUTE_ET_CONSERVATION", name: "COMMUNAUTE_ET_CONSERVATION" },
        { id: "ESPECE_ET_CONSERVATION", name: "ESPECE_ET_CONSERVATION" },
        { id: "ADMINISTRATION", name: "ADMINISTRATION" },
        { id: "SUIVI_ET_EVALUATION", name: "SUIVI_ET_EVALUATION" },
        { id: "RH", name: "RH" },
        { id: "PRESTATAIRE", name: "PRESTATAIRE" },
        { id: "STAGIAIRE", name: "STAGIAIRE" },
        { id: "AUTRES", name: "AUTRES" },
    ];

    return (
        <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
        <Formik
            enableReinitialize
            initialValues={
            isEditing
                ? holder
                : {
                    contact: isEditing ? holder?.contact : "",
                    reference: isEditing ? holder?.reference : "",
                    firstName: isEditing ? holder?.firstName : "",
                    lastName: isEditing ? holder?.lastName : "",
                    matricule: isEditing ? holder?.matricule : "",
                    function: isEditing ? holder?.function : "",
                }
            }
            validationSchema={Yup.object({
            contact: Yup.string().required("Champ obligatoire"),
            reference: Yup.string().required("Champ obligatoire"),
            firstName: Yup.string().required("champ obligatoire"),
            lastName: Yup.string().required("Champ obligatoire"),
            matricule: Yup.string().required("Champ obligatoire"),
            function: Yup.string().required("Champ obligatoire"),
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
                        <Link href="/materiels/detenteur">
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
                        >
                        Annuler
                        </Button>
                    </Stack>
                    <Typography variant="h4">
                        {isEditing ? "Modifier" : "Ajouter"} détenteur de materiels
                    </Typography>
                    </SectionNavigation>
                    <Divider />
                </NavigationContainer>
                <FormContainer spacing={2}>
                    <OSTextField
                    id="outlined-basic"
                    label="Réference"
                    name="reference"
                    variant="outlined"
                    />

                    <Typography variant="h6">Detenteur</Typography>

                    <Stack spacing={2} direction="row">
                    <OSSelectField
                        id="outlined-basic"
                        label="Nom et Prénom"
                        options={total}
                        name="name"
                        variant="outlined" 
                        valueKey={"id"} 
                        dataKey={"name"}
                        />
                    </Stack>
                    <Stack direction="row" spacing={2}>
                    <OSTextField
                        id="outlined-basic"
                        label="Matricule"
                        name="matricule"
                        variant="outlined"
                    />
                    <OSTextField
                        id="outlined-basic"
                        label="Contact"
                        name="contact"
                        variant="outlined"
                    />
                    <OSSelectField
                        id="outlined-basic"
                        label="Fonction"
                        name="function"
                        options={fonctionListe}
                        dataKey="name"
                        valueKey="name"
                    />
                    </Stack>
                </FormContainer>
                </Form>
            );
            }}
        </Formik>
        <Box>
            <ListDetentionMateriel />
        </Box>
        </Container>
    );
};

export default FormDetentionMateriel;

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
