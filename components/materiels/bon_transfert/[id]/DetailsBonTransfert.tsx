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
const DetailsBonTransfert = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = router.query;
    const { bonTransfert } = useAppSelector((state) => state.bonTransfert);
    // const [pdfData, setPdfData] = useState<any>();


    const getDetailsBonTransfert = () => {
        dispatch(getBonTransfert({ id,args:{
            include:{
                articleTransfert:true
            }
        }}));
        // setPdfData(bonTransfert)

    };

    useEffect(()=> {
        getDetailsBonTransfert();
        console.log(bonTransfert)
    },[id,bonTransfert])

    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
            <SectionNavigation
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Stack flexDirection={"row"}>
                    <Link href="/materiels/bon_transfert">
                        <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
                            Retour
                        </Button>
                    </Link>
                    <PDFButton data={bonTransfert} />
                </Stack>
                <Typography variant="h4" color="GrayText">
                    Details d'une bon de transfert
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
                                            Expediteur
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonTransfert.expediteurData?.name} {bonTransfert.expediteurData?.surname}
                                        </Typography>
                                    </InfoItems>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Destination
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonTransfert?.destination?.name} {bonTransfert?.destination?.surname}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Date expediée
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
                                            ExpeditionVia
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                        {bonTransfert.expeditionVia}
                                        </Typography>
                                    </InfoItems>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Departement
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                        {bonTransfert.departement}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <InfoItems direction="row" spacing={2}>
                                        <Typography variant="body1" color="secondary">
                                            Grant
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonTransfert.grant}
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
                                    Liste des articles à transferer
                                </Typography>
                            </Stack>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Designation</TableCell>
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