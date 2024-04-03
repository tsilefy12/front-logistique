import Delete from '@mui/icons-material/Delete';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormGroup, IconButton, InputLabel, Paper, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import { Form, FormikProps } from 'formik';
import React, { useEffect, useState } from 'react'
import OSSelectField from '../../../shared/select/OSSelectField';
import OSTextField from '../../../shared/input/OSTextField';
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks';
import { getBonCommandeInterne, getBonCommandeInternes } from '../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice';
import { getBonCommandeExterne, getBonCommandeExternes } from '../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice';
import { getEquipments } from '../../../../redux/features/equipment';
import { getFournisseurList } from '../../../../redux/features/fournisseur';
import { getBudgetLineList } from '../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice';
import { getGrantList } from '../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import { cancelEdit } from '../../../../redux/features/pvComparaison/pvComparaisonSlice';
import Edit from '@mui/icons-material/Edit';
import { getPrograms } from '../../../../redux/features/program/programSlice';

const FormPv = ({formikProps,valuesArticle,setValuesArticle}: {formikProps: FormikProps<any>,valuesArticle:any,setValuesArticle:any}) =>  {

    const dispatch = useAppDispatch();
    const route = useRouter();

    const [ materiel, setMateriel] = useState < any[]> ([])
    const { fournisseurList } = useAppSelector( (state) => state.fournisseur);
    const { grantList } = useAppSelector( (state) => state.grant);
    const { budgetLineList } = useAppSelector( (state) => state.lineBugetaire);
    const { bonCommandeExternes } = useAppSelector((state) => state.bonCommendeExterne);
    const { bonCommandeInternes } = useAppSelector((state) => state.bonCommandeInterne);
    const { programs } = useAppSelector( (state) => state.program);
    const { isEditing } = useAppSelector((state) => state.pvComparaisonFournisseurs);

    const total = [...bonCommandeExternes.map((i:any)=>{
        return {
            id : i.id, name: i.ref, type: "BCE"
        }
    }),...bonCommandeInternes.map((i:any)=>{
        return {
            id : i.id, name: i.reference, type: "BCI"
        }
    })]
    
    const fetchUtilsData = () => {
        dispatch(getBonCommandeInternes({}));
        dispatch(getBonCommandeExternes({}));
        dispatch(getEquipments({}));
        dispatch(getFournisseurList({}));
        dispatch(getGrantList({}));
        dispatch(getBudgetLineList({}));
        dispatch(getPrograms({}));
    };

    const optionsOffres = valuesArticle.map((item:any,index:any) => ({
        index:index,
        value: item.fournisseur,
        label: `Offre N°${index + 1} : ${item.fournisseurName}`
    }));
    
    useEffect(() => {
        fetchUtilsData();
    }, []);

    const checkboxChange = (c: boolean, s: string) => {
        let motifRetenu: string[] =
          formikProps.values.motif.length > 0
            ? formikProps.values.motif.split(";")
            : [];
        if (c) {
            motifRetenu.push(s);
            formikProps.setFieldValue("motif", motifRetenu.join(";"));
            return;
        }
        motifRetenu = motifRetenu.filter((f) => f !== s);
        formikProps.setFieldValue("motif", motifRetenu.join(";"));
    };
    const handleFech = async (id: any) => {
        try { 
            const response:any = total.find((e:any)=> e.id === id)
            formikProps.setFieldValue("type", response?.type)
            if(response?.type === "BCE"){
                const Val = await dispatch(getBonCommandeExterne({ id , args:{
                    include:{
                        articleCommandeBce:true
                    }
                }}));
                console.log(Val)
                setMateriel((prev:any[])=>{
                    console.log(prev)
                    prev = Val.payload.articleCommandeBce
                    return prev
                })
            }else{
                const Val = await dispatch(getBonCommandeInterne({ id , args:{
                    include:{
                        ArticleCommande:true
                    }
                }}));
                console.log(Val)
                setMateriel((prev:any[])=>{
                    console.log(prev)
                    prev = Val.payload.ArticleCommande
                    return prev
                })
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        const id = formikProps.values.ref
        if(id){
            handleFech(id)
        }
    }, [formikProps.values.ref]);
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
                            route.back()
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
                            dispatch(cancelEdit());
                        }}
                        >
                        Annuler
                    </Button>
                </Stack>
                <Typography variant="h4">
                    {isEditing ? "Modifier" : "Ajouter"} Pv de Comparaison Offre
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
                        PV de comparaison d'offre
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
                            label="Objet"
                            name="objet"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSSelectField
                            id="outlined-basic"
                            label="Ref BCI/BCE"
                            name="ref"
                            options={total}
                            dataKey={["name","type"]}
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
                            label="Matériel"
                            name="materiel"
                            options={materiel}
                            dataKey={["designation"]}
                            valueKey="id"
                            type="text"
                        />
                    </FormControl>
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
                            dataKey="code"
                            valueKey="id"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <OSSelectField
                            id="outlined-basic"
                            label="Ligne Budgétaire"
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
                                Comparaison
                            </Typography>
                        </Stack>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Fournisseur</TableCell>
                                        <TableCell align="left">Mode de Paie</TableCell>
                                        <TableCell align="left">Désignation</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {valuesArticle.map((element:any, index:any) => (
                                        <TableRow
                                            key={index}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">{element.fournisseurName}</TableCell>
                                            <TableCell align="left">{element.modePaie}</TableCell>
                                            <TableCell align="left">{element.designation}</TableCell>

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
                                                        aria-label="Edit"
                                                        component="span"
                                                        size="small"
                                                        onClick={() => {
                                                            formikProps.setFieldValue('fournisseur', element.fournisseur);
                                                            formikProps.setFieldValue('modePaie', element.modePaie);
                                                            formikProps.setFieldValue('designation', element.designation);
                                                            // setIdValues(item.id)
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
                                            </TableCell>
                                            <TableCell align="left">
                                                <FormControl fullWidth>
                                                    <OSTextField
                                                        id="designation"
                                                        label="Mode de paie"
                                                        name="modePaie"
                                                    />
                                                </FormControl>
                                            </TableCell>
                                            <TableCell align="left">
                                            <FormControl fullWidth>
                                                <OSTextField
                                                    id="designation"
                                                    label="Designation"
                                                    name="designation"
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
                                                            const fournisseur = formikProps.values.fournisseur;
                                                            const modePaie = formikProps.values.modePaie;
                                                            const designation = formikProps.values.designation;
                                                                // Vérifier si les champs sont vides
                                                                if (fournisseur.trim() !== ''  && modePaie.trim() !== '' && designation.trim() !== '') {
                                                                    setValuesArticle((prev:any[])=>{
                                                                        let temp = [...prev]
                                                                        temp.push({
                                                                            fournisseur: fournisseur,
                                                                            modePaie: modePaie,
                                                                            designation: designation,
                                                                            fournisseurName:fournisseurList.find((e:any)=> e.id === fournisseur)?.name
                                                                        })
                                                                        return temp
                                                                    })
                                                                formikProps.setFieldValue('fournisseur', '');
                                                                formikProps.setFieldValue('modePaie', '');
                                                                formikProps.setFieldValue('designation', '');
                                                            }
                                                            
                                                        }}
                                                    ><Check color="primary"/>
                                                    </IconButton>
                                                    <IconButton
                                                        type="button"
                                                        onClick={() => {
                                                            formikProps.setFieldValue('fournisseur', '');
                                                            formikProps.setFieldValue('offre', '');
                                                            formikProps.setFieldValue('modePaie', '');
                                                            formikProps.setFieldValue('designation', '');
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
                            Synthèse
                        </Typography>
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
                            label="Offres Retenu"
                            name="offreRetenu"
                            options={optionsOffres}
                            dataKey={["label"]}
                            valueKey="index"
                            type="text"
                        />
                    </FormControl>
                    <FormControl fullWidth>
                    <OSTextField
                        fullWidth
                        id="outlined-basic"
                        variant="outlined"
                        label="Argument"
                        name="argument"
                        type="text"
                        />
                    </FormControl>
                    </Stack>
                    <FormGroup>
                    <Stack
                        direction="row"
                        spacing={4}
                        sx={{
                            flex: "1 1 100%",
                            alignItems: "center",
                        }}
                        >
                        <InputLabel>Motif de retenu</InputLabel>
                        <FormControlLabel
                            label="Moins distant"
                            control={
                            <Checkbox
                                checked={formikProps.values.motif.includes("moins_distant")}
                                onChange={(e, c) => checkboxChange(c, "moins_distant")}
                            />
                            }
                        />
                        <FormControlLabel
                            label="Conforme aux besoin"
                            control={
                            <Checkbox
                                checked={formikProps.values.motif.includes("conforme_aux_besoins")}
                                onChange={(e, c) => checkboxChange(c, "conforme_aux_besoins")}
                            />
                            }
                        />
                        </Stack>
                    </FormGroup>
                </FormContainer>
            </Box>
        </Form>
    )
}

export default FormPv;
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