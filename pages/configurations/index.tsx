import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../layouts/backOffice";
import useBasePath from "../../hooks/useBasePath";
import ListTransport from "../../components/materiel_de_transport/ListTransport";
import ListEtatMateriel from "../../components/configurations/etat_materiel/table/ListEtatMateriel";


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
      <ListEtatMateriel/>
      </Container>
    </BackOfficeLayout>
  );
};

export default TransportPage;