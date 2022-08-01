import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../../layouts/backOffice";
import useBasePath from "../../../hooks/useBasePath";
import ListCommandeDesEmployerConnecter from "../../../components/materiels/mes_commandes/ListCommandesEmployeConnecter";

const ListeDemandesMaterielsEmployerConnecter: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Materiels - Commandes</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <ListCommandeDesEmployerConnecter />
      </Container>
    </BackOfficeLayout>
  );
};

export default ListeDemandesMaterielsEmployerConnecter;
