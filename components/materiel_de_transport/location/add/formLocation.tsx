import {
    Button,
    Container,
    styled,
    Typography,
    FormControl,
    Stack,
    Divider,
    TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { createLocation, editLocation, updateLocation } from "../../../../redux/features/location/locationSlice";
import { cancelEdit } from "../../../../redux/features/location/locationSlice";
import OSTextField from "../../../shared/input copy/OSTextField";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import useFetchLocationDeTransport from "../hooks/useFetchLocationDeTransport";
import useFetchGrant from "../../suivi_carburant/hooks/useFetchGrant";
import useFetchLigneBudgetaire from "../../suivi_carburant/hooks/useFetchLigneBudgetaire";
import OSSelectField from "../../../shared/select/OSSelectField";
import useFetchVendors from "../../../vendor/hooks/useFetchVendors";

const FormLocation = () => {
    const route = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = route.query;
    const fetchLocationTransport = useFetchLocationDeTransport()
    const { isEditing, locationDeTransport } = useAppSelector((state) => state.locationDeTransport);
    const fetchGrant = useFetchGrant();
    const fetchLigneBudgetaire = useFetchLigneBudgetaire()
    const { grantList } = useAppSelector((state) =>state.grant);
    const { budgetLineList} = useAppSelector((state) =>state.lineBugetaire) 
    const { vendors} = useAppSelector((state) =>state.vendor)
    const fetchVendors = useFetchVendors();

    React.useEffect(() => {
        fetchGrant();
        fetchLigneBudgetaire();
        fetchVendors();
        if (id) {
          dispatch(editLocation({ id }));
        }
      }, [id]);

      console.log("vendor :", vendors);

    const handleSubmit = async (values: any) => {

        try {
            if (isEditing) {
                await dispatch(
                    updateLocation({
                        id: locationDeTransport.id!,
                        location: values,
                    })
                   
                );
            } else {
                await dispatch(createLocation(values));
            }
            fetchLocationTransport()
            route.push("/materiel_de_transport/location");
            console.log("mandalo ato")
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ pb: 5, mb: 4 }}>
            <Formik
                enableReinitialize
                initialValues={{
                    materiel: isEditing ? locationDeTransport?.materiel : "",
                    date: isEditing ? locationDeTransport?.date : new Date(),
                    responsable: isEditing ? locationDeTransport?.responsable : "",
                    referenceBudgetaire: isEditing ? locationDeTransport?.referenceBudgetaire : "",
                    prestataire: isEditing ? locationDeTransport?.prestataire : "",
                    nif: isEditing ? locationDeTransport?.nif : "",
                    stat: isEditing ? locationDeTransport?.stat : "",
                    montant: isEditing ? locationDeTransport?.montant : "",
                    grant: isEditing ? locationDeTransport?.grant : "",
                    ligneBudgetaire: isEditing ? locationDeTransport?.ligneBudgetaire : "",
                    itineraire: isEditing ? locationDeTransport?.itineraire : "",
                }}
                validationSchema={Yup.object({
                    materiel: Yup.string().required("Veuillez remplir le champ matériel"),
                    date: Yup.string().required("Veuillez remplir le champ date"),
                    responsable: Yup.string().required("Veuillez remplir le champ responsable"),
                    referenceBudgetaire: Yup.string().required(
                        "Veuillez remplir le champ référence budgetaire"
                    ),
                    prestataire: Yup.string().required(
                        "Veuillez remplir le champ prestataire"
                    ),
                    nif: Yup.string().required(
                        "Veuillez remplir le champ nif"
                    ),
                    stat: Yup.string().required(
                        "Veuillez remplir le champ stat"
                    ),
                    montant: Yup.string().required(
                        "Veuillez remplir le champ montant"
                    ),
                    grant: Yup.string().required(
                        "Veuillez remplir le champ grant"
                    ),
                    ligneBudgetaire: Yup.string().required(
                        "Veuillez remplir le champ ligne budgetaire"
                    ),
                    itineraire: Yup.string().required(
                        "Veuillez remplir le champ itinéraire"
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
                                        <Link href="/materiel_de_transport/location/">
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
                                            {isEditing ? "Modifier" : "Ajouter"}
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
                                        {isEditing ? "Modifier" : "Ajouter"}
                                    </Typography>
                                </SectionNavigation>
                                <Divider />
                            </NavigationContainer>
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={2}
                                margin={2}
                            >
                                <OSTextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Matériel"
                                    variant="outlined"
                                    name="materiel"
                                />
                                <OSTextField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Responsable"
                                    variant="outlined"
                                    name="responsable"
                                />
                            </Stack>
                            <Stack direction="row" spacing={2} margin={2}>
                                <FormControl fullWidth>
                                    <OSDatePicker
                                        id="outlined-basic"
                                        label="Date"
                                        variant="outlined"
                                        value={formikProps.values.date}
                                        onChange={(value: any) => formikProps.setFieldValue("date", value)}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <OSTextField
                                        id="outlined-basic"
                                        label="Référence budgetaire"
                                        name="referenceBudgetaire"
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction="row" spacing={2} margin={2}>
                                <FormControl fullWidth>
                                    <OSTextField
                                        id="outlined-basic"
                                        label="Prestataire"
                                        name="prestataire"
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <OSTextField
                                        id="outlined-basic"
                                        label="Montant"
                                        variant="outlined"
                                        name="montant"
                                        type="number"
                                        min="0"
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction="row" spacing={2} margin={2}>
                                <OSSelectField
                                    id="outlined-basic"
                                    label="Nif"
                                    variant="outlined"
                                    options={vendors}
                                    dataKey={["nif"]}
                                    valueKey="id"
                                    name="nif"
                                />
                                <OSSelectField
                                    id="outlined-basic"
                                    label="stat"
                                    variant="outlined"
                                    options={vendors}
                                    dataKey={["website"]}
                                    valueKey="id"
                                    name="stat"
                                />

                            </Stack>
                            <Stack
                                direction="row"
                                spacing={3}
                                margin={2}
                            >
                                <OSSelectField
                                    id="outlined-basic"
                                    label="Grant"
                                    variant="outlined"
                                    options={grantList}
                                    dataKey={["code"]}
                                    valueKey="id"
                                    name="grant"
                                />
                                <OSSelectField
                                    id="outlined-basic"
                                    label="Ligne budgetaire"
                                    variant="outlined"
                                    options={budgetLineList}
                                    dataKey={["code"]}
                                    valueKey="id"
                                    name="ligneBudgetaire"
                                    type="text"
                                />
                                <OSTextField
                                    id="outlined-basic"
                                    label="Itinéraire"
                                    variant="outlined"
                                    name="itineraire"
                                    type="text"
                                />
                            </Stack>
                        </Form>
                    );
                }}
            </Formik>
        </Container>
    );
};

export default FormLocation;

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
