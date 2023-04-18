import { Container } from "@mui/material";
import BackOfficeLayout from "../../../layouts/backOffice";
import LogSupplyAndConsumableList from "../../../components/supply-and-consumable/entreSortie";

const EntreSorti = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <LogSupplyAndConsumableList />
      </Container>
    </BackOfficeLayout>
  );
};

export default EntreSorti;
