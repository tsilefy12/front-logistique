import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../../layouts/backOffice";
import ListFormDetationMateriel from "../../../../components/materiels/detenteur/ajouter/ListFormDetationMateriel";

const Detenteur: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<ListFormDetationMateriel />
			</Container>
		</BackOfficeLayout>
	);
};

export default Detenteur;
