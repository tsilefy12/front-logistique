import React, { useEffect } from "react";
import { Stack, styled, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import KeyValue from "../../../shared/keyValue";
import Moment from "react-moment";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { getEmployees } from "../../../../redux/features/employeStagiaire/employeeSlice";
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";

const CardGeneral = ({ holder }: any) => {
    const router = useRouter();
    const dispatch: any = useAppDispatch();
    const { employees } = useAppSelector((state) => state.employe);
    const { interns } = useAppSelector((state) => state.stagiaire);
    const total = [...employees.map((i:any)=>{
        return {
        id : i.id, name: i.name +" "+ i.surname, type: "employe"
        }
    }),...interns.map((i:any)=>{
        return {
        id : i.id, name: i.name +" "+ i.surname, type: "intern"
        }
    })]

    useEffect(() => {
        dispatch(getEmployees({}));
        dispatch(getInterns({}));
    }, [router.query]);

    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            >
           <OneCardInfo>
                <OneCardHeader>
                    <Typography variant="h5" color="initial">
                        Informations générale
                    </Typography>
                </OneCardHeader>
                <OneCardBody spacing={2}>
                    <KeyValue keyName="Réference" value={holder?.reference} />
                    <KeyValue keyName="Nom" value={total.find((e:any)=> e.id === holder?.name)?.name} />
                    <KeyValue keyName="Contact" value={holder?.contact} />
                    <KeyValue keyName="N* Matricule" value={holder?.matricule} />
                    <KeyValue keyName="Programme" value={holder?.function} />
                </OneCardBody>
            </OneCardInfo>
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
    minWidthwidth:"800px",
    height: "100%",
    borderRadius: 20,
    padding: 25,
    background: "#fff",
}));

export const OneCardInfo = styled("div")(({ theme }) => ({
    display:"flex",
    flexDirection:"column",
    minWidth:"400px",
    height: "100%",
    borderRadius: 20,
    padding: 25,
    background: "#fff",
}));
