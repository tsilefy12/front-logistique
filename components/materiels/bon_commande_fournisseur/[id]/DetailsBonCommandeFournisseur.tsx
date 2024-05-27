import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Moment from "react-moment";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import { getBonCommandeFournisseur } from "../../../../redux/features/bon_commande_fournisseur/bonCommandeFournisseurSlice";
import PDFButton from "./printBonCommandeFournisseur";
import formatMontant from "../../../../hooks/format";

const DetailsBCI = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { commandeFournisseur } = useAppSelector(
    (state) => state.bonDeCommandeFournisseur
  );

  const [pdf, setPdf] = useState<any>({});

  const getDetailsBCI = () => {
    dispatch(
      getBonCommandeFournisseur({
        id,
        args: {
          include: {
            vendor: true,
            articleFournisseur: true,
          },
        },
      })
    );
  };

  useEffect(() => {
    getDetailsBCI();
    const dataPdf = {
      fournisseur: commandeFournisseur.vendor?.name,
      vendor: commandeFournisseur?.vendor,
      establishmentDate: commandeFournisseur.establishmentDate,
      paymentMethod: commandeFournisseur.paymentMethod,
      deliveryCondition: commandeFournisseur.deliveryCondition,
      deliveryDate: commandeFournisseur.deliveryDate,
      articleFournisseur: commandeFournisseur?.articleFournisseur,
    };
    setPdf(dataPdf);
  }, [id, commandeFournisseur]);
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Stack flexDirection={"row"}>
          <Button
            color="info"
            onClick={() => router.back()}
            variant="text"
            startIcon={<ArrowBackIcon />}
          >
            Retour
          </Button>
          <PDFButton data={pdf} />
        </Stack>
        <Typography variant="h4" color="GrayText">
          Details d'une bon de commande fournisseur
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
                      Fournisseur
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {commandeFournisseur.vendor?.name}
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Date d'etablissement
                    </Typography>
                    <Typography variant="body1" color="gray">
                      <Moment format="DD/MM/YYYY">
                        {commandeFournisseur.establishmentDate}
                      </Moment>
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Mode de paiement
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {commandeFournisseur.paymentMethod}
                    </Typography>
                  </InfoItems>
                </Grid>
              </Grid>
              <Grid container spacing={4} my={1}>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Condition de livraison
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {commandeFournisseur.deliveryCondition}
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Date de livraison
                    </Typography>
                    <Typography variant="body1" color="gray">
                      <Moment format="DD/MM/YYYY">
                        {commandeFournisseur.deliveryDate}
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
                    <TableCell align="left">Prix unitaire</TableCell>
                    <TableCell align="left">Quantité</TableCell>
                    <TableCell align="left">Montant</TableCell>
                    <TableCell align="left">Details</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {commandeFournisseur.articleFournisseur?.length > 0 &&
                    commandeFournisseur.articleFournisseur?.map(
                      (item: any, index: any) => (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.designation}
                          </TableCell>
                          <TableCell align="left">{item.unitPrice}</TableCell>
                          <TableCell align="left">{item.quantite}</TableCell>
                          <TableCell align="left">
                            {formatMontant(item.montant)}
                          </TableCell>
                          <TableCell align="left">{item.details}</TableCell>
                        </TableRow>
                      )
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </FormContainer>
        </Box>
      </DetailsContainer>
    </Container>
  );
};

export default DetailsBCI;

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
  marginBottom: 30,
}));
