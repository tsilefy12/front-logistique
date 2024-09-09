import React, { useEffect } from "react";
import { BorderTop, Print } from "@mui/icons-material";
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
import { BonCommandeExterneItem } from "../../../../redux/features/bon_commande_externe/bonCommandeExterne.interface";
// @ts-ignore
import { NumberToLetter } from "convertir-nombre-lettre";
import formatMontant from "../../../../hooks/format";

function PrintBCE({ pdfData }: { pdfData: any }) {
  const montant = pdfData.articleCommandeBce?.reduce(
    (acc: any, curr: any) => acc + curr.quantite * curr.pu,
    0
  );
  const montantTotal = montant ? parseInt(montant) : 0;
  const amountWords = montantTotal ? NumberToLetter(montantTotal) : "";

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
                  width: "100%",
                  fontSize: 10,
                  padding: 5,
                }}
              >
                Lot II F 14 P Bis A-Andraisora
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 10,
                  padding: 5,
                }}
              >
                BP 5181, 101 Antananarivo
              </Text>
              <Text
                style={{ textAlign: "center", width: "100%", fontSize: 10 }}
              >
                <Text style={{ padding: 5, borderBottom: "1px solid #000" }}>
                  Antananarivo : Tél: 261342515523
                </Text>
              </Text>
              <Text
                style={{ textAlign: "center", width: "100%", fontSize: 10 }}
              >
                <Text style={{ padding: 5, borderBottom: "1px solid #000" }}>
                  Moramanga: Tél: 231341570461
                </Text>
              </Text>
              <Text
                style={{ textAlign: "center", width: "100%", fontSize: 10 }}
              >
                <Text style={{ padding: 5, borderBottom: "1px solid #000" }}>
                  Diégo-suarez: Tél 261346746335
                </Text>
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 10,
                  padding: 5,
                  textDecoration: "underline",
                  color: "#219ae6",
                }}
              >
                voakajy@vokajy.mg
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 10,
                  padding: 5,
                  textDecoration: "underline",
                  color: "#219ae6",
                  fontWeight: 500,
                }}
              >
                www.madagasikara-voakajy.org
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <Text
            style={{
              textAlign: "center",
              width: "100%",
              fontSize: 14,
              fontWeight: "bold",
              color: "#ffffff",
              backgroundColor: "#76923E",
              padding: "4",
            }}
          >
            BON DE COMMANDE DU DON EXTERNE
          </Text>
        </View>
        <View style={[styles.table, { marginLeft: 20 }]}>
          <View
            style={{ width: "100%", display: "flex", flexDirection: "row" }}
          >
            <Text style={{ width: "50%", padding: 5, fontSize: 10 }}>
              Réference : {pdfData.ref}
            </Text>
            <Text style={{ width: "50%", padding: 5, fontSize: 10 }}>
              Date:{" "}
              {pdfData.dateCommande
                ? format(new Date(pdfData.dateCommande), "dd/MM/yyyy")
                : ""}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              borderTop: "none",
              flexDirection: "column",
            }}
          >
            <Text style={{ padding: 5, fontSize: 10 }}>
              Grants: {pdfData?.grant}
            </Text>
            <Text style={{ padding: 5, fontSize: 10 }}>
              Ligne budgétaire: {pdfData?.ligneBudgetaire}
            </Text>
            <Text style={{ padding: 5, fontSize: 10 }}>
              Nom du démandeur: {pdfData?.demandeur}
            </Text>
            <Text style={{ padding: 5, fontSize: 10 }}>
              Objet: {pdfData.objet}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 20 }}>
          <View style={[styles.rowBody]}>
            <Text
              style={[
                styles.th,
                { borderLeft: "none !important", width: "60% !important" },
              ]}
            >
              Fournisseur
            </Text>
            <Text style={[styles.th, { width: "50%" }]}>Désignation</Text>
            <Text style={[styles.th, { width: "50%" }]}>Caractéristique</Text>
            <Text style={styles.th}>Qté</Text>
            <Text style={styles.th}>PU</Text>
          </View>
        </View>
        {pdfData &&
          pdfData.articleCommandeBce?.map((element: any, index: any) => {
            return (
              <View key={index} style={{ width: "100%" }}>
                <View
                  style={[styles.rowBody, { borderTop: "none !important" }]}
                >
                  <Text
                    style={[
                      styles.tr,
                      {
                        borderLeft: "none !important",
                        width: "60% !important",
                      },
                    ]}
                  >
                    {element?.vendor?.name}
                  </Text>
                  <Text style={[styles.tr, { width: "50%" }]}>
                    {element?.designation}
                  </Text>
                  <Text style={[styles.tr, { width: "50%" }]}>
                    {element?.caracteristik}
                  </Text>
                  <Text style={styles.tr}>{element?.quantite}</Text>
                  <Text style={styles.tr}>
                    {element?.pu ? formatMontant(element?.pu) : ""}
                  </Text>
                </View>
              </View>
            );
          })}
        <View style={styles.table}>
          <View
            style={{ width: "100%", display: "flex", flexDirection: "column" }}
          >
            <Text
              style={{
                padding: 10,
                fontSize: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ textDecoration: "underline" }}>
                Montant en lettre:
              </Text>
              <Text>
                {amountWords ? formatMontant(amountWords) + "Ariary" : ""}
              </Text>
            </Text>
            <Text
              style={{
                padding: 10,
                fontSize: 10,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ textDecoration: "underline" }}>Béneficiaire:</Text>
              <Text>{pdfData?.beneficiaire}</Text>
            </Text>
            {/* <Text style={{padding:10,fontSize:10 ,textDecoration:"underline"}}>Pièces jointe:  </Text> */}
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              border: "1px solid #000",
              borderBottom: "none",
              display: "flex",
              flexDirection: "row",
              fontSize: "10",
            }}
          >
            <Text style={styles.headerCadre1}>Date</Text>
            <Text style={styles.headerCadre}>Demandeur</Text>
            <Text style={styles.headerCadre}>Verificateur</Text>
            <Text style={styles.headerCadre}>Validateur</Text>
            <Text style={styles.headerCadre}>Logisticien</Text>
          </View>
          <View
            style={[
              styles.rowSignature,
              styles.boldSignature,
              styles.headerSignature,
            ]}
          >
            <Text style={styles.row1Cadre}></Text>
            <Text style={styles.row2Cadre}></Text>
            <Text style={styles.row2Cadre}></Text>
            <Text style={styles.row2Cadre}></Text>
            <Text style={styles.row2Cadre}></Text>
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
  th: {
    width: "20%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 4,
    backgroundColor: "#4AADC4",
    color: "#ffffff",
    padding: 2,
    fontWeight: "bold",
    fontSize: 12,
  },
  tr: {
    width: "20%",
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
    width: "100%",
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
    backgroundColor: "#4AADC4",
    color: "#ffffff",
    paddingLeft: 5,
    paddingVertical: 2,
  },
  headerCadre: {
    width: "33%",
    backgroundColor: "#4AADC4",
    color: "#ffffff",
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
  underline: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "black",
  },
});
export default function PDFButton({ data }: { data: BonCommandeExterneItem }) {
  return (
    <PDFDownloadLink document={<PrintBCE pdfData={data} />} fileName="bce.pdf">
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
