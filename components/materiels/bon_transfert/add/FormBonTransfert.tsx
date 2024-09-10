import { Form, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getEmployees } from "../../../../redux/features/employeStagiaire/employeeSlice";
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import OSTextField from "../../../shared/input/OSTextField";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import OSSelectField from "../../../shared/select/OSSelectField";
import ArrowBack from "@mui/icons-material/ArrowBack";
import OSDateTimePicker from "../../../shared/date/OSDateTimePicker";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { getPrograms } from "../../../../redux/features/program/programSlice";
import useFetchPrestataire from "../../bon_commande_externe/hooks/getPrestataire";
import useFetchBonCommandeExterne from "../../bon_commande_externe/hooks/useFetchBonCommandeExterne";
import useFetchBonCommandeInterne from "../../bon_commande_interne/hooks/useFetchBonCommandeInterne";
import useFetchWorkPlace from "../../bon_commande_externe/hooks/useFetchWorkPlace";

const FormBonTransfert = ({
  formikProps,
  valuesArticle,
  setValuesArticle,
  setIdDelete,
}: {
  formikProps: FormikProps<any>;
  valuesArticle: any;
  setValuesArticle: any;
  setIdDelete: any;
}) => {
  const dispatch = useAppDispatch();

  const { isEditing } = useAppSelector((state) => state.bonTransfert);
  const route = useRouter();

  const { employees } = useAppSelector((state) => state.employe);
  const { interns } = useAppSelector((state) => state.stagiaire);
  const { grantList } = useAppSelector((state) => state.grant);
  const { programs } = useAppSelector((state) => state.program);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );
  const [idValues, setIdValues] = useState<any>({});
  const { bonCommandeExternes } = useAppSelector(
    (state) => state.bonCommendeExterne
  );

  const fetchBonCommandeExterne = useFetchBonCommandeExterne();
  const { bonCommandeInternes } = useAppSelector(
    (state) => state.bonCommandeInterne
  );
  const { workplaces } = useAppSelector((state) => state.workplace);
  const fetchWorkPlace = useFetchWorkPlace();
  const fetchBonCommandeInterne = useFetchBonCommandeInterne();
  const total = [
    ...employees.map((i: any) => {
      const lieuTravail =
        workplaces.find((e: any) => e.id === i.workplaceId)?.name ||
        "Non spécifié";
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "employe",
        lieuTravail: lieuTravail,
      };
    }),
    ...interns.map((i: any) => {
      const lieuTravail =
        workplaces.find((e: any) => e.id === i.workplaceId)?.name ||
        "Non spécifié";
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "intern",
        lieuTravail: lieuTravail,
      };
    }),
    ...prestataireListe.map((i: any) => {
      const lieuTravail =
        workplaces.find((e: any) => e.id === i.workplaceId)?.name ||
        "Non spécifié";
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "prestataire",
        lieuTravail: lieuTravail,
      };
    }),
  ];

  const ExpeditionVia = [
    { id: "1", name: "Voie terrestre" },
    { id: "2", name: "Voie aérienne" },
    { id: "3", name: "Voie ferrée" },
    { id: "4", name: "Voie maritime" },
  ];
  const fetchUtilsData = () => {
    dispatch(getEmployees({}));
    dispatch(getInterns({}));
    dispatch(getGrantList({}));
    dispatch(getPrograms({}));
  };

  useEffect(() => {
    fetchUtilsData();
    fetchPrestataire();
    fetchWorkPlace();
  }, []);

  useEffect(() => {
    const Val: any = total.find(
      (e: any) => e.id === formikProps.values.destination
    );
    formikProps.setFieldValue("type", Val?.type);
  }, [formikProps.values.destination]);

  const ref = [
    ...bonCommandeExternes.map((i: any) => {
      return {
        id: i.id,
        name: i.ref,
      };
    }),
    ...bonCommandeInternes.map((i: any) => {
      return {
        id: i.id,
        name: i.reference,
      };
    }),
    { id: "Don", name: "Don" },
    { id: "Autre", name: "Autre" },
  ];
  useEffect(() => {
    const lieu: any = total.find(
      (e: any) => e.id === formikProps.values.expediteur
    )?.lieuTravail;

    const referenceTana = "BCT/TNR-001";
    const referenceDiego = "BCT/DS-001";
    const referenceAmbatondrazaka = "BCT/AZK-001";
    const referenceMoramanga = "BCT/MRG-001";
    const referenceMorondava = "BCT/MRD-001";

    if (lieu) {
      if (lieu === "Antananarivo" || lieu === "Tana") {
        formikProps.setFieldValue("ref", referenceTana);
      } else if (lieu === "Diego Garcia") {
        formikProps.setFieldValue("ref", referenceDiego);
      } else if (lieu === "Ambatondrazaka") {
        formikProps.setFieldValue("ref", referenceAmbatondrazaka);
      } else if (lieu === "Morondava") {
        formikProps.setFieldValue("ref", referenceMorondava);
      } else if (lieu === "Moramanga") {
        formikProps.setFieldValue("ref", referenceMoramanga);
      } else {
        formikProps.setFieldValue("ref", `BCT/${lieu.slice(0, 3)}-001`);
      }
    } else {
      formikProps.setFieldValue("ref", "BCT/UNKNOWN");
    }
  }, [formikProps.values.expediteur]);
  return (
    <Form>
      <NavigationContainer>
        <SectionNavigation>
          <Stack flexDirection={"row"}>
            <Button
              color="info"
              variant="text"
              startIcon={<ArrowBack />}
              onClick={() => {
                route.back();
                formikProps.resetForm();
              }}
            >
              Retour
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              startIcon={<Check />}
              sx={{ marginInline: 3 }}
              type="submit"
            >
              {isEditing ? "Modifier" : "Enregistrer"}
            </Button>
            <Button
              variant="text"
              color="warning"
              size="small"
              type="reset"
              startIcon={<Close />}
              onClick={() => {
                formikProps.resetForm();
              }}
            >
              Annuler
            </Button>
          </Stack>
          <Typography variant="h4">
            {isEditing ? "Modifier" : "Ajouter"} Bon de transfert
          </Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>
      <FormContainer spacing={2}>
        <Stack
          direction="row"
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Bon de transfert
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <FormControl fullWidth>
            <OSTextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              label="Référence"
              value={formikProps.values.reference}
              name="reference"
            />
          </FormControl>
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Expéditeur"
              name="expediteur"
              options={total}
              dataKey={["name"]}
              valueKey="id"
            />
          </FormControl>
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Destinataire"
              name="destination"
              options={total}
              dataKey={["name"]}
              valueKey="id"
            />
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Expédition via"
              name="expeditionVia"
              options={ExpeditionVia}
              dataKey={["name"]}
              valueKey="name"
            />
          </FormControl>
          <FormControl fullWidth>
            <OSDatePicker
              fullWidth
              id="outlined-basic"
              label="Date d'expédition"
              variant="outlined"
              value={formikProps.values.dateExp}
              onChange={(value: any) =>
                formikProps.setFieldValue("dateExp", value)
              }
            />
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Programme"
              name="programme"
              options={programs}
              dataKey={["name"]}
              valueKey="id"
            />
          </FormControl>
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Grant"
              name="grant"
              options={grantList}
              dataKey={["code"]}
              valueKey="id"
            />
          </FormControl>
        </Stack>
      </FormContainer>
      <Box>
        <FormContainer spacing={2}>
          <Stack
            direction="row"
            sx={{
              flex: "1 1 100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" id="tableTitle" component="div">
              Article à Transferer
            </Typography>
          </Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Référence</TableCell>
                  <TableCell>Designation</TableCell>
                  <TableCell align="left">Quantité commander</TableCell>
                  <TableCell align="left">Quantité expédié</TableCell>
                  <TableCell align="left">Observation</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesArticle.map((item: any, index: any) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{item.ref}</TableCell>
                    <TableCell component="th" scope="row">
                      {item.designation}
                    </TableCell>
                    <TableCell align="left">{item.quantiteCommande}</TableCell>
                    <TableCell align="left">{item.quantiteExpedie}</TableCell>
                    <TableCell align="left">{item.observation}</TableCell>
                    <TableCell
                      align="center"
                      sx={{ width: 150, background: "#F5F5F5" }}
                    >
                      <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                      >
                        <IconButton
                          color="warning"
                          aria-label="Supprimer"
                          component="span"
                          size="small"
                          onClick={() => {
                            formikProps.setFieldValue("ref", item.ref);
                            formikProps.setFieldValue(
                              "designation",
                              item.designation
                            );
                            formikProps.setFieldValue(
                              "quantiteCommande",
                              item.quantiteCommande
                            );
                            formikProps.setFieldValue(
                              "quantiteExpedie",
                              item.quantiteExpedie
                            );
                            formikProps.setFieldValue(
                              "observation",
                              item.observation
                            );
                            setIdValues(() => {
                              let temp = item.id
                                ? {
                                    index: index + 1,
                                    idVal: item.id,
                                  }
                                : {
                                    index: index + 1,
                                  };
                              return temp;
                            });
                          }}
                        >
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton
                          color="warning"
                          aria-label="Supprimer"
                          component="span"
                          size="small"
                          onClick={() => {
                            setIdDelete((prev: any[]) => {
                              let temp = [...prev];
                              temp.push({
                                id: item.id,
                              });
                              return temp;
                            });
                            setValuesArticle((prev: any[]) => {
                              let temp = [...prev];
                              temp.splice(index, 1);
                              return temp;
                            });
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow
                  key="index"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      <OSSelectField
                        id="ref"
                        label="Référence"
                        name="ref"
                        type="text"
                        options={ref}
                        dataKey={"name"}
                        valueKey="id"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <FormControl fullWidth>
                      <OSTextField
                        id="designation"
                        label="Désignation"
                        name="designation"
                        type="text"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell align="left">
                    <FormControl fullWidth>
                      <OSTextField
                        id="quantiteCommande"
                        label="Quantité commander"
                        name="quantiteCommande"
                        type="number"
                        min="0"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell align="left">
                    <FormControl fullWidth>
                      <OSTextField
                        id="quantiteExpedie"
                        label="Quantité expédié"
                        name="quantiteExpedie"
                        type="number"
                        min="0"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell align="left">
                    <FormControl fullWidth>
                      <OSTextField
                        id="observation"
                        label="observation"
                        name="observation"
                        type="text"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ width: 150, background: "#F5F5F5" }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <IconButton
                        type="button"
                        onClick={() => {
                          const ref = formikProps.values.ref;
                          const designation = formikProps.values.designation;
                          const quantiteCommande =
                            formikProps.values.quantiteCommande;
                          const quantiteExpedie =
                            formikProps.values.quantiteExpedie;
                          const observation = formikProps.values.observation;
                          // Vérifier si les champs sont vides
                          if (
                            designation.trim() !== "" &&
                            observation.trim() !== ""
                          ) {
                            if (idValues.idVal) {
                              setValuesArticle((prev: any[]) => {
                                let temp = [
                                  ...prev.map((ValId, index) => {
                                    let indexUpdate = index + 1;
                                    if (indexUpdate === idValues.index) {
                                      return {
                                        id: idValues.idVal,
                                        ref,
                                        designation,
                                        quantiteCommande,
                                        quantiteExpedie,
                                        observation,
                                      };
                                    }
                                    return ValId;
                                  }),
                                ];
                                return temp;
                              });
                            } else if (idValues.index && !idValues.idVal) {
                              setValuesArticle((prev: any[]) => {
                                let temp = [
                                  ...prev.map((ValId, index) => {
                                    let indexUpdate = index + 1;
                                    if (indexUpdate === idValues.index) {
                                      return {
                                        ref,
                                        designation,
                                        quantiteCommande,
                                        quantiteExpedie,
                                        observation,
                                      };
                                    }
                                    return ValId;
                                  }),
                                ];
                                return temp;
                              });
                            } else {
                              setValuesArticle((prev: any[]) => {
                                let temp = [...prev];
                                temp.push({
                                  ref: ref,
                                  designation: designation,
                                  quantiteCommande: quantiteCommande,
                                  quantiteExpedie: quantiteExpedie,
                                  observation: observation,
                                });
                                return temp;
                              });
                            }
                            formikProps.setFieldValue("ref", "");
                            formikProps.setFieldValue("designation", "");
                            formikProps.setFieldValue("quantiteCommande", 0);
                            formikProps.setFieldValue("quantiteExpedie", 0);
                            formikProps.setFieldValue("observation", "");
                          }
                        }}
                      >
                        <Check color="primary" />
                      </IconButton>
                      <IconButton
                        type="button"
                        onClick={() => {
                          formikProps.setFieldValue("ref", "");
                          formikProps.setFieldValue("designation", "");
                          formikProps.setFieldValue("quantiteCommande", 0);
                          formikProps.setFieldValue("quantiteExpedie", 0);
                          formikProps.setFieldValue("observation", "");
                        }}
                      >
                        <Close />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </FormContainer>
      </Box>
    </Form>
  );
};

export default FormBonTransfert;
const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  borderRadius: 20,
  background: "#fff",
  marginBottom: 30,
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
