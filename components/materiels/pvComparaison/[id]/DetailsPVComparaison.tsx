import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
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
import { getPvComparaison } from "../../../../redux/features/pvComparaison/pvComparaisonSlice";
import PDFButton from "./PrintPV";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";
import { getPrograms } from "../../../../redux/features/program/programSlice";
import formatMontant from "../../../../hooks/format";
const DetailsPvComparaison = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { pvComparaison } = useAppSelector((state) => state.pvComparaison);
  const { grantList } = useAppSelector((state) => state.grant);
  const { budgetLineList } = useAppSelector((state) => state.lineBugetaire);
  const { programs } = useAppSelector((state) => state.program);
  const [pdf, setPdf] = useState<any>({});
  const [offre, setOffres] = useState<any>({});
  let tempOffres: any = {};

  const getDetailsPVComparaison = () => {
    dispatch(
      getPvComparaison({
        id,
        args: {
          include: {
            bonDeCommandeExterne: {
              include: {
                articleCommandeBce: true,
              },
            },
            bonDeCommandeInterne: {
              include: {
                ArticleCommande: true,
              },
            },
            tableComparaison: {
              include: {
                offreRetenu: true,
                vendor: true,
              },
            },
          },
        },
      })
    );
    dispatch(getGrantList({}));
    dispatch(getBudgetLineList({}));
    dispatch(getPrograms({}));
  };
  useEffect(() => {
    getDetailsPVComparaison();
    setOffres(tempOffres);
    const data = {
      objet: pvComparaison.objet,
      grant: grantList.find((e: any) => e.id === pvComparaison.grant)?.code,
      program: programs.find((e: any) => e.id === pvComparaison.programme)
        ?.name,
      ligneBudgetaire: budgetLineList.find(
        (e: any) => e.id === pvComparaison.ligneBudgetaire
      )?.code,
      bci: pvComparaison.bce
        ? pvComparaison.bonDeCommandeExterne?.ref
        : pvComparaison.bonDeCommandeInterne?.reference,
      tableComparaison: pvComparaison.tableComparaison,
      offre: offre,
    };
    setPdf(data);
  }, [id, pvComparaison]);
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
            variant="text"
            onClick={() => router.back()}
            startIcon={<ArrowBackIcon />}
          >
            Retour
          </Button>
          <PDFButton data={pdf} />
        </Stack>
        <Typography variant="h4" color="GrayText">
          Détails d'un pv de comparaison d'offre
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
                      Objet
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {pvComparaison.objet}
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Ref BCI / BCE
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {pvComparaison.bce
                        ? pvComparaison.bonDeCommandeExterne?.ref
                        : pvComparaison.bonDeCommandeInterne?.reference}
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Matériel
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {pvComparaison.tableComparaison?.map((item: any) => (
                        <Stack direction="column" gap={1} key={item.id}>
                          <span>{item.designation.join(",")}</span>
                        </Stack>
                      ))}
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
                          (e: any) => e.id === pvComparaison?.programme
                        )?.name
                      }
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Grant
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {
                        grantList.find((e: any) => e.id === pvComparaison.grant)
                          ?.code
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
                          (e: any) => e.id === pvComparaison.ligneBudgetaire
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
                      Offre retenu
                    </Typography>
                    <Typography variant="body1" color="gray">
                      Offre n°{offre.index}
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Argument
                    </Typography>
                    <Typography variant="body1" color="gray">
                      {offre.argument}
                    </Typography>
                  </InfoItems>
                </Grid>
                <Grid item xs={12} md={12}>
                  <InfoItems direction="row" spacing={2}>
                    <Typography variant="body1" color="secondary">
                      Motif
                    </Typography>
                    <Typography variant="body1" color="gray">
                      <Stack
                        direction="row"
                        sx={{
                          flex: "1 1 100%",
                          alignItems: "center",
                        }}
                      >
                        <FormControlLabel
                          label="Moins distant"
                          control={
                            <Checkbox
                              checked={
                                offre?.motif
                                  ? offre?.motif.includes("moins_distant")
                                  : false
                              }
                            />
                          }
                        />
                        <FormControlLabel
                          label="Conforme aux besoins"
                          control={
                            <Checkbox
                              checked={
                                offre?.motif
                                  ? offre?.motif.includes(
                                      "conforme_aux_besoins"
                                    )
                                  : false
                              }
                            />
                          }
                        />
                      </Stack>
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
                Liste des offres
              </Typography>
            </Stack>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Fournisseur</TableCell>
                    <TableCell align="left">Mode de paie</TableCell>
                    <TableCell align="left">Désignation</TableCell>
                    <TableCell align="left">Montant total</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pvComparaison.tableComparaison?.map(
                    (item: any, index: any) => {
                      if (item.offreRetenu?.length > 0) {
                        const data = {
                          index: index + 1,
                          argument: item.offreRetenu[0].argument,
                          motif: item.offreRetenu[0].motif,
                        };
                        tempOffres = data;
                      }

                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            Offre n°{index + 1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {item.vendor?.name}
                          </TableCell>
                          <TableCell align="left">{item.modePaie}</TableCell>
                          <TableCell align="left">
                            <Stack direction="column" spacing={1}>
                              {item.designation
                                .split("\n")
                                .map((line: any, index: any) => (
                                  <span key={index}>{line}</span>
                                ))}
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            {formatMontant(item.amount!)}
                          </TableCell>
                        </TableRow>
                      );
                    }
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

export default DetailsPvComparaison;

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
