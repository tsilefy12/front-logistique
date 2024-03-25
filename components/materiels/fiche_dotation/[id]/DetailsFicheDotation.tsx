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
import { getFicheDotation } from "../../../../redux/features/fiche_dotation/ficheDotationSlice";
import PDFButton from "./PrintFicheDotation";
const DetailsFicheDotation = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = router.query;
    const { ficheDotation } = useAppSelector((state) => state.ficheDotation);
    // const [pdfData, setPdfData] = useState<any>();

    const getDetailsFicheDotation = () => {
        dispatch(getFicheDotation({ id,args:{
            include:{
                personneConcerne:true
            }
        }}));
        // setPdfData(ficheDotation)

    };

    useEffect(()=> {
        getDetailsFicheDotation();
        console.log(ficheDotation)
    },[id,ficheDotation])

    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
            <SectionNavigation
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Stack flexDirection={"row"}>
                    <Button color="info" variant="text" onClick={()=>{
                        router.back()
                    }}startIcon={<ArrowBackIcon />
                    }>
                        Retour
                    </Button>
                    <PDFButton data={ficheDotation} />
                </Stack>
                <Typography variant="h4" color="GrayText">
                    Details d'une fiche de dotation
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
                                            Region
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {ficheDotation?.region}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            District
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {ficheDotation.district}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Commune
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {ficheDotation.commune}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Fokontany
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {ficheDotation.fokontany}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                            </Grid>
                            <Grid container spacing={4} my={1}>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Ligne budgétaire
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {ficheDotation.ligneBudgetaire}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Grant
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {ficheDotation.grant}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Date
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            <Moment format="DD/MM/YYYY">
                                                {ficheDotation.date}
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
                                    Liste des personnes concernés
                                </Typography>
                            </Stack>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nom et Prénom</TableCell>
                                            <TableCell align="left">CIN</TableCell>
                                            <TableCell align="left">Fonction</TableCell>
                                            <TableCell align="left">Désignation</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {ficheDotation.personneConcerne?.map((item:any , index:any) => (
                                            <TableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{item.nomPrenom}</TableCell>
                                                <TableCell align="left">{item.cin}</TableCell>
                                                <TableCell align="left">{item.fonction}</TableCell>
                                                <TableCell align="left">{item.designation}</TableCell>
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

export default DetailsFicheDotation;

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