import React, { useEffect, useState } from 'react'
import { Form, FormikProps } from "formik";
import { getInterns } from '../../../../redux/features/employeStagiaire/stagiaireSlice';
import { getEmployees } from '../../../../redux/features/employeStagiaire/employeeSlice';
import { getFournisseurList } from '../../../../redux/features/fournisseur';
import { getBonCommandeInternes } from '../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { Router, useRouter } from 'next/router';
import { Box ,Button,Divider,FormControl,IconButton,Link,Stack,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,styled} from '@mui/material';
import OSTextField from '../../../shared/input/OSTextField';
import OSSelectField from '../../../shared/select/OSSelectField';
import Paper from "@mui/material/Paper";
import OSFileUpload from '../../../shared/input/OSFileUpload';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import { ArrowBack } from '@mui/icons-material';
import OSDateTimePicker from '../../../shared/date/OSDateTimePicker';

const FormBCE = ({formikProps,valuesArticle}: {formikProps: FormikProps<any>,valuesArticle:any}) => {
    const dispatch = useAppDispatch();
    const route = useRouter();

    const { isEditing } = useAppSelector((state) => state.bonCommendeExterne)
    const { bonCommandeInternes } = useAppSelector((state) => state.bonCommandeInterne);
    const { fournisseurList } = useAppSelector( (state) => state.fournisseur);
    const { employees } = useAppSelector( (state) => state.employe);
    const { interns } = useAppSelector( (state) => state.stagiaire);
    
    const total = [...employees.map((i:any)=>{
        return {
            id : i.id, name: i.matricule +" "+i.name +" "+ i.surname, type: "employe"
        }
    }),...interns.map((i:any)=>{
        return {
            id : i.id, name:i.matricule +" "+ i.name +" "+ i.surname, type: "intern"
        }
    })]

    const fetchUtilsData = () => {
        dispatch(getInterns({}));
        dispatch(getEmployees({}));
        dispatch(getBonCommandeInternes({}));
        dispatch(getFournisseurList({}));
    };

    useEffect(() => {
        fetchUtilsData();
    }, []);

    useEffect(() => {
        const Val:any = total.find((e:any)=> e.id === formikProps.values.demandeur)
        formikProps.setFieldValue("type", Val?.type)
        console.log(formikProps.values.type)
    }, [formikProps.values.demandeur]);

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
                            route.back()
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
                        Enregistrer
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
                    {isEditing ? "Modifier" : "Ajouter"} Bon de commande Externe
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
                        Bon de commande externe
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
                            label="Réference"
                            name="ref"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSSelectField
                            id="outlined-basic"
                            label="BCI"
                            name="bci"
                            options={bonCommandeInternes}
                            dataKey="numBon"
                            valueKey="id"
                            type="text"
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
                            label="Demandeur"
                            name="demandeur"
                            options={total}
                            dataKey={["name"]}
                            valueKey="id"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSSelectField
                            id="outlined-basic"
                            label="Fournisseur"
                            name="fournisseur"
                            options={fournisseurList}
                            dataKey={["name"]}
                            valueKey="id"
                            type="text"
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
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Mode de paiement"
                            name="modePaiement"
                            type="text"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Condition de livraison"
                            name="conditionLivraison"
                            type="text"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSDateTimePicker
                            label="Date de commande"
                            name="dateCommande"
                        />
                    </FormControl>
                </Stack>
                <FormControl fullWidth>
                    <OSFileUpload label="Pièce jointe" name="pieceJointe" />
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
                                Article à Commander
                            </Typography>
                        </Stack>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Designation</TableCell>
                                        <TableCell align="left">Caractéristique</TableCell>
                                        <TableCell align="left">PU</TableCell>
                                        <TableCell align="left">Quantité</TableCell>
                                        <TableCell align="left">Valeur</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {valuesArticle.map((item:any , index:any) => (
                                        <TableRow
                                            key={index}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{item.designation}</TableCell>
                                            <TableCell align="left">{item.caracteristique}</TableCell>
                                            <TableCell align="left">{item.pu}Ar</TableCell>
                                            <TableCell align="left">{item.quantite} </TableCell>
                                            <TableCell align="left">{item.valeur} Ar</TableCell>
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
                                                            valuesArticle.splice(index, 1)
                                                        }}
                                                    >
                                                    <Delete />
                                                </IconButton>
                                                {/* <EditIcon color="primary" />
                                                <DeleteIcon color="warning" /> */}
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
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="left">
                                                <FormControl fullWidth>
                                                    <OSTextField
                                                        id="c"
                                                        label="Caractéristique"
                                                        name="caracteristique"
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="left">
                                                <FormControl fullWidth>
                                                    <OSTextField
                                                        id="designation"
                                                        label="PU"
                                                        name="pu"
                                                        type="number"
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
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="left">
                                                <FormControl fullWidth>
                                                    
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
                                                            const caracteristique = formikProps.values.caracteristique;
                                                            const pu = formikProps.values.pu;
                                                            const quantite = formikProps.values.quantite;
                                                            // Vérifier si les champs sont vides
                                                            if (designation.trim() !== '' && caracteristique.trim() !== '') {
                                                                valuesArticle.push({
                                                                    designation: designation,
                                                                    caracteristique: caracteristique,
                                                                    pu: pu,
                                                                    quantite: quantite,
                                                                    valeur: quantite * pu,
                                                                });
                                                                formikProps.setFieldValue('designation', '');
                                                                formikProps.setFieldValue('caracteristique', '');
                                                                formikProps.setFieldValue('pu', 0);
                                                                formikProps.setFieldValue('quantite', 0);
                                                            }
                                                        
                                                        }}
                                                    >
                                                        <Check color="primary"/>
                                                    </IconButton>
                                                    <IconButton
                                                        type="button"
                                                        onClick={() => {
                                                            formikProps.setFieldValue('designation', '');
                                                            formikProps.setFieldValue('caracteristique', '');
                                                            formikProps.setFieldValue('pu', 0);
                                                            formikProps.setFieldValue('quantite', 0)
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
    )
}

export default FormBCE;

const FormContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    borderRadius: 20,
    background: "#fff",
    marginBottom:30,
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