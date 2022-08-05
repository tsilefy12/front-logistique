import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../../layouts/backOffice";
import useBasePath from "../../../hooks/useBasePath";
import ListInfo from "../../../components/materiels/Informatique";

const Informatique: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Informatique</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <ListInfo />
      </Container>
    </BackOfficeLayout>
  );
};

export default Informatique;
