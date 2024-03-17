import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../../layouts/backOffice";
import useBasePath from "../../../hooks/useBasePath";
import BonTransfertList from "../../../components/fournitures_et_consommables/bon_transfert";

const ListBonTransfertConsommable: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Fourniture et Consommable -Bon de transfert</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
          <BonTransfertList />
      </Container>
    </BackOfficeLayout>
  );
};

export default ListBonTransfertConsommable;