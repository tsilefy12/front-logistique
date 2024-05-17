import React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import Head from "next/head";
import BackOfficeLayout from "../layouts/backOffice";
import useBasePath from "../hooks/useBasePath";
//import ListMateriels from "../components/materiels/informatique";
import Dashboard from "../components/dashboard";
// import ListCommandeDesEmployerConnecter from "../components/materiels/mes_commandes/ListCommandesEmployeConnecter";

const Home: NextPage = () => {
  const basePath = useBasePath();
  return (
    <Dashboard />
  );
};

export default Home;
