import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import Details from "../../../../../components/materiels/detenteur/[id]/details";

const Detenteur: NextPage = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <Details />
      </Container>
    </BackOfficeLayout>
  );
};

export default Detenteur;
