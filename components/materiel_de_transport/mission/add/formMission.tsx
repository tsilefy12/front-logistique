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
import { editMissionDeTransport } from "../../../../redux/features/mission_transport/missionTransportSlice";
import { createMissionDeTransport, updateMissionDeTransport } from "../../../../redux/features/mission_transport/missionTransportSlice";
import MissionForm from "./MissionForm";

const FormMission = () => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = route.query;
  const { isEditing, missionTransport } = useAppSelector((state) => state.missionDeTransport);
 
    React.useEffect(() => {
      if (id) {
        dispatch(editMissionDeTransport({ id }));
      }
    }, [id])
    const handleSubmit = async (values: any) => {

      try {
        if (isEditing) {
          await dispatch(
            updateMissionDeTransport({
              id: missionTransport.id!,
              mission: values,
            })
          );
        } else {
          await dispatch(createMissionDeTransport(values));
        }
        route.push("/materiel_de_transport/mission");
      } catch (error) {
        console.log("error", error);
      }
    };

    return (
      <Container maxWidth="xl" sx={{ pb: 5, mb: 4 }}>
        <Formik
          enableReinitialize={isEditing ? true : false}
          initialValues={{
            materiel: isEditing ? missionTransport?.materiel : "",
            pj: isEditing ? missionTransport?.pj : "",
            date: isEditing ? missionTransport?.date : new Date(),
            libelle: isEditing ? missionTransport?.libelle : "",
            utilisateur: isEditing ? missionTransport?.utilisateur : "",
            nombreJour: isEditing ? missionTransport?.nombreJour : 0,
            pu: isEditing ? missionTransport?.pu : 0,
            grant: isEditing ? missionTransport?.grant : "",
            ligneBudgetaire: isEditing ? missionTransport?.ligneBudgetaire : "",

          }}
          validationSchema={Yup.object({
            materiel: Yup.string().required("Veuillez remplir le champ matériel"),
            pj: Yup.string().required(
              "Veuillez remplir le champ PJ"
            ),
            date: Yup.string().required("Veuillez remplir le champ date"),
            libelle: Yup.string().required("Veuillez remplir le champ libellé"),
            utilisateur: Yup.string().required(
              "Veuillez remplir le champ utilisateur"
            ),
            nombreJour: Yup.number().required(
              "Veuillez remplir le champ nombre de jour"
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
          })}
          onSubmit={(value: any, action: any) => {
            handleSubmit(value);
            action.resetForm();
          }}
        >
          {(formikProps) => <MissionForm formikProps={formikProps}/>}
        </Formik>
      </Container>
    );
};

export default FormMission;

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
