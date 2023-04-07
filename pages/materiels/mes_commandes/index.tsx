import { Container } from "@mui/material";
import type { NextPage } from "next";
import BackOfficeLayout from "../../../layouts/backOffice";
import OrderEquipmentItemList from "../../../components/orderEquipmentItem";

const ListeDemandesMaterielsEmployerConnecter: NextPage = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <OrderEquipmentItemList />
      </Container>
    </BackOfficeLayout>
  );
};

export default ListeDemandesMaterielsEmployerConnecter;
