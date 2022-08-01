import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../../layouts/backOffice";
import FormCommande from "../../../../components/materiels/commandes/form/FormCommande";

const CreateCommande: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<FormCommande />
			</Container>
		</BackOfficeLayout>
	);
};

export default CreateCommande;
