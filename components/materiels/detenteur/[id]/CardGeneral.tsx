import React from "react";
import { Stack, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyValue from "../../../shared/keyValue";
import Moment from "react-moment";

const CardGeneral = ({ holder }: any) => {
    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            >
           <OneCard>
                <OneCardHeader>
                    <Typography variant="h5" color="initial">
                        Informations générale
                    </Typography>
                </OneCardHeader>
                <OneCardBody spacing={2}>
                    <KeyValue keyName="Réference" value={holder?.reference} />
                    <KeyValue keyName="Nom" value={holder?.name} />
                    <KeyValue keyName="Contact" value={holder?.contact} />
                    <KeyValue keyName="N* Matricule" value={holder?.matricule} />
                    <KeyValue keyName="Fonction" value={holder?.function} />
                </OneCardBody>
            </OneCard>
            <OneCard>
                <OneCardHeader>
                    <Typography variant="h5" color="initial">
                        Lite des matériels
                    </Typography>
                </OneCardHeader>
                <OneCardBody spacing={2}>
                    <Table sx={{ minWidth: 700 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Code</TableCell>
                                <TableCell align="left">Désignation</TableCell>
                                <TableCell align="left">Date acquisition</TableCell>
                                <TableCell align="left">Valeur acquisition</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {holder.holderEquipment?.map((item:any , index:any) => (
                                <TableRow
                                    key={index}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{item.equipment?.numOptim}</TableCell>
                                    <TableCell align="left">{item.equipment?.designation}</TableCell>
                                    <TableCell align="left"><Moment format="DD/MM/YYYY">{item.equipment?.acquisitionDate}</Moment></TableCell>
                                    <TableCell align="left">
                                        {item.equipment?.acquisitionValue}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </OneCardBody>
            </OneCard>
        </Stack>
        
    );
};

export default CardGeneral;

export const OneCardBody = styled(Stack)(({ theme }) => ({
  marginTop: "30px",
}));

export const OneCardHeader = styled("div")(({ theme }) => ({}));

export const InfoItems = styled(Stack)(({ theme }) => ({}));

export const OneCard = styled("div")(({ theme }) => ({
display:"flex",
flexDirection:"column",
  width:"100%",
  height: "100%",
  borderRadius: 20,
  padding: 25,
  background: "#fff",
}));
