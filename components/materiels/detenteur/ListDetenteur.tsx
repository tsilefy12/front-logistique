import AddIcon from "@mui/icons-material/Add";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import Container from "@mui/material/Container";
import { debounce } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { usePermitted } from "../../../config/middleware";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import CardDetenteur from "./home/CardDetenteur";
import SearchDetenteur from "./home/Search";
import useFetchDetenteurListe from "./hooks/useFetchDetenteurListe";
import { getPrograms } from "../../../redux/features/program/programSlice";

const ListDetenteur = () => {
  const theme = useTheme();
  const [fonction, setFonction] = useState<any>("");
  const [filtre, setFiltre] = React.useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { programs } = useAppSelector((state) => state.program);

  const { holderListe } = useAppSelector((state) => state.holder);

  const validate = usePermitted();

  const fetchDetenteurList = useFetchDetenteurListe();

  React.useEffect(() => {
    fetchDetenteurList();
    dispatch(getPrograms({}));
  }, [router.query]);

  return (
    <>
      <Grid container spacing={4} paddingLeft={2} paddingRight={2}>
        <Grid item xs={12} md={3}>
          <FilterContainer>
            <FilterTitle>
              <FilterAltIcon color="disabled" fontSize="small" />
              <Typography variant="h4">Filtre</Typography>
            </FilterTitle>
            <Divider />
            <FilterContent>
              <ContainerBnt direction="column" spacing={2} alignItems="left">
                <Typography
                  variant={"body1"}
                  color={
                    fonction === "" ? theme.palette.primary.main : "initial"
                  }
                  component="span"
                  onClick={() => {
                    setFonction("");
                    setFiltre("");
                  }}
                  sx={{
                    cursor: "pointer",
                    textTransform: "none",
                  }}
                >
                  Tous les programmes
                </Typography>
                {programs.map((currentFonction) => (
                  <Typography
                    key={currentFonction.name}
                    variant="body1"
                    component="span"
                    className={`${fonction}`}
                    color={
                      currentFonction.name == fonction
                        ? theme.palette.primary.main
                        : "initial"
                    }
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setFiltre(currentFonction?.id!);
                    }}
                  >
                    {currentFonction.name}
                  </Typography>
                ))}
              </ContainerBnt>
            </FilterContent>
          </FilterContainer>
        </Grid>
        <Grid item xs={12} md={9}>
          <ContainerListEmploye>
            <SearchDetenteur filtre={filtre} setFiltre={setFiltre} />
            <Divider />
            <ListEmployeContent>
              <CustomBtnAdd>
                {validate("Logistiques FDM", "C") && (
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
                )}
              </CustomBtnAdd>
              {holderListe
                // .sort((a, b) => (b.id!).localeCompare(a.id!))
                .filter((item) =>
                  `${item.matricule} ${item.function} ${item.contact} ${item.name} ${item.id}`
                    .toLowerCase()
                    .includes(filtre.toLowerCase())
                )
                .map((holder, index) => (
                  <Fragment key={index}>
                    <CardDetenteur holder={holder} />
                  </Fragment>
                ))}
            </ListEmployeContent>
          </ContainerListEmploye>
        </Grid>
      </Grid>
    </>
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

const ContainerBnt = styled(Stack)(({ theme }) => ({}));

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
interface CurrentFonction {
  id: string;
  name: string;
}
