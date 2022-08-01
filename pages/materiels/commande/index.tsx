import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListCommande from "../../../components/materiels/commandes/ListCommande";

const ListeCommandes: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<ListCommande />
			</Container>
		</BackOfficeLayout>
	);
};

export default ListeCommandes;
