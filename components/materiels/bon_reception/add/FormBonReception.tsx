import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { Form, FormikProps } from "formik";
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
import ArrowBack from "@mui/icons-material/ArrowBack";
import { cancelEdit } from "../../../../redux/features/bon_reception/bonReceptionSlice";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import OSSelectField from "../../../shared/select/OSSelectField";
import {
  getBonCommandeExterne,
  getBonCommandeExternes,
} from "../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import {
  getBonCommandeInterne,
  getBonCommandeInternes,
} from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import useFetchPassenger from "../../../configurations/passenger/hooks/useFetchPassenger";

const FormBonReception = ({
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

  const { isEditing } = useAppSelector((state) => state.bonReceptions);
  const { bonCommandeExternes } = useAppSelector(
    (state) => state.bonCommendeExterne
  );
  const { bonCommandeInternes } = useAppSelector(
    (state) => state.bonCommandeInterne
  );
  const fetchPassenger = useFetchPassenger();
  const { passengerListe } = useAppSelector((state) => state.passenger);

  const total = [
    ...bonCommandeExternes.map((i: any) => {
      return {
        id: i.id,
        name: i.ref,
        type: "BCE",
      };
    }),
    ...bonCommandeInternes.map((i: any) => {
      return {
        id: i.id,
        name: i.reference,
        type: "BCI",
      };
    }),
  ];

  const fetchUtilsData = () => {
    dispatch(getBonCommandeExternes({}));
    dispatch(getBonCommandeInternes({}));
    fetchPassenger();
  };
  const handleFech = async (id: any) => {
    try {
      const response: any = total.find((e: any) => e.id === id);
      formikProps.setFieldValue("type", response?.type);
      if (response?.type === "BCE") {
        const Val = await dispatch(
          getBonCommandeExterne({
            id,
            args: {
              include: {
                articleCommandeBce: true,
              },
            },
          })
        );
        setValuesArticle((prev: any[]) => {
          console.log(prev);
          prev = Val.payload.articleCommandeBce;
          return prev;
        });
        formikProps.setFieldValue("reference", response?.ref);
      } else {
        formikProps.setFieldValue("reference", response?.reference);
        const Val = await dispatch(
          getBonCommandeInterne({
            id,
            args: {
              include: {
                ArticleCommande: true,
              },
            },
          })
        );
        setValuesArticle((prev: any[]) => {
          console.log(prev);
          prev = Val.payload.ArticleCommande;
          return prev;
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    const id = formikProps.values.bce;
    if (id) {
      handleFech(id);
    }
  }, [formikProps.values.bce]);
  useEffect(() => {
    fetchUtilsData();
  }, []);
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
                dispatch(cancelEdit());
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
                dispatch(cancelEdit());
              }}
            >
              Annuler
            </Button>
          </Stack>
          <Typography variant="h4">
            {isEditing ? "Modifier" : "Ajouter"} bon de réception
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
            Bon de réception
          </Typography>
        </Stack>
        <FormControl fullWidth>
          <OSTextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            label="Référence"
            name="reference"
            disabled
          />
        </FormControl>
        <FormControl fullWidth>
          <OSSelectField
            id="outlined-basic"
            label="Ref BCI/BCE"
            name="bce"
            options={total}
            dataKey={["name", "type"]}
            valueKey="id"
            type="text"
          />
        </FormControl>
        <Stack direction="row" spacing={3}>
          <OSSelectField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            label="Etat"
            name="etat"
            options={passengerListe}
            dataKey={["name"]}
            valueKey="id"
            type="text"
          />
          <OSTextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            label="Observation"
            name="observation"
            type="text"
          />
          <OSTextField
            fullWidth
            id="outlined-basic"
            variant="outlined"
            label="Condition de livraison"
            name="conditionLivraison"
          />
        </Stack>
        <FormControl fullWidth>
          <OSDatePicker
            fullWidth
            id="outlined-basic"
            label="Date du bon de réception"
            variant="outlined"
            value={formikProps.values.dateReception}
            onChange={(value: any) =>
              formikProps.setFieldValue("dateReception", value)
            }
          />
        </FormControl>
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
              Produit reçu
            </Typography>
          </Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Désignation </TableCell>
                  <TableCell align="left">Quantité</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {valuesArticle &&
                  valuesArticle?.map((item: any, index: any) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {item.designation}
                      </TableCell>
                      <TableCell align="left">{item.quantite}</TableCell>
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
                                "quantite",
                                item.quantite
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
                        id="designation"
                        label="Quantité"
                        name="quantite"
                        type="number"
                        min="0"
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
                          const designation = formikProps.values.designation;
                          const quantite = formikProps.values.quantite;
                          // Vérifier si les champs sont vides
                          if (designation.trim() !== "") {
                            if (idValues.idVal) {
                              setValuesArticle((prev: any[]) => {
                                let temp = [
                                  ...prev.map((ValId, index) => {
                                    let indexUpdate = index + 1;
                                    if (indexUpdate === idValues.index) {
                                      return {
                                        id: idValues.idVal,
                                        designation,
                                        quantite,
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
                                        quantite,
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
                                  quantite: quantite,
                                });
                                return temp;
                              });
                            }
                            formikProps.setFieldValue("designation", "");
                            formikProps.setFieldValue("quantite", 0);
                          }
                        }}
                      >
                        <Check color="primary" />
                      </IconButton>
                      <IconButton
                        type="button"
                        onClick={() => {
                          formikProps.setFieldValue("designation", "");
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
export default FormBonReception;

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
