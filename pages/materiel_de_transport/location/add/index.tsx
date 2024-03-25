import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import useBasePath from "../../../../hooks/useBasePath";
import BackOfficeLayout from "../../../../layouts/backOffice";
import FormLocation from "../../../../components/materiel_de_transport/location/add/formLocation";


const FormLT: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Location de transport</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <FormLocation/>
      </Container>
    </BackOfficeLayout>
  );
};

export default FormLT;