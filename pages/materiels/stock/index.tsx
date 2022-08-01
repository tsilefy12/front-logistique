import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../layouts/backOffice";
import ListStock from "../../../components/materiels/stock/ListStock";

const Stock: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<ListStock />
			</Container>
		</BackOfficeLayout>
	);
};

export default Stock;
