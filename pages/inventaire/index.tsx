import { Container } from "@mui/material";
import BackOfficeLayout from "../../layouts/backOffice";
import InventaireList from "../../components/inventaire";

const Inventaire = () => {
  return (
    <BackOfficeLayout>
      <Container maxWidth="xl">
        <InventaireList />
      </Container>
    </BackOfficeLayout>
  );
};

export default Inventaire;