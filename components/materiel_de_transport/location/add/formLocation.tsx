import {
    Container,
    styled,
    Stack,
} from "@mui/material";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { createLocation, editLocation, updateLocation } from "../../../../redux/features/location/locationSlice";
import useFetchLocationDeTransport from "../hooks/useFetchLocationDeTransport";
import useFetchTransportationEquipments from "../../hooks/useFetchTransportationEquipments";
import LocationForm from "./LocationForm";

const FormLocation = () => {
    const route = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = route.query;
    const fetchLocationTransport = useFetchLocationDeTransport()
    const { isEditing, locationDeTransport } = useAppSelector((state) => state.locationDeTransport);
    const fetchMateriels = useFetchTransportationEquipments();
    const { transportationEquipments } = useAppSelector((state) => state.transportationEquipment)

    React.useEffect(() => {
        fetchMateriels();
        if (id) {
            dispatch(editLocation({ id }));
        }
    }, [id]);
    console.log("data location :", transportationEquipments)
    const listMateriel: { id: string, name: string }[] = [];

    if (transportationEquipments.length > 0) {
        transportationEquipments.forEach((element: any) => {
            if (element["status"] === "Location externe") {
                listMateriel.push({ id: element.id, name: element.registration });
            }
        });
    } else {
        listMateriel.push({ id: '', name: '' });
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
                {(formikProps) =>   <LocationForm  formikProps={formikProps}/>}
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
