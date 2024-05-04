import {
  Container,
  styled,
  Stack
} from "@mui/material";
import { useRouter } from "next/router";
import { Formik } from "formik";
import * as Yup from "yup";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { createSuiviCarburant, editSuiviCarburant, updateSuiviCarburant } from "../../../../redux/features/suivi_carburant/suiviCarburantSlice";
import useFetchSuiviCarburants from "../hooks/useFetchSuiviCarburant";
import useFetchTransportationEquipments from "../../hooks/useFetchTransportationEquipments";
import {  updateTransportationEquipment } from "../../../../redux/features/transportation_equipment";
import SuiviForm from "./SuiviForm";

const FormSuiviCarburant = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = route.query;
  const fetchSuiviCarburant = useFetchSuiviCarburants()
  const { isEditing, suiviCarburant } = useAppSelector((state) => state.suiviCarburant);
  const fetchMateriels = useFetchTransportationEquipments();
  const { transportationEquipment, transportationEquipments } = useAppSelector((state) => state.transportationEquipment)

  React.useEffect(() => {
    fetchMateriels();
    if (id) {
      dispatch(editSuiviCarburant({ id }));
    }
  }, [id]);

  const ListMateriel: { id: string, name: string ,unitPrice:number}[] = [];
  let kilometrageInit: number = 0;
  let reserve: number = 0;
  let resteCarburant: number = 0;

  // let [selectMateriel, setSelectMateriel] = React.useState('');
  const [materiel, setMateriel] = React.useState("");

  if (transportationEquipments.length > 0) {
    transportationEquipments.forEach((element: any) => {
      if (element.id === materiel) {
        kilometrageInit = element["kilometrageActuel"];
        reserve = element["reservoir"];
        resteCarburant = element["reste"];
      }
      if (element["status"] === "Location interne") {
        ListMateriel.push({ id: element.id, name: element.registration ,unitPrice: element.typeEquipment.unitPrice});
      }
    });
  } else {
    console.log("Rien")
  }
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

      fetchSuiviCarburant()
      route.push("/materiel_de_transport/suivi_carburant");
    } catch (error) {
      console.log("error", error);
    }
  };

  const updateTransport = async (values: any) => {
    try {
      if (values.materiel != "") {
        const updatedReste = calculateUpdatedReste(values);

        await dispatch(
          updateTransportationEquipment({
            id: values.materiel!,
            transportationEquipment: {
              ...transportationEquipment,
              reste: updatedReste,
              kilometrageActuel: values.kilometrageFinal
            },
          })
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };


  const calculateUpdatedReste = (values: any) => {

    const calcul1 = values.kilometrageFinal - kilometrageInit;

    if (calcul1 >= 0) {
      const calcul2 = (calcul1 * reserve) / kilometrageInit;

      if (resteCarburant !== undefined) {
        if (calcul2 > 0) {
          resteCarburant = parseInt((reserve - calcul2).toFixed(1));
          return resteCarburant;
        }
      } else {
        return resteCarburant !== undefined ? resteCarburant : 0;
      }
    } else {
      const calcul3 = (calcul1 * reserve) / kilometrageInit;
      resteCarburant = calcul3;
      return resteCarburant;
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5, mb: 4 }}>
      <Formik
        enableReinitialize
        initialValues={{
          materiel: isEditing ? suiviCarburant?.materiel : materiel,
          date: isEditing ? suiviCarburant?.date : new Date(),
          itineraire: isEditing ? suiviCarburant?.itineraire : "",
          personnelTransporte: isEditing ? suiviCarburant?.personnelTransporte : "",
          kilometrageFinal: isEditing ? suiviCarburant?.kilometrageFinal : 0,
          montant: isEditing ? suiviCarburant?.montant : 0,
          grant: isEditing ? suiviCarburant?.grant : "",
          pu: isEditing ? suiviCarburant?.pu : ListMateriel.find((e:any) => e.id === materiel)?.unitPrice,
          ligneBudgetaire: isEditing ? suiviCarburant?.ligneBudgetaire : "",
          modePaiement: isEditing ? suiviCarburant?.modePaiement : "",
        }}
        validationSchema={Yup.object({
          materiel: Yup.string().required("Veuillez remplir le champ matériel"),
          date: Yup.string().required("Veuillez remplir le champ date"),
          itineraire: Yup.string().required(
            "Veuillez remplir le champ itineraire"
          ),
          personnelTransporte: Yup.string().required("Veuillez remplir le champ personne transporté"),
          kilometrageFinal: Yup.number().required("Veuillez remplir le champ kilometrage final"),
          montant: Yup.string().required(
            "Veuillez remplir le champ montant"
          ),
          pu: Yup.number().required("Veuillez remplir le champ prix unitaire"),
          grant: Yup.string().required(
            "Veuillez remplir le champ grant"
          ),
          ligneBudgetaire: Yup.string().required(
            "Veuillez choisir ligne budgetaire"
          ),
          modePaiement: Yup.string().required(
            "Veuillez remplir le champ mode paiement"
          ),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => <SuiviForm formikProps={formikProps} /> }
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
