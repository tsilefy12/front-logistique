import React from "react";
import BackOfficeLayout from "../../../../../../layouts/backOffice";
import { Container } from "@mui/material";
import FormGestionArticle from "../../../../../../components/materiels/commandes/ajouter/article/FormGestionArticle";

const index = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<FormGestionArticle />
			</Container>
		</BackOfficeLayout>
	);
};

export default index;
