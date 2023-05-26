import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import FormDetentionMateriel from "../../../../../components/materiels/detenteur/ajouter/form/FormDetentionMateriel";

const Detenteur: NextPage = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <FormDetentionMateriel />
      </Container>
    </BackOfficeLayout>
  );
};

export default Detenteur;
