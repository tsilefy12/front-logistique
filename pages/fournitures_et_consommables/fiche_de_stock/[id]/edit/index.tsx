import { Container } from "@mui/material";
import React from "react";
import SuplyAndConsumableForm from "../../../../../components/supply-and-consumable/add/SupplyAndConsumableForm";
import BackOfficeLayout from "../../../../../layouts/backOffice";

const Edit = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <SuplyAndConsumableForm />
      </Container>
    </BackOfficeLayout>
  );
};

export default Edit;
