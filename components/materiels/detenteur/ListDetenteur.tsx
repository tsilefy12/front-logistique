import React, { Fragment, useState } from "react";
import Container from "@mui/material/Container";
import {
  Divider,
  Grid,
  Paper,
  styled,
  Typography,
  Stack,
  Button,
  useTheme,
  // TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { useAppSelector } from "../../../hooks/reduxHooks";
import CardDetenteur from "./home/CardDetenteur";
import SearchDetenteur from "./home/Search";
import { useRouter } from "next/router";
import useFetchDetenteurListe from "./hooks/useFetchDetenteurListe";

const ListDetenteur = () => {
  const theme = useTheme();

  const router = useRouter();
  const { holderListe } = useAppSelector((state) => state.holder);

  const fetchDetenteurList = useFetchDetenteurListe();

  React.useEffect(() => {
    fetchDetenteurList();
  }, [router.query]);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <FilterContainer>
            <FilterTitle>
              <FilterAltIcon color="disabled" fontSize="small" />
              <Typography variant="h4">Département</Typography>
            </FilterTitle>
            <Divider />
            <FilterContent>
              <ContainerBnt>
                <Button variant="text" size="small">
                  tous
                </Button>
              </ContainerBnt>
              <ContainerBnt>
                <Button
                  variant="text"
                  size="small"
                  sx={{ color: theme.palette.grey[500] }}
                >
                  Administration
                </Button>
              </ContainerBnt>
              <ContainerBnt>
                <Button
                  variant="text"
                  size="small"
                  sx={{ color: theme.palette.grey[500] }}
                >
                  Management
                </Button>
              </ContainerBnt>
              <ContainerBnt>
                <Button
                  variant="text"
                  size="small"
                  sx={{ color: theme.palette.grey[500] }}
                >
                  Services
                </Button>
              </ContainerBnt>
              <ContainerBnt>
                <Button
                  variant="text"
                  size="small"
                  sx={{ color: theme.palette.grey[500] }}
                >
                  Recherche
                </Button>
              </ContainerBnt>
            </FilterContent>
          </FilterContainer>
        </Grid>
        <Grid item xs={12} md={9}>
          <ContainerListEmploye>
            <SearchDetenteur />
            <Divider />
            <ListEmployeContent>
              <CustomBtnAdd>
                <Link href="/materiels/detenteur/ajouter">
                  <Button
                    sx={{
                      width: 286,
                      height: 116,
                    }}
                    variant="text"
                    startIcon={<AddIcon />}
                  >
                    Ajouter Detenteur
                  </Button>
                </Link>
              </CustomBtnAdd>
              {holderListe.map((holder, index) => (
                <Fragment key={index}>
                  <CardDetenteur holder={holder} />
                </Fragment>
              ))}
            </ListEmployeContent>
          </ContainerListEmploye>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ListDetenteur;

const CustomBtnAdd = styled(Paper)(({ theme }) => ({
  borderRadius: 20,
  // boxShadow: " 3px 3px 20px 1px #0000000F",
  boder: `1px solid ${theme.palette.grey[300]}`,
  overflow: "hidden",
  marginBlock: theme.spacing(2),
}));

const ListEmployeContent = styled(Stack)(({ theme }) => ({
  paddingBlock: theme.spacing(1),
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}));

const ContainerListEmploye = styled(Paper)(({ theme }) => ({
  paddingBlock: theme.spacing(2.5),
  paddingInline: theme.spacing(2),
  // marginBlock: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  borderRadius: 20,
  marginBottom: theme.spacing(2),
}));

const ContainerBnt = styled("div")(({ theme }) => ({}));

const FilterContent = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  paddingBlock: theme.spacing(1),
}));

const ListTitle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingBottom: theme.spacing(1),
  justifyContent: "space-between",
}));

const FilterTitle = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  paddingBottom: theme.spacing(1),
}));

const FilterContainer = styled(Paper)(({ theme }) => ({
  paddingBlock: theme.spacing(3),
  paddingInline: theme.spacing(2),
  // marginBlock: theme.spacing(2),
  // border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: 20,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
}));
