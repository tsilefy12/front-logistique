import React from "react";
import { Stack, styled, Typography } from "@mui/material";
import KeyValue from "../../../shared/keyValue";

const CardGeneral = ({ holder }: any) => {
  return (
    <OneCard>
      <OneCardHeader>
        <Typography variant="h5" color="initial">
          Informations générale
        </Typography>
      </OneCardHeader>
      <OneCardBody spacing={2}>
        <KeyValue keyName="Reference" value={holder?.reference} />
        <KeyValue keyName="Nom" value={holder?.lastName} />
        <KeyValue keyName="Prenom" value={holder?.firstName} />
        <KeyValue keyName="N* Matricule" value={holder?.matricule} />
        <KeyValue keyName="Adress" value={holder?.function} />
      </OneCardBody>
    </OneCard>
  );
};

export default CardGeneral;

export const OneCardBody = styled(Stack)(({ theme }) => ({
  marginTop: "30px",
}));

export const OneCardHeader = styled("div")(({ theme }) => ({}));

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const OneCard = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  borderRadius: 20,
  padding: 25,
  background: "#fff",
}));
