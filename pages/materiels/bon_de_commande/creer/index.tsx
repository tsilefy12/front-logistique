import React from "react";
import BackOfficeLayout from "../../../../layouts/backOffice";
import { Container } from "@mui/material";
import CreationBonCommande from "../../../../components/materiels/bon_de_commande/creer/CreationBonCommande";

const index = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<CreationBonCommande />
			</Container>
		</BackOfficeLayout>
	);
};

export default index;
