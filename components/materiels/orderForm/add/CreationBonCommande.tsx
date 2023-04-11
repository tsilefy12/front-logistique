import * as React from "react";
import Stack from "@mui/material/Stack";
import OrderForm from "./OrderForm";
import ListArticle from "./table/article";

const CreationBonCommande = () => {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <OrderForm />
      <ListArticle />
    </Stack>
  );
};

export default CreationBonCommande;
