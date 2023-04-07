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
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  editOrderEquipmentItem,
  getOrderEquipmentItem,
} from "../../../redux/features/OrderEquipmentItem";

const DetailsOrderEquipmentItem = () => {
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch = useAppDispatch();
  const { orderEquipmentItem } = useAppSelector(
    (state) => state.orderEquipmentItem
  );

  // useEffect(() => {
  //   getDetailsOrderEquipmentList();
  // }, [id]);

  // const getDetailsOrderEquipmentList = () => {
  //   const args: any = {
  //     include: {
  //       designation: true,
  //       quantity: true,
  //       orderEquipment: true,
  //     },
  //   };
  //   dispatch(getOrderEquipmentItem({ id, args }));
  // };
  React.useEffect(() => {
    if (id) {
      const args = {
        include: {
          orderEquipment: true,
        },
      };
      dispatch(getOrderEquipmentItem({ id, args }));
    }
  }, [id]);

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href="/materiels/mes_commandes">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Detail Mes Commande
        </Typography>
      </SectionNavigation>
      <DetailsContainer>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Designation :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderEquipmentItem.designation}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Quantite :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderEquipmentItem.quantity}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Commande :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderEquipmentItem.orderEquipment?.reason}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default DetailsOrderEquipmentItem;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
