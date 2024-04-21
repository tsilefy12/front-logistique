import { Form, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { getFournisseurList } from '../../../../redux/features/fournisseur';
import { Box, Button, Divider, FormControl, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import OSTextField from '../../../shared/input/OSTextField';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import OSSelectField from '../../../shared/select/OSSelectField';
import { ArrowBack } from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";
import OSDatePicker from '../../../shared/date/OSDatePicker';

const FormBonCommandeFournisseur  = ({formikProps,valuesArticle,setValuesArticle,setIdDelete}: {formikProps: FormikProps<any>,valuesArticle:any,setValuesArticle:any,setIdDelete:any}) => {
    const dispatch: any = useAppDispatch();
    const route = useRouter();
    const [idValues ,setIdValues] = useState<any>()
    
    const { fournisseurList } = useAppSelector( (state) => state.fournisseur);
 
    const { isEditing } = useAppSelector((state) => state.bonDeCommandeFournisseur);

    const fetchUtilsData = () => {
        dispatch(getFournisseurList({}));
    };
    
    useEffect(() => {
        fetchUtilsData();
    }, []);
 const listModePaiement = [
    {id: "Virement bancaire", name: "Virement bancaire"},
    {id: "Chèque bancaire", name: "Chèque bancaire"},
    {id: "Mobile money", name: "Mobile money"}
 ]
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
                    {isEditing ? "Modifier" : "Ajouter"} Bon de commande fournisseur
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
                        Bon de commande fournisseur
                    </Typography>
                </Stack>
                <FormControl fullWidth>
                    <OSSelectField
                        id="outlined-basic"
                        name="vendorId"
                        label="Fournisseur"
                        options={fournisseurList}
                        dataKey={["name"]}
                        valueKey="id"
                        type="text"
                    />
                </FormControl>
                <Stack
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    >
                    <FormControl fullWidth>
                        <OSDatePicker
                            fullWidth
                            id="outlined-basic"
                            label="Date d'etablissement"
                            variant="outlined"
                            value = {formikProps.values.establishmentDate}
                            onChange = {(value: any) =>formikProps.setFieldValue("establishmentDate", value)}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSSelectField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Mode de paiement"
                            name="paymentMethod"
                            options={listModePaiement}
                            dataKey="name"
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
                        <OSDatePicker
                            fullWidth
                            id="outlined-basic"
                            label="Date de livraison"
                            variant="outlined"
                            value = {formikProps.values.deliveryDate}
                            onChange = {(value: any) =>formikProps.setFieldValue("deliveryDate", value)}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Condition de livraison"
                            name="deliveryCondition"
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
                                Article
                            </Typography>
                        </Stack>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Designation</TableCell>
                                        <TableCell align="left">PU</TableCell>
                                        <TableCell align="left">Quantité</TableCell>
                                        <TableCell align="left">Détail</TableCell>
                                        <TableCell align="left">Montant</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {valuesArticle?.map((item:any , index:any) => (
                                        <TableRow
                                            key={index}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{item.designation}</TableCell>
                                            <TableCell align="left">{item.unitPrice} Ar</TableCell>
                                            <TableCell align="left">{item.quantite} </TableCell>
                                            <TableCell align="left">{item.details} </TableCell>
                                            <TableCell align="left">{item.montant} Ar</TableCell>
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
                                                            formikProps.setFieldValue('designation', item.designation);
                                                            formikProps.setFieldValue('unitPrice', item.unitPrice);
                                                            formikProps.setFieldValue('quantite', item.quantite);
                                                            formikProps.setFieldValue('details', item.details);
                                                            setIdValues(item.id)
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
                                                            setIdDelete((prev:any[])=>{
                                                                let temp = [...prev]
                                                                temp.push({
                                                                    id: item.id
                                                                })
                                                                return temp
                                                            })
                                                            setValuesArticle((prev:any[])=>{
                                                                let temp = [...prev]
                                                                temp.splice(index,1)
                                                                return temp
                                                            })
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
                                                        id="pu"
                                                        label="Prix unitaire"
                                                        name="unitPrice"
                                                        type="number"
                                                        min="0"
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="left">
                                                <FormControl fullWidth>
                                                    <OSTextField
                                                        id="quantite"
                                                        label="Quantité"
                                                        name="quantite"
                                                        type="number"
                                                        min="0"
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="left">
                                                <FormControl fullWidth>
                                                    <OSTextField
                                                        id="details"
                                                        label="Details"
                                                        name="details"
                                                        type="text"
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
                                                            const unitPrice = formikProps.values.unitPrice;
                                                            const quantite = formikProps.values.quantite;
                                                            const details = formikProps.values.details;

                                                            if (designation.trim()) {
                                                                if(idValues){
                                                                    setValuesArticle((prev:any[])=>{
                                                                        let temp = [...prev.map((ValId)=>{
                                                                            if(ValId.id === idValues){
                                                                                return {
                                                                                    id:idValues,
                                                                                    designation,
                                                                                    unitPrice,
                                                                                    quantite,
                                                                                    montant: unitPrice*quantite,
                                                                                    details
                                                                                }
                                                                            }
                                                                            return ValId
                                                                        })]
                                                                        return temp
                                                                    })
                                                                }else{
                                                                    setValuesArticle((prev:any[])=>{
                                                                        let temp = [...prev]
                                                                        temp.push({
                                                                            designation,
                                                                            unitPrice,
                                                                            quantite,
                                                                            montant: unitPrice*quantite,
                                                                            details
                                                                        })
                                                                        return temp
                                                                    })
                                                                }
                                                                formikProps.setFieldValue('designation', '');
                                                                formikProps.setFieldValue('unitPrice', 0);
                                                                formikProps.setFieldValue('quantite', 0);
                                                                formikProps.setFieldValue('details', '');
                                                            }
                                                        
                                                        }}
                                                    >
                                                        <Check color="primary"/>
                                                    </IconButton>
                                                    <IconButton
                                                        type="button"
                                                        onClick={() => {
                                                            formikProps.setFieldValue('designation', '');
                                                            formikProps.setFieldValue('unitPrice', 0);
                                                            formikProps.setFieldValue('quantite', 0);
                                                            formikProps.setFieldValue('details', '');
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

export default FormBonCommandeFournisseur;

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