import { Form, FormikProps } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";
import { getEmployees } from "../../../../redux/features/employeStagiaire/employeeSlice";
import { getFournisseurList } from "../../../../redux/features/fournisseur";
import {
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
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
import Delete from "@mui/icons-material/Delete";
import OSTextField from "../../../shared/input/OSTextField";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import OSSelectField from "../../../shared/select/OSSelectField";
import { ArrowBack } from "@mui/icons-material";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";
import EditIcon from "@mui/icons-material/Edit";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { getPrograms } from "../../../../redux/features/program/programSlice";
import { cancelEdit } from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";
import useFetchPrestataire from "../../bon_commande_externe/hooks/getPrestataire";
import useFetchWorkPlace from "../../bon_commande_externe/hooks/useFetchWorkPlace";

const FormBCI = ({
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
  const route = useRouter();
  const [idValues, setIdValues] = useState<any>({});

  const { employees } = useAppSelector((state) => state.employe);
  const { interns } = useAppSelector((state) => state.stagiaire);
  const { fournisseurList } = useAppSelector((state) => state.fournisseur);
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);
  const { programs } = useAppSelector((state) => state.program);

  const { isEditing } = useAppSelector((state) => state.bonCommandeInterne);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );
  const { workplaces } = useAppSelector((state) => state.workplace);
  const fetchWorkPlace = useFetchWorkPlace();
  const total = [
    ...employees.map((i: any) => {
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "employe",
        lieuTravail: i.workplaceId,
      };
    }),
    ...interns.map((i: any) => {
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "intern",
        lieuTravail: i.workplaceId,
      };
    }),
    ...prestataireListe.map((i: any) => {
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "prestataire",
        lieuTravail: i.workplaceId,
      };
    }),
  ];

  const fetchUtilsData = () => {
    dispatch(getInterns({}));
    dispatch(getEmployees({}));
    dispatch(getFournisseurList({}));
    dispatch(getGrantList({}));
    dispatch(getPrograms({}));
  };

  useEffect(() => {
    fetchUtilsData();
    fetchPrestataire();
    fetchWorkPlace();
  }, []);

  useEffect(() => {
    if (formikProps.values.demandeur) {
      const Val: any = total.find(
        (e: any) => e.id === formikProps.values.demandeur
      );
      formikProps.setFieldValue("type", Val?.type);
    }
  }, [formikProps.values.demandeur]);

  useEffect(() => {
    if (formikProps.values.grant != 0) {
      dispatch(
        getBudgetLineList({
          args: {
            where: {
              grantId: formikProps.values.grant,
            },
          },
        })
      );
    }
  }, [formikProps.values.grant]);

  useEffect(() => {
    const demandeur = total.find(
      (e: any) => e.id === formikProps.values.demandeur
    )?.lieuTravail;
    if (demandeur) {
      const lieuTravail = workplaces.find((e: any) => e.id === demandeur)?.name;
      let referenceTana = "BCI/TNR-001";
      let referenceDiego = "BCI/DS-001";
      let referenceAmbatondrazaka = "BCI/AZK-001";
      let referenceMoramanga = "BCI/MRG-001";
      let referenceMorondava = "BCI/MRD-001";
      if (lieuTravail === "Antananarivo" || lieuTravail === "Tana") {
        formikProps.setFieldValue("reference", referenceTana);
      } else if (lieuTravail === "Diego Garcia") {
        formikProps.setFieldValue("reference", referenceDiego);
      } else if (lieuTravail === "Ambatondrazaka") {
        formikProps.setFieldValue("reference", referenceAmbatondrazaka);
      } else if (lieuTravail === "Morondava") {
        formikProps.setFieldValue("reference", referenceMorondava);
      } else if (lieuTravail === "Mormanga") {
        formikProps.setFieldValue("reference", referenceMoramanga);
      } else {
        formikProps.setFieldValue(
          "reference",
          `BCI/${lieuTravail!.slice(0, 3)}-001`
        );
      }
    }
  }, [formikProps.values.demandeur, total, workplaces]);
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
                dispatch(cancelEdit());
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
            {isEditing ? "Modifier" : "Ajouter"} bon de commande interne
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
            Bon de commande interne
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
              name="reference"
            />
          </FormControl>
          <FormControl fullWidth>
            <OSTextField
              fullWidth
              id="outlined-basic"
              variant="outlined"
              label="N° Bon Commande"
              name="numBonCommande"
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
              dataKey="name"
              valueKey="id"
              type="text"
            />
          </FormControl>
          <FormControl fullWidth>
            <OSDatePicker
              fullWidth
              id="outlined-basic"
              label="Date du bon de commande"
              variant="outlined"
              value={formikProps.values.dateBonCommande}
              onChange={(value: any) =>
                formikProps.setFieldValue("dateBonCommande", value)
              }
            />
          </FormControl>
        </Stack>
        <FormControl fullWidth>
          <OSSelectField
            id="outlined-basic"
            label="Demandeur"
            name="demandeur"
            options={total}
            dataKey={["name"]}
            valueKey="id"
          />
        </FormControl>
        <OSTextField
          fullWidth
          id="outlined-basic"
          variant="outlined"
          label="Observation"
          name="observation"
        />
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          spacing={2}
        >
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Grant"
              name="grant"
              options={grantList}
              dataKey="code"
              valueKey="id"
            />
          </FormControl>
          <FormControl fullWidth>
            <OSSelectField
              id="outlined-basic"
              label="Ligne budgétaire"
              name="ligneBudgetaire"
              options={budgetLineList}
              dataKey="code"
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
              Article à commander
            </Typography>
          </Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Désignation</TableCell>
                  <TableCell align="left">Caractéristique</TableCell>
                  <TableCell align="left">PU</TableCell>
                  <TableCell align="left">Quantité</TableCell>
                  <TableCell align="left">Fournisseur</TableCell>
                  <TableCell align="left">Valeur</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesArticle.map((item: any, index: any) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.designation}
                    </TableCell>
                    <TableCell align="left">{item.caracteristik}</TableCell>
                    <TableCell align="left">{item.pu} Ar</TableCell>
                    <TableCell align="left">{item.quantite}</TableCell>
                    <TableCell align="left">
                      {
                        fournisseurList.find(
                          (e: any) => e.id === item.fournisseurId
                        )?.name
                      }
                    </TableCell>
                    <TableCell align="left">{item.valueArticle} Ar</TableCell>
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
                            formikProps.setFieldValue(
                              "designation",
                              item.designation
                            );
                            formikProps.setFieldValue(
                              "caracteristik",
                              item.caracteristik
                            );
                            formikProps.setFieldValue("pu", item.pu);
                            formikProps.setFieldValue(
                              "quantite",
                              item.quantite
                            );
                            formikProps.setFieldValue(
                              "fournisseurId",
                              item.fournisseurId
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
                        id="caracteristik"
                        label="Caractéristique"
                        name="caracteristik"
                        type="text"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell align="left">
                    <FormControl fullWidth>
                      <OSTextField
                        id="pu"
                        label="PU"
                        name="pu"
                        type="number"
                        min="0"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell align="left">
                    <FormControl fullWidth>
                      <OSTextField
                        id="designation"
                        label="Quantité"
                        name="quantite"
                        type="number"
                        min="0"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell align="left">
                    <FormControl fullWidth>
                      <OSSelectField
                        id="outlined-basic"
                        name="fournisseurId"
                        label="Fournisseur"
                        options={fournisseurList}
                        dataKey={["name"]}
                        valueKey="id"
                        type="text"
                      />
                    </FormControl>
                  </TableCell>
                  <TableCell align="left">
                    <FormControl fullWidth></FormControl>
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
                          const designation = formikProps.values.designation;
                          const caracteristik =
                            formikProps.values.caracteristik;
                          const pu = formikProps.values.pu;
                          const quantite = formikProps.values.quantite;
                          const fournisseurId =
                            formikProps.values.fournisseurId;

                          if (
                            designation.trim() !== "" &&
                            caracteristik.trim() !== ""
                          ) {
                            if (idValues.idVal) {
                              setValuesArticle((prev: any[]) => {
                                let temp = [
                                  ...prev.map((ValId, index) => {
                                    let indexUpdate = index + 1;
                                    if (indexUpdate === idValues.index) {
                                      return {
                                        id: idValues.idVal,
                                        designation,
                                        caracteristik,
                                        pu,
                                        quantite,
                                        valueArticle: pu * quantite,
                                        fournisseurId,
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
                                        designation,
                                        caracteristik,
                                        pu,
                                        quantite,
                                        valueArticle: pu * quantite,
                                        fournisseurId,
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
                                  designation: designation,
                                  caracteristik: caracteristik,
                                  pu: pu,
                                  quantite: quantite,
                                  valueArticle: quantite * pu,
                                  fournisseurId: fournisseurId,
                                });
                                return temp;
                              });
                            }
                            formikProps.setFieldValue("designation", "");
                            formikProps.setFieldValue("caracteristik", "");
                            formikProps.setFieldValue("pu", 0);
                            formikProps.setFieldValue("quantite", 0);
                            formikProps.setFieldValue("fournisseurId", "");
                          }
                        }}
                      >
                        <Check color="primary" />
                      </IconButton>
                      <IconButton
                        type="button"
                        onClick={() => {
                          formikProps.setFieldValue("designation", "");
                          formikProps.setFieldValue("caracteristik", "");
                          formikProps.setFieldValue("pu", 0);
                          formikProps.setFieldValue("quantite", 0);
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

export default FormBCI;

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
