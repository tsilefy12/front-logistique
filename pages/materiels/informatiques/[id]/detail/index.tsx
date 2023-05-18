import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import DetailsInformatique from "../../../../../components/materiels/informatique/[id]/DetailsInformatique";

const DetailMaterielInformatique: NextPage = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <DetailsInformatique />
      </Container>
    </BackOfficeLayout>
  );
};

export default DetailMaterielInformatique;
