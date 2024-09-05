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
import { ficheDotationItem } from "../../../../redux/features/fiche_dotation/ficheDotation.interface";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function PrintFicheDotation({ pdfData }: { pdfData: any }) {
  const img = pdfData.pieceJointe
    ? process.env.NEXT_PUBLIC_API_URL + pdfData.pieceJointe
    : null;
  const [personne, setPersone] = useState<any[]>([]);
  useEffect(() => {
    const data = pdfData.personneConcerne?.filter(
      (f: any) => f.ficheDotationId == pdfData.id
    );
    setPersone(data);
  }, [pdfData]);
  return (
    <Document>
      <Page style={{ padding: 15 }} orientation="landscape">
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
                style={{ textAlign: "center", width: "100%", fontSize: 10 }}
              >
                ASSOCIATION MADAGASIKARA VOAKAY
              </Text>
              <Text
                style={{ textAlign: "center", width: "100%", fontSize: 10 }}
              >
                Lot II F 72 H Bis A Andraisora
              </Text>
              <Text
                style={{ textAlign: "center", width: "100%", fontSize: 10 }}
              >
                BP 5181, 101 Antananarivo
              </Text>
              <Text
                style={{ textAlign: "center", width: "100%", fontSize: 10 }}
              >
                +261 34 25 155 23
              </Text>
              <Text
                style={{ textAlign: "center", width: "100%", fontSize: 10 }}
              >
                voakajy@vokajy.mg
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 12,
                  marginTop: 10,
                  color: "#ffffff",
                  backgroundColor: "#76923E",
                  padding: "4",
                  fontWeight: "bold",
                }}
              >
                FICHE DE DOTATION
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
            <Text style={{ width: "40%", padding: 2, fontSize: 10 }}>
              Date :{"  "}{" "}
              {pdfData.date ? format(new Date(pdfData.date), "dd/MM/yyyy") : ""}
            </Text>
            <Text
              style={{
                width: "40%",
                padding: 2,
                fontSize: 10,
                borderLeft: "1px solid #000",
              }}
            >
              Région :{"  "} {pdfData.region}
            </Text>
            <Text
              style={{
                width: "40%",
                padding: 2,
                fontSize: 10,
                borderLeft: "1px solid #000",
              }}
            >
              District :{"  "} {pdfData.district}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              display: "flex",
              border: "1px solid #000",
              borderTop: "none",
              flexDirection: "row",
            }}
          >
            <Text style={{ width: "50%", padding: 2, fontSize: 10 }}>
              Commune : {"  "} {pdfData.commune}
            </Text>
            <Text
              style={{
                width: "50%",
                padding: 2,
                fontSize: 10,
                borderLeft: "1px solid #000",
              }}
            >
              Fokontany : {"  "} {pdfData.fokontany}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              border: "1px solid #000",
              borderTop: "none",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text style={{ width: "50%", padding: 2, fontSize: 10 }}>
              Grant : {"  "} {pdfData.grant}
            </Text>
            <Text
              style={{
                width: "50%",
                padding: 2,
                fontSize: 10,
                borderLeft: "1px solid #000",
              }}
            >
              Ligne budgétaire :{"  "} {pdfData.ligneBudgetaire}
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 20 }}>
          <View style={[styles.rowBody]}>
            <Text style={[styles.th, { borderLeft: "none !important" }]}>
              Nom et Prénom
            </Text>
            <Text style={styles.th}>CIN</Text>
            <Text style={styles.th}>Fonction</Text>
            <Text style={[styles.th, { width: "80%" }]}>Désignation</Text>
            <Text style={styles.th}>Signature</Text>
          </View>
        </View>
        {personne ? (
          personne.map((element: any, index: any) => {
            return (
              <>
                <View style={{ width: "100%" }}>
                  <View
                    style={[styles.rowBody, { borderTop: "none !important" }]}
                  >
                    <Text
                      style={[styles.tr, { borderLeft: "none !important" }]}
                    >
                      {element.nomPrenom}
                    </Text>
                    <Text style={styles.tr}>{element.cin}</Text>
                    <Text style={styles.tr}>{element.fonction}</Text>
                    <Text style={[styles.tr, { width: "80%" }]}>
                      {element.designation}
                    </Text>
                    <Text style={styles.tr}></Text>
                  </View>
                </View>
                <View style={{ width: "100%" }}>
                  <View
                    style={[styles.rowBody, { borderTop: "none !important" }]}
                  >
                    <Text
                      style={[styles.tr, { borderLeft: "none !important" }]}
                    ></Text>
                    <Text style={styles.tr}></Text>
                    <Text style={styles.tr}></Text>
                    <Text style={[styles.tr, { width: "80%" }]}></Text>
                    <Text style={styles.tr}></Text>
                  </View>
                </View>
              </>
            );
          })
        ) : (
          <>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <View style={[styles.rowBody, { borderTop: "none !important" }]}>
                <Text
                  style={[styles.tr, { borderLeft: "none !important" }]}
                ></Text>
                <Text style={styles.tr}></Text>
                <Text style={styles.tr}></Text>
                <Text style={[styles.tr, { width: "80%" }]}></Text>
                <Text style={styles.tr}></Text>
              </View>
            </View>
          </>
        )}
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
    width: "50%",
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
    width: "50%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    borderTop: "none",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 2,
    height: 40,
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
});
export default function PDFButton({ data }: { data: ficheDotationItem }) {
  return (
    <PDFDownloadLink
      document={<PrintFicheDotation pdfData={data} />}
      fileName="fiche_dotation.pdf"
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
