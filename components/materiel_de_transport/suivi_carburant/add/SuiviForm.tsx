import {
    Button,
    Container,
    styled,
    Typography,
    FormControl,
    Stack,
    Divider,
    TextField,
    MenuItem,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { Form, FormikProps } from "formik";
import * as React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import OSDatePicker from "../../../shared/date/OSDatePicker";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import OSTextField from "../../../shared/input copy/OSTextField";
 
import { cancelEdit } from "../../../../redux/features/car-voucher/carVoucherSlice";
import useFetchGrant from "../hooks/useFetchGrant";
import OSSelectField from "../../../shared/select/OSSelectField";
import useFetchTransportationEquipments from "../../hooks/useFetchTransportationEquipments";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";

const SuiviForm = ({formikProps}: {formikProps: FormikProps<any>}) => {
    const route = useRouter();
    const dispatch = useAppDispatch();
    const { isEditing } = useAppSelector((state) => state.suiviCarburant);
  
    const fetchGrant = useFetchGrant();
    const { grantList } = useAppSelector((state) => state.grant);
    const { budgetLineList } = useAppSelector((state) => state.lineBugetaire)
    const fetchMateriels = useFetchTransportationEquipments();
    const {transportationEquipments } = useAppSelector((state) => state.transportationEquipment)
  
    React.useEffect(() => {
      fetchGrant();
      fetchMateriels();
    }, []);
  
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

    React.useEffect(() => {
        dispatch(getBudgetLineList({
            args:{
                where : {
                    grantId : formikProps.values.grant
                }
            }
        }));
    }, [formikProps.values.grant]);
  
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
                            formikProps.resetForm();
                            dispatch(cancelEdit());
                            route.back()
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
                    {isEditing ? "Modifier" : "Ajouter"} suivi carburant
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
                <TextField
                    select
                    fullWidth
                    id="outlined-basic"
                    label="Matériel"
                    variant="outlined"
                    value = {materiel}
                    onChange={(e) => setMateriel(e.target.value)}
                    >
                    {[...ListMateriel].map((element: any) => (
                        <MenuItem key={element.id} value={element.id}>{element.name}</MenuItem>
                    ))}
                </TextField>
                <OSDatePicker
                    fullWidth
                    id="outlined-basic"
                    label="Date"
                    variant="outlined"
                    value={formikProps.values.date}
                    onChange={(value: any) => formikProps.setFieldValue("date", value)}
                />
            </Stack>
            <Stack direction="row" spacing={2} margin={2}>
                <FormControl fullWidth>
                <OSTextField
                    id="outlined-basic"
                    label="Itineraire"
                    variant="outlined"
                    name="itineraire"
                />
                </FormControl>
                <FormControl fullWidth>
                <OSTextField
                    id="outlined-basic"
                    label="Personne transporté"
                    name="personnelTransporte"
                />
                </FormControl>
            </Stack>
            <Stack direction="row" spacing={2} margin={2}>
                <FormControl fullWidth>
                <OSTextField
                    id="outlined-basic"
                    label="kilometrage final"
                    name="kilometrageFinal"
                    type="number"
                    min="0"
                    value={formikProps.values.kilometrageFinal}
                    onChange={(event: any) => {
                    const newValue = parseInt(event.target.value);
                    formikProps.setFieldValue("kilometrageFinal", newValue);
                    const newMontant = ((formikProps.values.kilometrageFinal! - kilometrageInit)*formikProps.values.pu!).toFixed(0);
                    formikProps.setFieldValue("montant", parseInt(newMontant));
                    }}
                />
                </FormControl>
                <FormControl fullWidth>
                <OSTextField
                    id="outlined-basic"
                    label="Prix unitaire"
                    variant="outlined"
                    name="pu"
                    type="number"
                    value={ListMateriel.find((e:any) => e.id === materiel)?.unitPrice}
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
                    value={parseInt(((formikProps.values.kilometrageFinal! - kilometrageInit)* formikProps.values.pu!).toFixed(0))}
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
                <FormControl fullWidth>
                <OSTextField
                    id="outlined-basic"
                    label="Mode paiement"
                    variant="outlined"
                    name="modePaiement"
                    type="text"
                />
                </FormControl>
            </Stack>
        </Form>
    );
};
  
export default SuiviForm;
  
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
  