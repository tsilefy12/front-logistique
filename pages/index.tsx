import React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Head from "next/head";
import BackOfficeLayout from "../layouts/backOffice";
import useBasePath from "../hooks/useBasePath";
import ListCommandeDesEmployerConnecter from "../components/materiels/mes_commandes/ListCommandesEmployeConnecter";

const Home: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>MV - RH - Accueil</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <ListCommandeDesEmployerConnecter />
      </Container>
    </BackOfficeLayout>
  );
};

export default Home;
