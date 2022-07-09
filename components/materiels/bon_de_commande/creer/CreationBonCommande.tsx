import * as React from "react";
import AddFormBonCommande from "./form/AddFormBonCommande";
import ListeArticle from "./table/ListeArticle";
import Stack from "@mui/material/Stack";

const CreationBonCommande = () => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <AddFormBonCommande />
      <ListeArticle />
    </Stack>
  );
};

export default CreationBonCommande;
