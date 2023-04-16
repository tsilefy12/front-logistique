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
import { getOrderEquipment } from "../../../../redux/features/orderEquipment";

const DetailsOrderEquipement = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { orderEquipment } = useAppSelector((state) => state.orderEquipment);

  useEffect(() => {
    getDetailsOrderEquipement();
  }, [id]);

  const getDetailsOrderEquipement = () => {
    const args: any = {
      include: {
        designation: true,
        reason: true,
        deadlineOfReception: true,
        numberOfAuthorisedOffersPossible: true,
        applicantId: true,
        status: true,
      },
    };
    dispatch(getOrderEquipment({ id, args }));
  };

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href="/materiels/commande">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Details Commande
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
                {orderEquipment.designation}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Raison :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderEquipment.reason}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Deadline de reception :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderEquipment.deadlineOfReception}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Nombre offre possible :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderEquipment.numberOfAuthorisedOffersPossible}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Demandeur :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderEquipment.applicant?.name}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Status :
              </Typography>
              <Typography variant="body1" color="gray">
                {orderEquipment.status}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default DetailsOrderEquipement;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
