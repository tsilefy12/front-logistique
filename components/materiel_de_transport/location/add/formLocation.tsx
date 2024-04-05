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
import useFetchTransportationEquipments from "../../hooks/useFetchTransportationEquipments";

const FormLocation = () => {
    const route = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = route.query;
    const fetchLocationTransport = useFetchLocationDeTransport()
    const { isEditing, locationDeTransport } = useAppSelector((state) => state.locationDeTransport);
    const fetchGrant = useFetchGrant();
    const fetchLigneBudgetaire = useFetchLigneBudgetaire()
    const { grantList } = useAppSelector((state) => state.grant);
    const { budgetLineList } = useAppSelector((state) => state.lineBugetaire)
    const { vendors } = useAppSelector((state) => state.vendor)
    const fetchVendors = useFetchVendors();
    const fetchMateriels = useFetchTransportationEquipments();
    const { transportationEquipments } = useAppSelector((state) => state.transportationEquipment)

    React.useEffect(() => {
        fetchGrant();
        fetchLigneBudgetaire();
        fetchVendors();
        fetchMateriels();
        if (id) {
            dispatch(editLocation({ id }));
        }
    }, [id]);
    const listMateriel: { id: string, name: string }[] = [];

    if (transportationEquipments.length > 0) {
        transportationEquipments.forEach((element: any) => {
            if (element["status"] === "Location") {
                listMateriel.push({ id: element.id, name: element.registration });
            }
        });
    } else {
        console.log("Rien")
    }
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
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <Container maxWidth="xl" sx={{ pb: 5, mb: 4 }}>
            <Formik
                enableReinitialize={isEditing ? true : false}
                initialValues={{
                    materiel: isEditing ? locationDeTransport?.materiel : "",
                    date: isEditing ? locationDeTransport?.date : new Date(),
                    responsable: isEditing ? locationDeTransport?.responsable : "",
                    referenceBudgetaire: isEditing ? locationDeTransport?.referenceBudgetaire : "",
                    nombreJour: isEditing ? locationDeTransport?.nombreJour : 0,
                    fournisseur: isEditing ? locationDeTransport?.fournisseur : "",
                    pu: isEditing ? locationDeTransport?.pu : 0,
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
                    nombreJour: Yup.number().required(
                        "Veuillez remplir le champ nombre de jour"
                    ),
                    fournisseur: Yup.string().required(
                        "Veuillez remplir le champ fournisseur"
                    ),
                    pu: Yup.number().required(
                        "Veuillez remplir le champ prix unitaire"
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
                                <OSSelectField
                                    fullWidth
                                    id="outlined-basic"
                                    label="Matériel"
                                    variant="outlined"
                                    options={listMateriel}
                                    dataKey="name"
                                    valueKey="id"
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
                            <Stack direction="row" spacing={3} margin={2}>
                                <FormControl fullWidth>
                                    <OSTextField
                                        id="outlined-basic"
                                        label="Nombre de jour"
                                        name="nombreJour"
                                        type="number"
                                        min="0"
                                        value={formikProps.values.nombreJour}
                                        onChange={(event: any) => {
                                            const newValue = parseInt(event.target.value);
                                            formikProps.setFieldValue("nombreJour", newValue);
                                            const newMontant = newValue * (formikProps.values.pu ?? 0);
                                            formikProps.setFieldValue("montant", newMontant);
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <OSTextField
                                        id="outlined-basic"
                                        label="prix unitaire"
                                        variant="outlined"
                                        name="pu"
                                        type="number"
                                        min="0"
                                        value={formikProps.values.pu}  
                                        onChange={(event: any) => {
                                            const newValue = parseInt(event.target.value); 
                                            formikProps.setFieldValue("pu", newValue); 
                                            const newMontant = (formikProps.values.nombreJour ?? 0) * newValue; 
                                            formikProps.setFieldValue("montant", newMontant); 
                                        }}
                                    />
                                </FormControl>
                                <FormControl fullWidth>
                                    <OSTextField
                                        id="outlined-basic"
                                        label="Montant"
                                        variant="outlined"
                                        value={(formikProps.values.nombreJour ?? 0) * (formikProps.values.pu ?? 0)}
                                        name="montant"
                                        type="number"
                                        min="0"
                                        disabled
                                    />
                                </FormControl>
                            </Stack>
                            <Stack direction="row" spacing={2} margin={2}>
                                <OSSelectField
                                    id="outlined-basic"
                                    label="Fournisseur"
                                    variant="outlined"
                                    options={vendors}
                                    dataKey={["name"]}
                                    valueKey="id"
                                    name="fournisseur"
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
