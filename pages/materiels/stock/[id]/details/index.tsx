import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import ListDetailStockParType from "../../../../../components/materiels/stock/details/ListDetailStockParType";

const DetailStockParType: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<ListDetailStockParType />
			</Container>
		</BackOfficeLayout>
	);
};

export default DetailStockParType;
