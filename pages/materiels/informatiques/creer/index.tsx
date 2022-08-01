import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../../layouts/backOffice";
import AddArticleForm from "../../../../components/materiels/informatique/creer/AddArticleForm";

const FormMaterielInformatique: NextPage = () => {
	return (
		<BackOfficeLayout>
			<Container maxWidth="xl">
				<AddArticleForm />
			</Container>
		</BackOfficeLayout>
	);
};

export default FormMaterielInformatique;
