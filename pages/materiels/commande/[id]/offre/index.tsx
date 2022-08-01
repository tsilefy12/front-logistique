import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import ListFormCommandeOffre from "../../../../../components/materiels/commandes/ajouter/offre/ListOffre";

const CreateOffre: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<ListFormCommandeOffre />
			</Container>
		</BackOfficeLayout>
	);
};

export default CreateOffre;
