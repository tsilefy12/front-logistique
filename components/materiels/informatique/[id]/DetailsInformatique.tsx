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
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";
import { getEmployees } from "../../../../redux/features/employeStagiaire/employeeSlice";
import Moment from "react-moment";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";

const DetailsInformatique = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { equipment } = useAppSelector((state) => state.equipment);
  const { employees } = useAppSelector((state) => state.employe);
  const { interns } = useAppSelector((state) => state.stagiaire);
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);

  const total = [
    ...employees.map((i: any) => {
      return {
        id: i.id,
        name: i.name + " " + i.surname,
        type: "employe",
      };
    }),
    ...interns.map((i: any) => {
      return {
        id: i.id,
        name: i.name + " " + i.surname,
        type: "intern",
      };
    }),
  ];

  useEffect(() => {
    getDetailInformatique();
  }, [id]);

  const getDetailInformatique = () => {
    const args: any = {
      include: {
        type: true,
        vendor: true,
      },
    };
    dispatch(getEquipment({ id, args }));
    dispatch(getInterns({}));
    dispatch(getEmployees({}));
    dispatch(getGrantList({}));
    dispatch(getBudgetLineList({}));
  };
  // console.log(equipment);
  function getText(etat: any) {
    switch (etat) {
      case "GOOD":
        return "Bon etat";
        break;
      case "BAD":
        return "Mauvais";
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
          Détails Equipement
        </Typography>
      </SectionNavigation>
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"column"} gap={2}>
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
                  Code :
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
                  {total.find((e: any) => e.id === equipment?.ownerId)?.name}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
        </Stack>
        <Stack direction={"column"} gap={2}>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Date d'acquisition
                </Typography>
                <Typography variant="body1" color="gray">
                  <Moment format="DD/MM/YYYY">
                    {equipment.acquisitionDate}
                  </Moment>
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Valeur d'acquisition
                </Typography>
                <Typography variant="body1" color="gray">
                  {equipment?.acquisitionValue}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Date d'amortissement
                </Typography>
                <Typography variant="body1" color="gray">
                  <Moment format="DD/MM/YYYY">
                    {equipment.dateAmortissement}
                  </Moment>
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Durée d'amortissement
                </Typography>
                <Typography variant="body1" color="gray">
                  {equipment.dureAmortissement} ans
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
        </Stack>
        <Stack direction={"column"} gap={2}>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Grant
                </Typography>
                <Typography variant="body1" color="gray">
                  {grantList.find((e: any) => e.id === equipment?.grant)?.code}
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
                  {
                    budgetLineList.find(
                      (e: any) => e.id === equipment?.ligneBudgetaire
                    )?.code
                  }
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
          <Grid container spacing={4} my={1}>
            <Grid item xs={12} md={12}>
              <InfoItems direction="row" spacing={2}>
                <Typography variant="body1" color="secondary">
                  Fournisseur
                </Typography>
                <Typography variant="body1" color="gray">
                  {equipment?.vendor?.name}
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
                  {getText(equipment?.status)}
                </Typography>
              </InfoItems>
            </Grid>
          </Grid>
        </Stack>
      </Stack>
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
