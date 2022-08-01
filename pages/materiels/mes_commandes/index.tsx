import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListCommandeDesEmployerConnecter from "../../../components/materiels/mes_commandes/ListCommandesEmployeConnecter";

const ListeDemandesMaterielsEmployerConnecter: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<ListCommandeDesEmployerConnecter />
			</Container>
		</BackOfficeLayout>
	);
};

export default ListeDemandesMaterielsEmployerConnecter;
