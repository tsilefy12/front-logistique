import {
  Badge,
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
import { getEquipment } from "../../../../redux/features/equipment/useCases/getEquipment";

const DetailsInformatique = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { equipment } = useAppSelector((state) => state.equipment);

  useEffect(() => {
    getDetailInformatique();
  }, [id]);

  const getDetailInformatique = () => {
    const args: any = {
      include: {
        typeEquipmentId: true,
        ownerId: true,
      },
    };
    dispatch(getEquipment({ id, args }));
  };

  function getText(etat: string) {
    switch (etat) {
      case "GOOD":
        return "Bon_état";
        break;
      case "BAD":
        return "mauvais";
        break;
      case "BROKEN":
        return "Inutilisable";
        break;

      default:
        break;
    }
  }

  return (
    <Container maxWidth="xl" sx={{ backgroundColor: "#fff", pb: 5 }}>
      <SectionNavigation
        direction="row"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <Link href="/materiels/informatiques">
          <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
            Retour
          </Button>
        </Link>
        <Typography variant="h4" color="GrayText">
          Details Equipement
        </Typography>
      </SectionNavigation>
      <DetailsContainer>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                N°Optim :
              </Typography>
              <Typography variant="body1" color="gray">
                {equipment.numOptim}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Type :
              </Typography>
              <Typography variant="body1" color="gray">
                {equipment?.type?.type}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Utilisateur :
              </Typography>
              <Typography variant="body1" color="gray">
                {equipment?.owner?.name}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Designation :
              </Typography>
              <Typography variant="body1" color="gray">
                {equipment.designation}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
        <Grid container spacing={4} my={1}>
          <Grid item xs={12} md={12}>
            <InfoItems direction="row" spacing={2}>
              <Typography variant="body1" color="secondary">
                Etat :
              </Typography>
              <Typography variant="body1" color="gray">
                {getText(equipment.status)}
              </Typography>
            </InfoItems>
          </Grid>
        </Grid>
      </DetailsContainer>
    </Container>
  );
};

export default DetailsInformatique;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
}));
