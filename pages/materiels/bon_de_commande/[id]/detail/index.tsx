import React from "react";
// import BackOfficeLayout from "../../../../../layouts/backOffice";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import Head from "next/head";
import { Container } from "@mui/material";
import useBasePath from "../../../../../hooks/useBasePath";
import DetailsOrderForm from "../../../../../components/materiels/orderForm/[id]/DetailsOrderForm";



const DetailOrderForm = () => {
	const basePath = useBasePath();
	return (
		<BackOfficeLayout>
			<Head>
				<title>Logistiques - details - Bon de commande</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href={`${basePath}/favicon.ico`} />
			</Head>
			<Container maxWidth="xl">
                <DetailsOrderForm />
			</Container>
		</BackOfficeLayout>
	);
};

export default DetailOrderForm;
