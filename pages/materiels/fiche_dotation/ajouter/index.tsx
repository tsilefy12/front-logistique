import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../../../layouts/backOffice";
import useBasePath from "../../../../hooks/useBasePath";
import FicheDotationForm from "../../../../components/materiels/fiche_dotation/add/FichDeDotationForm";

const FicheDotationPage: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Matériels-FicheDotation-ajouter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <FicheDotationForm />
      </Container>
    </BackOfficeLayout>
  );
};

export default FicheDotationPage;
