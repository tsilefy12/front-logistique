import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../../layouts/backOffice";
import useBasePath from "../../../hooks/useBasePath";
import FicheDeDotationList from "../../../components/materiels/fiche_dotation";

const ListFicheDotation: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Matériels -Fiche de dotation</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
          <FicheDeDotationList />
      </Container>
    </BackOfficeLayout>
  );
};

export default ListFicheDotation;