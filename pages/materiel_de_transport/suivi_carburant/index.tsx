import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../../layouts/backOffice";
import useBasePath from "../../../hooks/useBasePath";
import ListSuiviCarburant from "../../../components/materiel_de_transport/suivi_carburant/ListSuivi_carburant";
const SuiviCarburantPage: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Suivi carburant</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <ListSuiviCarburant/>
      </Container>
    </BackOfficeLayout>
  );
};

export default SuiviCarburantPage;