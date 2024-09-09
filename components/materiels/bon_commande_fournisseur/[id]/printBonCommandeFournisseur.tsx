import React, { useEffect } from "react";
import { Print } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import {
  Document,
  Image,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { format } from "date-fns";
import { CommandeFournisseurItem } from "../../../../redux/features/bon_commande_fournisseur/bonCommandeFournisseur.interface";
import formatMontant from "../../../../hooks/format";
// @ts-ignore
import { NumberToLetter } from "convertir-nombre-lettre";

function PrintBonCommandeFournisseur({ pdfData }: { pdfData: any }) {
  const montantTotal = pdfData.articleFournisseur?.reduce(
    (acc: any, curr: any) => acc + curr.montant,
    0
  );
  const amountWords = montantTotal ? NumberToLetter(montantTotal) : "";
  console.log(NumberToLetter(4194945));
  return (
    <Document>
      <Page style={{ padding: 15 }} orientation="portrait">
        <View style={styles.table}>
          <View style={[styles.row, styles.bold]}>
            <Text style={styles.row1}>
              <Image
                style={styles.logo}
                src={`/logistique/images/logo/MV_logo.png`}
              />
            </Text>
            <View style={styles.row2}>
              <Text
                style={{
                  textAlign: "center",
                  alignItems: "center",
                  width: "100%",
                  fontSize: 14,
                  color: "#ffffff",
                  fontWeight: 900,
                  backgroundColor: "#76923E",
                  padding: "4",
                }}
              >
                BON DE COMMANDE
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View
            style={{
              width: "100%",
              border: "1px solid #000",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <View
              style={{ width: "50%", display: "flex", flexDirection: "column" }}
            >
              <Text style={{ padding: 2, fontSize: 10, fontWeight: "bold" }}>
                Association Madagascar Voakajy
              </Text>
              <Text style={{ padding: 2, fontSize: 10, fontWeight: "bold" }}>
                LOT IIF14P Bis A Andraisoro
              </Text>
              <Text style={{ padding: 2, fontSize: 10 }}>
                BP 5181,101 Antananrivo
              </Text>
              <Text style={{ padding: 2, fontSize: 10 }}>
                Contact: +261 34 25 155 23
              </Text>
            </View>
            <View
              style={{
                width: "50%",
                borderLeft: "1px solid #000",
                textAlign: "center",
                alignItems: "center",
                display: "flex",
                borderTop: "none",
                flexDirection: "column",
                padding: 4,
              }}
            >
              <Text style={{ padding: 2, fontSize: 12 }}>
                {pdfData?.fournisseur}
              </Text>
              <Text style={{ padding: 2, fontSize: 12 }}>
                Nif :{pdfData?.vendor?.nif}
              </Text>
              <Text style={{ padding: 2, fontSize: 12 }}>
                Stat: {pdfData?.vendor?.website}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 10 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={{ width: "30%", fontSize: 10, padding: 4, height: 20 }}
            >
              Etabli le:{" "}
              {pdfData.establishmentDate
                ? format(new Date(pdfData.establishmentDate), "dd/MM/yyyy")
                : ""}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 20 }}>
          <View style={[styles.rowBody]}>
            <Text style={[styles.th1, { borderLeft: "none !important" }]}>
              Designation
            </Text>
            <Text style={styles.th1}>Details</Text>
            <Text style={styles.th}>Prix unitaire</Text>
            <Text style={styles.th2}>Qté</Text>
            <Text style={styles.th}>Montant</Text>
          </View>
        </View>
        {pdfData &&
          pdfData.articleFournisseur?.map((element: any, index: any) => {
            return (
              <View key={index} style={{ width: "100%" }}>
                <View
                  style={[styles.rowBody, { borderTop: "none !important" }]}
                >
                  <Text style={[styles.tr1, { borderLeft: "none !important" }]}>
                    {element?.designation}
                  </Text>
                  <Text style={styles.tr1}>{element?.details}</Text>
                  <Text style={styles.tr}>
                    {formatMontant(element?.unitPrice)}
                  </Text>
                  <Text style={styles.tr2}>{element?.quantite}</Text>
                  <Text style={styles.tr}>
                    {formatMontant(element?.montant)}
                  </Text>
                </View>
              </View>
            );
          })}
        <View style={{ width: "100%", marginTop: 20 }}>
          <View style={[styles.rowBody, { border: "none !important" }]}>
            <Text style={{ width: "50%" }}></Text>
            <Text style={[styles.tr, { border: "1px solid #000" }]}>TOTAL</Text>
            <Text
              style={[
                styles.tr,
                { border: "1px solid #000", borderLeft: "none !important" },
              ]}
            >
              TTC
            </Text>
            <Text
              style={[
                styles.tr1,
                {
                  border: "1px solid #000",
                  borderLeft: "none !important",
                  textAlign: "right",
                },
              ]}
            >
              {formatMontant(montantTotal)} Ar
            </Text>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View style={[styles.rowBody]}>
            <Text style={{ fontSize: 12, padding: 2 }}>Soit :</Text>
            <Text style={{ fontSize: 12, padding: 2 }}>
              {amountWords} Ariary
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 20 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ width: "50%", fontSize: 10, padding: 4 }}>
              Modalité de paiement : {pdfData?.paymentMethod}
            </Text>
            <Text
              style={{
                width: "30%",
                border: "1px solid #000",
                fontSize: 10,
                padding: 4,
                textAlign: "center",
              }}
            >
              {pdfData?.fournisseur}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={{ width: "23%", fontSize: 10, padding: 4 }}>
              Condition de livraison{" "}
            </Text>
            <Text style={{ width: "30%", fontSize: 10, padding: 4 }}>
              {pdfData?.deliveryCondition}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View style={[styles.rowBody]}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text
                style={{ width: "23%", fontSize: 10, padding: 4, height: 30 }}
              >
                Date de livraison{" "}
              </Text>
              <Text
                style={{
                  width: "30%",
                  fontSize: 10,
                  padding: 4,
                  height: 30,
                  borderLeft: "1px solid #000",
                }}
              >
                {pdfData.deliveryDate
                  ? format(new Date(pdfData.deliveryDate), "dd/MM/yyyy")
                  : ""}
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  table: {
    width: "100%",
    marginTop: 15,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    fontSize: 11,
  },
  footer: {
    width: "50%",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  rowBody: {
    display: "flex",
    flexDirection: "row",
    fontSize: 11,
    border: "1px solid #000",
  },
  th1: {
    width: "50%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 2,
    backgroundColor: "#4AADC4",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 10,
  },
  th: {
    width: "23%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 4,
    padding: 2,
    backgroundColor: "#4AADC4",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 12,
  },
  th2: {
    width: "15%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    backgroundColor: "#4AADC4",
    color: "#ffffff",
    paddingTop: 4,
    padding: 2,
    fontWeight: "bold",
    fontSize: 12,
  },
  tr1: {
    width: "50%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    borderTop: "none",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 2,
  },
  tr2: {
    width: "15%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    borderTop: "none",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 2,
  },
  tr: {
    width: "23%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    borderTop: "none",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 2,
  },
  header: {
    border: "1px solid #000",
  },
  bold: {
    fontWeight: "normal",
  },
  row1: {
    width: "30%",
    textAlign: "center",
    paddingTop: 2,
    paddingBottom: 2,
  },
  row2: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    fontSize: 20,
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 70,
  },
  rowSignature: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #000",
    fontSize: 11,
  },
  headerSignature: {
    border: "1px solid #000",
  },
  boldSignature: {
    fontWeight: "normal",
  },
  headerCadre1: {
    width: "33%",
    textAlign: "left",
    paddingLeft: 5,
    paddingVertical: 2,
  },
  headerCadre: {
    width: "33%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
  },
  row1Cadre: {
    width: "33%",
    textAlign: "left",
    paddingLeft: 5,
    paddingVertical: 2,
    height: 62,
  },
  row2Cadre: {
    width: "33%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
    height: 62,
  },
});
export default function PDFButton({ data }: { data: CommandeFournisseurItem }) {
  return (
    <PDFDownloadLink
      document={<PrintBonCommandeFournisseur pdfData={data} />}
      fileName="bon_commande_fournisseur.pdf"
    >
      {({ blob, url, loading, error }) =>
        loading ? (
          <CircularProgress size={25} color="primary" />
        ) : (
          <Button
            variant="contained"
            color="info"
            size="small"
            startIcon={<Print />}
            sx={{ marginInline: 3 }}
          ></Button>
        )
      }
    </PDFDownloadLink>
  );
}
