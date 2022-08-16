import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../../layouts/backOffice";
import useBasePath from "../../../hooks/useBasePath";
import ListDetenteur from "../../../components/materiels/detenteur/ListDetenteur";

const Detenteur: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Detention</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <ListDetenteur />
      </Container>
    </BackOfficeLayout>
  );
};

export default Detenteur;
