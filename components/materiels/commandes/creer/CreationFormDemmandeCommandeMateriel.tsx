import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import FormDemmandeCommandeMateriel from "./form/FormDemmandeCommandeMateriel";
import ListArticleCommander from "./table/ListArticleCommander";

const CreationFormDemmandeCommandeMateriel = () => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <FormDemmandeCommandeMateriel />
      <ListArticleCommander />
    </Stack>
  );
};

export default CreationFormDemmandeCommandeMateriel;
