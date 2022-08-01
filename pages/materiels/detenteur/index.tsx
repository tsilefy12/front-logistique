import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListDetenteur from "../../../components/materiels/detenteur/ListDetenteur";

const Detenteur: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<ListDetenteur />
			</Container>
		</BackOfficeLayout>
	);
};

export default Detenteur;
