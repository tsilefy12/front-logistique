import React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import FormCommande from "../../../../../components/materiels/commandes/form/FormCommande";

const EditCommande: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<FormCommande />
			</Container>
		</BackOfficeLayout>
	);
};

export default EditCommande;
