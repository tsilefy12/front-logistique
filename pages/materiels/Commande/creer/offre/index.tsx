import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import useBasePath from "../../../../../hooks/useBasePath";
import ListFormCommandeOffre from "../../../../../components/materiels/commandes/ajouter/offre/ListOffre";

const CreateOffre: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Gerer Offre</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>

      <Container maxWidth="xl">
        <ListFormCommandeOffre/>
      </Container>
    </BackOfficeLayout>
  );
};

export default CreateOffre;