import {
  Button,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
// import useFetchOrderFormListe from "../hooks/useFetchOrderFormListe";
import Moment from "react-moment";
import { getOrderForm } from "../../../../redux/features/order-form";
import { Print } from "@mui/icons-material";
// import html2pdf from 'html2pdf.js';

const DetailsOrderForm = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch = useAppDispatch();
  const { orderForm } = useAppSelector((state) => state.orderForm);
  // const fetchOrderFormListe = useFetchOrderFormListe();

  // useEffect(() => {
  //   fetchOrderFormListe();
  // }, []);

  useEffect(() => {
    getDetailsOrderFormList();
  }, [id]);

  const getDetailsOrderFormList = () => {
    const args: any = {
      include: {
        number: true,
        reference: true,
        shippingMethod: true,
        deliveryDate: true,
        vendor: true,
      },
    };
    dispatch(getOrderForm({ id, args }));
  };
  const Imprimer = () => {
    const element = document.getElementById("tableauPDF");
    // html2pdf(element);
}
  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
      <Stack direction="row" spacing={2} >
      <Link href="/materiels/bon_de_commande">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Button
              variant="outlined"
              startIcon={<Print />}
              size="small"
              onClick={Imprimer}
            >
            </Button>
      </Stack>
        <Typography variant="h4" color="GrayText">
          Detail Bon de commande
        </Typography>
      </SectionNavigation>
      <DetailsContainer>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Numero :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderForm.number}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Référence :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderForm.reference}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Mode de livraison :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderForm.shippingMethod}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Date de livraison :
              </Typography>
              <Typography variant="body1" color="gray">
                <Moment format="DD/MM/YYYY">{orderForm.deliveryDate}</Moment>
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Fournisseur :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderForm?.vendor?.name}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default DetailsOrderForm;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
