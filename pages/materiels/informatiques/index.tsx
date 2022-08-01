import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListInfo from "../../../components/materiels/informatique";

const Informatique: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<ListInfo />
			</Container>
		</BackOfficeLayout>
	);
};

export default Informatique;
