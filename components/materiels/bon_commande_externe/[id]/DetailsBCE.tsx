import {
    Button,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Moment from "react-moment";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { getBonCommandeExterne } from "../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";
import PDFButton from "./printBCE";
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";
import { getEmployees } from "../../../../redux/features/orderEquipment";
import { getBonCommandeInternes } from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";
import { getFournisseurList } from "../../../../redux/features/fournisseur";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";

const DetailsBCE = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = router.query;
    const { bonCommandeExterne } = useAppSelector((state) => state.bonCommendeExterne);

    const { employees } = useAppSelector( (state) => state.employe);
    const { interns } = useAppSelector( (state) => state.stagiaire);
    const { grantList } = useAppSelector( (state) => state.grant);
    const { budgetLineList } = useAppSelector( (state) => state.lineBugetaire);
    const [ pdf,setPdf ] = useState<any>({})

    const total = [...employees.map((i:any)=>{
        return {
            id : i.id, name: i.name +" "+ i.surname, type: "employe"
        }
    }),...interns.map((i:any)=>{
        return {
            id : i.id, name: i.name +" "+ i.surname, type: "intern"
        }
    })]
    
    const fetchUtilsData = () => {
        dispatch(getBonCommandeExterne({ id , args:{
            include: {
                articleCommandeBce:{
                    include:{
                        vendor:true
                    }
                }
            }  
        }}));
        dispatch(getInterns({}));
        dispatch(getEmployees({}));
        dispatch(getGrantList({}));
        dispatch(getBudgetLineList({}));
        
    };

    useEffect(() => {
        fetchUtilsData();
    }, [ [id]]);

    useEffect(()=> {
        const data = {
            ref: bonCommandeExterne.ref,
            dateCommande: bonCommandeExterne.dateCommande,
            objet: bonCommandeExterne.objet,
            demandeur:total.find((e:any)=> e.id === bonCommandeExterne?.demandeur)?.name,
            grant:grantList.find((e:any)=> e.id === bonCommandeExterne?.grant)?.code,
            ligneBudgetaire:budgetLineList.find((e:any)=> e.id === bonCommandeExterne?.ligneBudgetaire)?.code,
            beneficiaire:bonCommandeExterne.beneficiaire,
            modePaiement: bonCommandeExterne.modePaiement,
            conditionLivraison: bonCommandeExterne.conditionLivraison,
            articleCommandeBce:bonCommandeExterne.articleCommandeBce
        }
        setPdf(data)
    },[bonCommandeExterne])
    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
            <SectionNavigation
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Stack flexDirection={"row"}>
                    <Button color="info"
                        onClick={()=> router.back()}
                     variant="text" startIcon={<ArrowBackIcon />}>
                        Retour
                    </Button>
                    <PDFButton data={pdf} />
                </Stack>
                <Typography variant="h4" color="GrayText">
                    Détail d'un bon de commande externe
                </Typography>
            </SectionNavigation>
            <DetailsContainer>
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
                            <Grid container spacing={4} my={1}>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Référence
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                        {bonCommandeExterne.ref}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Mode de paiement
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonCommandeExterne.modePaiement}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Condition de livraison
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonCommandeExterne.conditionLivraison}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} my={1}>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Demandeur
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {total.find((e:any)=> e.id === bonCommandeExterne?.demandeur)?.name}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Bénéficiaire
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonCommandeExterne?.beneficiaire}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Objet
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonCommandeExterne?.objet}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} my={1}>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Grant
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {grantList.find((e:any)=> e.id === bonCommandeExterne?.grant)?.code}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Ligne budgétaire
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {budgetLineList.find((e:any)=> e.id === bonCommandeExterne?.ligneBudgetaire)?.code}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Date de commande 
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                        <Moment format="DD/MM/YYYY">
                                            {bonCommandeExterne.dateCommande}
                                        </Moment>
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                            </Grid>
                        </Stack>
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
                                    Liste des articles
                                </Typography>
                            </Stack>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="left">Fournisseur</TableCell>
                                            <TableCell align="left">Désignation</TableCell>
                                            <TableCell align="left">Caractéristique</TableCell>
                                            <TableCell align="left">PU</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bonCommandeExterne.articleCommandeBce?.map((item:any , index:any) => (
                                            <TableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell align="left">{item.vendor?.name}</TableCell>
                                                <TableCell component="th" scope="row">{item.designation}</TableCell>
                                                <TableCell align="left">{item.caracteristik}</TableCell>
                                                <TableCell align="left">{item.pu}Ar</TableCell>
                                                <TableCell align="left">{item.quantity}Ar</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </FormContainer>
                </Box>
            </DetailsContainer>
        </Container>
    );
};
  
export default DetailsBCE;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
padding: 30,
border: "1px solid #E0E0E0",
borderRadius: 20,
}));

const FormContainer = styled(Stack)(({ theme }) => ({
    padding: 30,
    borderRadius: 20,
    background: "#fff",
    marginBottom:30,
}));