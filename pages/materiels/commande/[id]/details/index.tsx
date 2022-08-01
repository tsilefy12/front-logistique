import React from "react";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import { Container } from "@mui/material";
import ListFormAfficherCommande from "../../../../../components/materiels/commandes/details/ListCommande";

const index = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<ListFormAfficherCommande />
			</Container>
		</BackOfficeLayout>
	);
};

export default index;
