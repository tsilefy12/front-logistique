import {
    Button,
    Container,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Moment from "react-moment";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled } from "@mui/material";
import { getBonReception } from "../../../../redux/features/bon_reception/bonReceptionSlice";
import PDFButton from "./pdfBonReception";

const DetailsBonReception = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = router.query;
    const { bonReception } = useAppSelector((state) => state.bonReceptions);

    useEffect(() => {
        getDetailsBonReception();
    }, [id]);
  
    const getDetailsBonReception = () => {
        dispatch(getBonReception({ id,args:{
            include:{
                produitRecu:true,
                bonDeCommandeExterne:true
            }
        }}));
    };

    useEffect(()=> {
        console.log(bonReception)
    },[bonReception])
    return (
        <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
            <SectionNavigation
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 2 }}
            >
                <Stack flexDirection={"row"}>
                    <Link href="/materiels/bon_reception">
                        <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
                            Retour
                        </Button>
                    </Link>
                    <PDFButton data={bonReception} />
                </Stack>
                <Typography variant="h4" color="GrayText">
                    Details d'une bon de reception
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
                                        Bon de commande externe
                                        </Typography>
                                        <Typography variant="body1" color="gray">
                                            {bonReception.bonDeCommandeExterne?.ref}
                                        </Typography>
                                    </InfoItems>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                <InfoItems direction="row" spacing={2}>
                                    <Typography variant="body1" color="secondary">
                                        Date de reception
                                    </Typography>
                                    <Typography variant="body1" color="gray">
                                        <Moment format="DD/MM/YYYY">
                                            {bonReception.dateReception}
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
                                            <TableCell>Designation</TableCell>
                                            <TableCell align="left">Quantité</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {bonReception.produitRecu?.map((item:any , index:any) => (
                                            <TableRow
                                                key={index}
                                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">{item.designation}</TableCell>
                                                <TableCell align="left">{item.quantite}</TableCell>
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
  
export default DetailsBonReception;

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