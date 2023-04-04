import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../../../layouts/backOffice";
import DetailsSuplyAndConsumable from "../../../../../components/supply-and-consumable/[id]/DetailsSupplyAndConsumable";

const SuplyAndConsumablePage: NextPage = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <DetailsSuplyAndConsumable />
      </Container>
    </BackOfficeLayout>
  );
};

export default SuplyAndConsumablePage;
