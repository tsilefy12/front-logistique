import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Moment from "react-moment";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { getBonCommandeInterne } from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";
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
import PDFButton from "./PrintBci";
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getEmployees } from "../../../../redux/features/orderEquipment";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";
import { getPrograms } from "../../../../redux/features/program/programSlice";
import formatMontant from "../../../../hooks/format";
import useFetchPrestataire from "../../bon_commande_externe/hooks/getPrestataire";
const DetailsBCI = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { bonCommandeInterne } = useAppSelector(
    (state) => state.bonCommandeInterne
  );
  const { employees } = useAppSelector((state) => state.employe);
  const { interns } = useAppSelector((state) => state.stagiaire);
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);
  const { programs } = useAppSelector((state) => state.program);
  const fetchPrestataire = useFetchPrestataire();
  const { prestataireListe } = useAppSelector(
    (state: any) => state.prestataire
  );

  const [pdf, setPdf] = useState<any>({});

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
    ...prestataireListe.map((i: any) => {
      return {
        id: i.id,
        name: i.matricule + " " + i.name + " " + i.surname,
        type: "prestataire",
      };
    }),
  ];

  const getDetailsBCI = () => {
    dispatch(
      getBonCommandeInterne({
        id,
        args: {
          include: {
            ArticleCommande: true,
          },
        },
      })
    );
    dispatch(getInterns({}));
    dispatch(getEmployees({}));
    dispatch(getGrantList({}));
    dispatch(getBudgetLineList({}));
    dispatch(getPrograms({}));
    fetchPrestataire();
  };

  useEffect(() => {
    getDetailsBCI();
    const dataPdf = {
      programme: programs.find(
        (e: any) => e.id === bonCommandeInterne.programme
      )?.name,
      grant: grantList.find((e: any) => e.id === bonCommandeInterne?.grant)
        ?.code,
      ligneBudgetaire: budgetLineList.find(
        (e: any) => e.id === bonCommandeInterne?.ligneBudgetaire
      )?.code,
      demandeur: total.find((e: any) => e.id === bonCommandeInterne?.demandeur)
        ?.name,
      reference: bonCommandeInterne.reference,
      observation: bonCommandeInterne.observation,
      dateBonCommande: bonCommandeInterne.dateBonCommande,
      numBonCommande: bonCommandeInterne.numBonCommande,
      montantTotal: bonCommandeInterne.montantTotal,
      ArticleCommande: bonCommandeInterne.ArticleCommande,
      techVerify: total.find(
        (e: any) =>
          e.id ==
          grantList.find((f: any) => f.id == bonCommandeInterne?.grant)
            ?.techValidator
      )?.name,
      financilaVerify: total.find(
        (e: any) =>
          e.id ==
          grantList.find((f: any) => f.id == bonCommandeInterne?.grant)
            ?.financeVerificator
      )?.name,
    };
    setPdf(dataPdf);
  }, [id, bonCommandeInterne]);
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
          Détails d'un bon de commande interne
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
                      Référence
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {bonCommandeInterne.reference}
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      N° Bon de commande
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {bonCommandeInterne.numBonCommande}
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Demandeur
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {
                        total.find(
                          (e: any) => e.id === bonCommandeInterne?.demandeur
                        )?.name
                      }
                    </Typography>
                  </InfoItems>
                </Grid>
              </Grid>
              <Grid container spacing={4} my={1}>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Grant
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {
                        grantList.find(
                          (e: any) => e.id === bonCommandeInterne?.grant
                        )?.code
                      }
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Ligne budgétaire
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {
                        budgetLineList.find(
                          (e: any) =>
                            e.id === bonCommandeInterne?.ligneBudgetaire
                        )?.code
                      }
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Montant total
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {formatMontant(Number(bonCommandeInterne.montantTotal))}
                    </Typography>
                  </InfoItems>
                </Grid>
              </Grid>
              <Grid container spacing={4} my={1}>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Programme
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {
                        programs.find(
                          (e: any) => e.id === bonCommandeInterne.programme
                        )?.name
                      }
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Justification
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {bonCommandeInterne.observation}
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
                        {bonCommandeInterne.dateBonCommande}
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
                    <TableCell>Désignation</TableCell>
                    <TableCell align="left">Caractéristique</TableCell>
                    <TableCell align="left">PU</TableCell>
                    <TableCell align="left">Quantité</TableCell>
                    <TableCell align="left">Valeur</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bonCommandeInterne.ArticleCommande?.map(
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
                        <TableCell align="left">{item.caracteristik}</TableCell>
                        <TableCell align="left">
                          {formatMontant(item.pu!)}
                        </TableCell>
                        <TableCell align="left">{item.quantite}</TableCell>
                        <TableCell align="left">
                          {formatMontant(item.valueArticle!)}
                        </TableCell>
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
