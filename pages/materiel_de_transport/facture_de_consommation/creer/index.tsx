import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
// import BackOfficeLayout from "../../layouts/backOffice";
// import useBasePath from "../../hooks/useBasePath";
import BackOfficeLayout from "../../../../layouts/backOffice";
import useBasePath from "../../../../hooks/useBasePath";
import FormFactureConsommation from "../../../../components/materiel_de_transport/facture_de_consommation/form";

const FormulaireFactureConsommation: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>
          Logistiques - Matériel et transport - Facture de consommation - Créer
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <FormFactureConsommation />
      </Container>
    </BackOfficeLayout>
  );
};

export default FormulaireFactureConsommation;
