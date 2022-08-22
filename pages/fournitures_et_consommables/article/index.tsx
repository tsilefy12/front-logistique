import { Container } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import BackOfficeLayout from "../../../layouts/backOffice";
import useBasePath from "../../../hooks/useBasePath";
import ArticleList from "../../../components/artikel";

const ArticlePage: NextPage = () => {
  const basePath = useBasePath();
  return (
    <BackOfficeLayout>
      <Head>
        <title>Logistiques - Fournitures et consommables</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <Container maxWidth="xl">
        <ArticleList />
      </Container>
    </BackOfficeLayout>
  );
};

export default ArticlePage;
