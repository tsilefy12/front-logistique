import {
    Button,
    Container,
    styled,
    Typography,
    FormControl,
    Stack,
    Divider,
  } from "@mui/material";
  import { useRouter } from "next/router";
  import Link from "next/link";
  import { Form, Formik } from "formik";
  import * as Yup from "yup";
  import * as React from "react";
  import ArrowBack from "@mui/icons-material/ArrowBack";
  import { Check, Close } from "@mui/icons-material";
  import OSDatePicker from "../../../shared/date/OSDatePicker";
  import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
  import OSTextField from "../../../shared/input copy/OSTextField";

  import { cancelEdit, editMissionDeTransport } from "../../../../redux/features/mission_transport/missionTransportSlice";
import { createMissionDeTransport, updateMissionDeTransport } from "../../../../redux/features/mission_transport/missionTransportSlice";
import useFetchMissionTransport from "../hooks/useFectMission";
import useFetchGrant from "../../suivi_carburant/hooks/useFetchGrant";
import useFetchLigneBudgetaire from "../../suivi_carburant/hooks/useFetchLigneBudgetaire";
import OSSelectField from "../../../shared/select/OSSelectField";
  
  const FormMission = () => {
    const route = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = route.query;
    const {isEditing, missionTransport} = useAppSelector((state) =>state.missionDeTransport);
    const fetchMissionTransport = useFetchMissionTransport()
    const fetchGrant = useFetchGrant();
    const fetchLigneBudgetaire = useFetchLigneBudgetaire()
    const { grantList } = useAppSelector((state) =>state.grant);
    const { budgetLineList} = useAppSelector((state) =>state.lineBugetaire) 
    React.useEffect(() => {
       fetchGrant();
       fetchLigneBudgetaire();
       fetchMissionTransport();
      if (id) {
        dispatch(editMissionDeTransport({ id }));
      }
    }, [id]);
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
          console.log("mandalo ato")
        }
        fetchMissionTransport();
        route.push("/materiel_de_transport/mission");
      } catch (error) {
        console.log("error", error);
      }
    };
  
    return (
      <Container maxWidth="xl" sx={{ pb: 5, mb: 4 }}>
        <Formik
          enableReinitialize
          initialValues={{
            materiel: isEditing ? missionTransport?.materiel : "",
            pj: isEditing ? missionTransport?.pj : "",
            date: isEditing ? missionTransport?.date : new Date(),
            libelle: isEditing ? missionTransport?.libelle : "",
            utilisateur: isEditing ? missionTransport?.utilisateur : "",
            montant: isEditing ? missionTransport?.montant : "",
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
            montant: Yup.string().required(
              "Veuillez remplir le champ montant"
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
          {(formikProps) => {
            return (
              <Form>
                <NavigationContainer>
                  <SectionNavigation>
                    <Stack flexDirection={"row"}>
                      <Link href="/materiel_de_transport/mission/">
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
                      label="PJ"
                      variant="outlined"
                      name="pj"
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
                      label="Libellé"
                      name="libelle"
                    />
                  </FormControl>
                  </Stack>
                  <Stack direction="row" spacing={2} margin={2}> 
                  <FormControl fullWidth>
                    <OSTextField
                      id="outlined-basic"
                      label="Utilisateur"
                      name="utilisateur"
                      min="0"
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
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={3}
                    margin={2}
                  >
                    <FormControl fullWidth>
                      <OSSelectField
                        id="outlined-basic"
                        label="Grant"
                        variant="outlined"
                        options={grantList}
                        dataKey={["code"]}
                        valueKey="id"
                        name="grant"
                      />
                    </FormControl>
                    <FormControl fullWidth>
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
                    </FormControl>
                  </Stack>
              </Form>
            );
          }}
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
  