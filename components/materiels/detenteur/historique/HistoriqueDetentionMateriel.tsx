import * as React from "react";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Nav from "./navigation/SectionNav";
import Detail from "./detail/Detail";
import ListHistoDetention from "./table/ListHistoDetentio";

const HistoriqueDetentionMateriel = () => {
  return (
    <Container maxWidth="xl">
      <Nav />
      <Stack spacing={2}>
        <Detail />
        <ListHistoDetention />
      </Stack>
    </Container>
  );
};

export default HistoriqueDetentionMateriel;
