import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../layouts/backOffice";
import useBasePath from "../../hooks/useBasePath";
import ListFourniteur_et_Consommable from "../../components/fourniteur_et_consommable/ListArticle";

const TransportPage: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - materiel de transport</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <ListFourniteur_et_Consommable/>
      </Container>
    </BackOfficeLayout>
  );
};

export default TransportPage;