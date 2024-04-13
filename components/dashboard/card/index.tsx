import { Card, Container, FormControl, Stack } from "@mui/material";
import { padding } from "polished";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import useFetchCarVouchers from "../../materiel_de_transport/bon_de_voiture/hooks/useFetchCarVoucher";
import { useRouter } from "next/router";

const CardDashboard = () => {
    const { carVouchers } = useAppSelector((state) => state.carVoucher);
    const fetchCarVouchers = useFetchCarVouchers();
    const router = useRouter();

    useEffect(() => {
        fetchCarVouchers();
    }, [router.query]);

    const monthsInLetters = [
        "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
        "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];
    // Initialisez un objet pour stocker les montants totaux par mois
    const totalMontantByMonth: { [key: string]: number } = {};

    // Parcourez chaque bon de voiture
    carVouchers.forEach((result) => {
        const now = new Date().getFullYear();
        const date = new Date(result.date || 0);
        const month = monthsInLetters[date.getMonth()];
        const year = new Date(result.date!).getFullYear();

        if (year === now) {
            const montantTotal = parseInt(result.montantTotal || "0");
            if (month && !isNaN(montantTotal)) {
                totalMontantByMonth[month] = (totalMontantByMonth[month] || 0) + montantTotal;
            }
        }
    });
    const list: { id: string, name: number }[] = Object.keys(totalMontantByMonth).map(month => ({
        id: month,
        name: totalMontantByMonth[month]
    }));

    console.log("resultat :", list)

    return (
        <Container style={{ marginTop: "-10px" }}>
            <Stack direction="row" justifyContent="space-around" spacing={15}>
                <Card sx={styleCardHeader1}>
                    <FormControl style={{ margin: "10px", fontSize: "1.3em", textAlign: "center" }}>
                        Montant mensuel d'entretien de voiture
                    </FormControl>
                </Card>
                <Card sx={styleCardHeader2}>
                    <FormControl style={{ margin: "10px", fontSize: "1.3em", textAlign: "center" }}>
                        Liste des articles à acheter
                        dans fiche de stock
                    </FormControl>
                </Card>
                <Card sx={styleCardHeader3}>
                    <FormControl style={{ margin: "10px", fontSize: "1.5em", textAlign: "center" }}>
                        Recharge du carbuarant
                    </FormControl>
                </Card>
            </Stack>
        </Container>
    )
}
export default CardDashboard;

const styleCardHeader1 = {
    //border: "1px solid Darkgray",
    width: 250,
    height: 100,
    overflow: "auto",
    marginTop: 5,
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)"
    // backgroundColor: "rgb(224, 224, 224)"
}
const styleCardHeader2 = {
    // border: "1px solid #98FB98",
    width: 280,
    height: 100,
    overflow: "auto",
    marginTop: 5,
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)"
    //backgroundColor: "#008000",
}
const styleCardHeader3 = {
    //border: "1px solid #98FB98",
    width: 250,
    height: 100,
    overflow: "auto",
    marginTop: 5,
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)"
    //backgroundColor: "#FFA07A"
    //color: "#000000",
}