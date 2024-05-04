import { Form, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { useRouter } from 'next/router';
import { getEmployees } from '../../../../redux/features/employeStagiaire/employeeSlice';
import { getInterns } from '../../../../redux/features/employeStagiaire/stagiaireSlice';
import {  Box, Button, Divider, FormControl, IconButton, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import OSTextField from '../../../shared/input/OSTextField';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import OSSelectField from '../../../shared/select/OSSelectField';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { getGrantList } from '../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice';
import { getBudgetLineList } from '../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice';
import OSDatePicker from '../../../shared/date/OSDatePicker';
import OSFileUpload from '../../../shared/input/OSFileUpload';
import { Delete, Edit } from '@mui/icons-material';

const FormFicheDotation = ({formikProps,valuesArticle,setValuesArticle,setIdDelete}: {formikProps: FormikProps<any>,valuesArticle:any,setValuesArticle:any,setIdDelete:any}) => {
    const dispatch = useAppDispatch();

    const { isEditing } = useAppSelector((state) => state.ficheDotation);
    const [idValues ,setIdValues] = useState<any>()

    const route = useRouter();
    
    // const { employees } = useAppSelector((state) => state.employe);
    // const { interns } = useAppSelector((state) => state.stagiaire);
    const { grantList } = useAppSelector( (state) => state.grant);
    const { budgetLineList } = useAppSelector( (state) => state.lineBugetaire);

    // const total = [...employees.map((i:any)=>{
    //     return {
    //     id : i.id, name: i.name +" "+ i.surname, type: "employe"
    //     }
    // }),...interns.map((i:any)=>{
    //     return {
    //         id : i.id, name: i.name +" "+ i.surname, type: "intern"
    //     }
    // })]
    const fetchUtilsData = () => {
        dispatch(getEmployees({}));
        dispatch(getInterns({}));
        dispatch(getGrantList({}));
        dispatch(getBudgetLineList({}));
    };

    useEffect(() => {
        fetchUtilsData();
    }, []);

    // useEffect(() => {
    //     const Val:any = total.find((e:any)=> e.id === formikProps.values.destination)
    //     formikProps.setFieldValue("type", Val?.type)
    //     console.log(formikProps.values.type)
    // }, [formikProps.values.destination]);

    return (
        <Form>
            <NavigationContainer>
                <SectionNavigation>
                <Stack flexDirection={"row"}>
                    <Link href="/logistique/materiels/fiche_dotation">
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
                    </Link>
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
                    {isEditing ? "Modifier" : "Ajouter"} Fiche de dotation
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
                        Fiche de dotation
                    </Typography>
                </Stack>
                <FormControl fullWidth>
                    <OSDatePicker
                        fullWidth
                        id="outlined-basic"
                        label="Date"
                        variant="outlined"
                        value = {formikProps.values.date}
                        onChange = {(value: any) =>formikProps.setFieldValue("date", value)}
                    />
                </FormControl>
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
                            name="reference"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Région"
                            name="region"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="District"
                            name="district"
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
                            label="Commune"
                            name="commune"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSTextField
                            fullWidth
                            id="outlined-basic"
                            variant="outlined"
                            label="Fokotany"
                            name="fokontany"
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
                            label="Grant"
                            name="grant"
                            options={grantList}
                            dataKey={["code"]}
                            valueKey="id"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSSelectField
                            id="outlined-basic"
                            label="Ligne budgétaire"
                            name="ligneBudgetaire"
                            options={budgetLineList}
                            dataKey={["code"]}
                            valueKey="id"
                        />
                    </FormControl>
                </Stack>
                { isEditing ? (
                    <FormControl fullWidth>
                        <OSFileUpload label="Pièce jointe" name="pieceJointe" />
                    </FormControl>
                ):(
                    <></>
                )}
            </FormContainer>
            { isEditing ? (
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
                                    Personne concerner
                                </Typography>
                            </Stack>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nom et Prénoms</TableCell>
                                            <TableCell align="left">CIN</TableCell>
                                            <TableCell align="left">Fonction</TableCell>
                                            <TableCell align="left">Désignation</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {valuesArticle.map((item:any , index:any) => (
                                            <TableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{item.nomPrenom}</TableCell>
                                                <TableCell align="left">{item.cin}</TableCell>
                                                <TableCell align="left">{item.fonction}</TableCell>
                                                <TableCell align="left">{item.designation}</TableCell>
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
                                                                formikProps.setFieldValue('nomPrenom', item.nomPrenom);
                                                                formikProps.setFieldValue('cin', item.cin);
                                                                formikProps.setFieldValue('fonction', item.fonction);
                                                                formikProps.setFieldValue('designation', item.designation);
                                                                const id = index + 1
                                                                setIdValues(id)
                                                            }}
                                                        >
                                                        <Edit color="primary" />
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
                                                            id="nomPrenom"
                                                            label="Nom et Prénoms"
                                                            name="nomPrenom"
                                                            type="text"
                                                        />
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <FormControl fullWidth>
                                                        <OSTextField
                                                            id="cin"
                                                            label="CIN"
                                                            name="cin"
                                                            type="text"
                                                        />
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <FormControl fullWidth>
                                                        <OSTextField
                                                            id="fonction"
                                                            label="Fonction"
                                                            name="fonction"
                                                            type="text"
                                                        />
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <FormControl fullWidth>
                                                        <OSTextField
                                                            id="designation"
                                                            label="Designation"
                                                            name="designation"
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
                                                                
                                                                const nomPrenom = formikProps.values.nomPrenom;
                                                                const cin = formikProps.values.cin;
                                                                const fonction = formikProps.values.fonction;
                                                                const designation = formikProps.values.designation;

                                                                if (nomPrenom.trim() !== '' && cin.trim() !== '') {
                                                                    if(idValues){
                                                                        setValuesArticle((prev:any[])=>{
                                                                            let temp = [...prev.map((ValId, index)=>{
                                                                                const id = index + 1
                                                                                if(id === idValues){
                                                                                    return {
                                                                                        nomPrenom,
                                                                                        cin,
                                                                                        fonction,
                                                                                        designation,
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
                                                                                nomPrenom,
                                                                                cin, 
                                                                                fonction,
                                                                                designation
                                                                            })
                                                                            return temp
                                                                        })
                                                                    }
                                                                    formikProps.setFieldValue('nomPrenom', "");
                                                                    formikProps.setFieldValue('cin', "");
                                                                    formikProps.setFieldValue('fonction',"");
                                                                    formikProps.setFieldValue('designation',"");
                                                                }
                                                            
                                                            }}
                                                        >
                                                            <Check color="primary"/>
                                                        </IconButton>
                                                        <IconButton
                                                            type="button"
                                                            onClick={() => {
                                                                formikProps.setFieldValue('nomPrenom', "");
                                                                formikProps.setFieldValue('cin', "");
                                                                formikProps.setFieldValue('fonction', "");
                                                                formikProps.setFieldValue('designation', "");
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
            ):(
                <></>
            )}
        </Form>
    )
}

export default FormFicheDotation
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