import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../../layouts/backOffice";
import useBasePath from "../../../hooks/useBasePath";
import LocalisationSection from "../../../components/configurations/localisation/LocalisationSection";

const ListeLocalisation: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Matériels - Type</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <LocalisationSection />
      </Container>
    </BackOfficeLayout>
  );
};

export default ListeLocalisation;
