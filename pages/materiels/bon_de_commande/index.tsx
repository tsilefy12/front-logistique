import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListBc from "../../../components/materiels/bon_de_commande";

const Bon_de_Commande: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<ListBc />
			</Container>
		</BackOfficeLayout>
	);
};

export default Bon_de_Commande;
