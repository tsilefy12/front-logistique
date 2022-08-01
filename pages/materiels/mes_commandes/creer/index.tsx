import React from "react";
import BackOfficeLayout from "../../../../layouts/backOffice";
import { Container } from "@mui/material";
import FormDemandeMateriel from "../../../../components/materiels/mes_commandes/creer/FormDemandeMateriel";

const index = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<FormDemandeMateriel />
			</Container>
		</BackOfficeLayout>
	);
};

export default index;
