import { Container, styled, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  createSuiviCarburant,
  editSuiviCarburant,
  updateSuiviCarburant,
} from "../../../../redux/features/suivi_carburant/suiviCarburantSlice";
import useFetchSuiviCarburants from "../hooks/useFetchSuiviCarburant";
import useFetchTransportationEquipments from "../../hooks/useFetchTransportationEquipments";
import { updateTransportationEquipment } from "../../../../redux/features/transportation_equipment";
import SuiviForm from "./SuiviForm";

const FormSuiviCarburant = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = route.query;
  const fetchSuiviCarburant = useFetchSuiviCarburants();
  const { isEditing, suiviCarburant } = useAppSelector(
    (state) => state.suiviCarburant
  );
  const fetchMateriels = useFetchTransportationEquipments();
  const { transportationEquipment, transportationEquipments } = useAppSelector(
    (state) => state.transportationEquipment
  );

  React.useEffect(() => {
    fetchMateriels();
    if (id) {
      dispatch(editSuiviCarburant({ id }));
    }
  }, [id]);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateSuiviCarburant({
            id: suiviCarburant.id!,
            suiviCarburant: values,
          })
        );
      } else {
        await dispatch(createSuiviCarburant(values));
        updateTransport(values);
      }

      fetchSuiviCarburant();
      route.push("/materiel_de_transport/suivi_carburant");
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateTransport = async (values: any) => {
    console.log(values.materiel);
    try {
      if (transportationEquipments.filter((t) => t.id === values.materiel)) {
        const updatedReste = calculateUpdatedReste(values);

        await dispatch(
          updateTransportationEquipment({
            id: values.materiel!,
            transportationEquipment: {
              reste: updatedReste,
              kilometrageActuel: values.kilometrageFinal,
            },
          })
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const calculateUpdatedReste = (values: any) => {
    const km =
      values.kilometrageFinal -
      transportationEquipments.find((e) => e.id === values.materiel)!
        .kilometrageActuel!;
    const carburants =
      (km *
        transportationEquipments.find((e) => e.id === values.materiel)!
          .consommation!) /
      100;
    console.log(carburants);
    return (
      transportationEquipments.find((e) => e.id === values.materiel)!.reste! -
      carburants
    );
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5, mb: 4 }}>
      <Formik
        enableReinitialize
        initialValues={{
          materiel: isEditing ? suiviCarburant?.materiel : "",
          date: isEditing ? suiviCarburant?.date : new Date(),
          itineraire: isEditing ? suiviCarburant?.itineraire : "",
          personnelTransporte: isEditing
            ? suiviCarburant?.personnelTransporte
            : "",
          kilometrageFinal: isEditing ? suiviCarburant?.kilometrageFinal : 0,
          montant: isEditing ? suiviCarburant?.montant : 0,
          grant: isEditing ? suiviCarburant?.grant : "",
          pu: isEditing ? suiviCarburant?.pu : 0,
          ligneBudgetaire: isEditing ? suiviCarburant?.ligneBudgetaire : "",
          modePaiement: isEditing ? suiviCarburant?.modePaiement : "",
        }}
        validationSchema={Yup.object({
          materiel: Yup.string().required("Veuillez remplir le champ matériel"),
          date: Yup.string().required("Veuillez remplir le champ date"),
          itineraire: Yup.string().required(
            "Veuillez remplir le champ itineraire"
          ),
          personnelTransporte: Yup.string().required(
            "Veuillez remplir le champ personne transporté"
          ),
          kilometrageFinal: Yup.number().required(
            "Veuillez remplir le champ Kilométrage final"
          ),
          montant: Yup.string().required("Veuillez remplir le champ montant"),
          pu: Yup.number().required("Veuillez remplir le champ prix unitaire"),
          grant: Yup.string().required("Veuillez remplir le champ grant"),
          ligneBudgetaire: Yup.string().required(
            "Veuillez choisir ligne budgetaire"
          ),
          modePaiement: Yup.string().required(
            "Veuillez remplir le champ mode paiement"
          ),
        })}
        onSubmit={(value: any, action: any) => {
          if (
            transportationEquipments.find((e) => e.id === value.materiel) &&
            value.kilometrageFinal <
              transportationEquipments.find((e) => e.id === value.materiel)!
                .kilometrageActuel!
          )
            return;
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => <SuiviForm formikProps={formikProps} />}
      </Formik>
    </Container>
  );
};

export default FormSuiviCarburant;

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
