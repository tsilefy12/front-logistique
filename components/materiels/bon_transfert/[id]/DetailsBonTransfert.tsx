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
import { getBonTransfert } from "../../../../redux/features/bon_transfert/bonTransfertSlice";
import PDFButton from "./PrintBonTransfert";
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";
import { getEmployees } from "../../../../redux/features/orderEquipment";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getPrograms } from "../../../../redux/features/program/programSlice";
const DetailsBonTransfert = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = router.query;
    const { bonTransfert } = useAppSelector((state) => state.bonTransfert);
    const { employees } = useAppSelector( (state) => state.employe);
    const { interns } = useAppSelector( (state) => state.stagiaire);
    const { grantList } = useAppSelector( (state) => state.grant);
    const { programs } = useAppSelector( (state) => state.program);
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
    
    const getDetailsBonTransfert = () => {
        dispatch(getBonTransfert({ id,args:{
            include:{
                articleTransfert:true
            }
        }}));
        dispatch(getInterns({}));
        dispatch(getEmployees({}));
        dispatch(getGrantList({}));
        dispatch(getPrograms({}));
    };

    useEffect(()=> {
        getDetailsBonTransfert();
        const data = {
            expediteur: total.find((e:any)=> e.id === bonTransfert?.expediteur)?.name,
            destination:total.find((e:any)=> e.id === bonTransfert?.designation)?.name,
            reference:bonTransfert.reference,
            dateExp: bonTransfert.dateExp,
            expeditionVia: bonTransfert.expeditionVia,
            programme:programs.find((e:any)=>  e.id === bonTransfert?.programme)?.name,
            grant: grantList.find((e:any)=> e.id === bonTransfert?.grant)?.code,
            articleTransfert: bonTransfert.articleTransfert
        }
        setPdf(data)
    },[id,bonTransfert])

    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
            <SectionNavigation
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Stack flexDirection={"row"}>
                    <Button color="info" variant="text" 
                    onClick={()=> router.back()}
                    startIcon={<ArrowBackIcon />}>
                        Retour
                    </Button>
                    <PDFButton data={pdf} />
                </Stack>
                <Typography variant="h4" color="GrayText">
                    Détails d'un bon de transfert
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
                                            Référence :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonTransfert?.reference}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Expediteur :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {total.find((e:any)=> e.id === bonTransfert?.expediteur)?.name}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                    <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Destination :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                        {total.find((e:any)=> e.id === bonTransfert?.designation)?.name}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Date expediée :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            <Moment format="DD/MM/YYYY">
                                                {bonTransfert.dateExp}
                                            </Moment>
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} my={1}>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Expedition via
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                        {bonTransfert.expeditionVia}
                                        </Typography>
                                    </InfoItems>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Programme :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                        {programs.find((e:any)=>  e.id === bonTransfert?.programme)?.name}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Grant :
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {grantList.find((e:any)=> e.id === bonTransfert?.grant)?.code}
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
                                    Liste des articles à transférer
                                </Typography>
                            </Stack>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Désignation</TableCell>
                                            <TableCell align="left">Quantité commander</TableCell>
                                            <TableCell align="left">Quantité expedié</TableCell>
                                            <TableCell align="left">Observation</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bonTransfert.articleTransfert?.map((item:any , index:any) => (
                                            <TableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{item.designation}</TableCell>
                                                <TableCell align="left">{item.quantiteCommande}</TableCell>
                                                <TableCell align="left">{item.quantiteExpedie}</TableCell>
                                                <TableCell align="left">{item.observation}</TableCell>
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

export default DetailsBonTransfert;

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