import {
    Button,
    Container,
    Grid,
    Stack,
    styled,
    Typography,
    Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxHooks";
import { getConsumptionInvoice } from "../../../../../redux/features/consumption_invoice";
//import { getCarVoucher } from "../../../../../redux/features/car-voucher";


const DetailFactureConsommation = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { id }: any = router.query;
    const { consumptionInvoice } = useAppSelector(
        (state) => state.consumptionInvoice
    );

console.log(consumptionInvoice)

    useEffect(() => {
        getDetailsFactureConsommation();
      
    }, [id]);

    const getDetailsFactureConsommation = async () => {
        const args: any = {};
        args.include = {
            carVoucher: true,
        }
        await dispatch(getConsumptionInvoice({ id, args }));
    };
    

  


    return(
        <Container maxWidth="xl" sx={{ pb: 5 }}>
        <NavigationContainer>
          <SectionNavigation
            direction="row"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Link href="/materiel_de_transport/facture_de_consommation">
              <Button
                color="info"
                variant="text"
                startIcon={<ArrowBackIcon />}
              >
                Retour
              </Button>
            </Link>
            <Typography variant="h4" color="GrayText">
              Details facture de consommation
            </Typography>
          </SectionNavigation>
          <Divider />
        </NavigationContainer>
        <DetailsContainer>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Numéro de facture :
                </Typography>
                <Typography variant="body1" color="gray">
                  {consumptionInvoice.invoiceNumber}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Numéro BV :
                </Typography>
                <Typography variant="body1" color="gray">
                  {consumptionInvoice?.carVoucher?.number}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                 Motif de la course :
                </Typography>
                <Typography variant="body1" color="gray">
                  {consumptionInvoice.reason}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  KM de départ :
                </Typography>
                <Typography variant="body1" color="gray">
                  {consumptionInvoice.DepartureKilometrage}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                    KM de d'arrivé :
                </Typography>
                <Typography variant="body1" color="gray">
                  {consumptionInvoice.arrivalKilometrage}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                    Consommation :
                </Typography>
                <Typography variant="body1" color="gray">
                  {consumptionInvoice.consommation}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                    Unité :
                </Typography>
                <Typography variant="body1" color="gray">
                  {consumptionInvoice.SKU}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                    Prix unitaire :
                </Typography>
                <Typography variant="body1" color="gray">
                  {consumptionInvoice.unitPrice}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                    Montant :
                </Typography>
                <Typography variant="body1" color="gray">
                    {consumptionInvoice.amount}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
        </DetailsContainer>
      </Container>
    )
}


export const InfoItems = styled(Stack)(({ theme }) => ({}));
  
const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
  background: "#fff",
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));


export default DetailFactureConsommation;