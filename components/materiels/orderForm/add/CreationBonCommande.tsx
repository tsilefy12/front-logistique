import * as React from "react";
import ListeArticle from "./table/ListeArticle";
import Stack from "@mui/material/Stack";
import OrderForm from "./OrderForm";

const CreationBonCommande = () => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <OrderForm />
      <ListeArticle />
    </Stack>
  );
};

export default CreationBonCommande;
