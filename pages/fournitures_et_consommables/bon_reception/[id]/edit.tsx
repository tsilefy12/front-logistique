import { Container } from "@mui/material";
import Head from "next/head";
import React from "react";
import Index from "../../../../components/Order-Supply-And-Consumable/[id]/edit/Index";
import useBasePath from "../../../../hooks/useBasePath";
import BackOfficeLayout from "../../../../layouts/backOffice";
const Edit = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Modifier</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <Index></Index>
      </Container>
    </BackOfficeLayout>
  );
};

export default Edit;

