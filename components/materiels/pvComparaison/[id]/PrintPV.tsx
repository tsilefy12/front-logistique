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
import { PvComparaisonItem } from "../../../../redux/features/pvComparaison/pvComparaison.interface";
import formatMontant from "../../../../hooks/format";
import { InfoItems } from "../../bon_commande_externe/[id]/DetailsBCE";

function PrintPVComparaison({ pdfData }: { pdfData: any }) {
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
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 12,
                  backgroundColor: "#CC9933",
                  padding: 4,
                  fontWeight: "bold",
                }}
              >
                TABLEAU DE COMPARAISON D'OFFRE
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 10,
                  padding: 4,
                }}
              >
                Objet : {pdfData.objet}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 10,
                  padding: 4,
                }}
              >
                Réference BCI / BCE : {pdfData.bci}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 10,
                  padding: 4,
                }}
              >
                Grants : {pdfData.grant}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 10,
                  padding: 4,
                }}
              >
                Ligne budgétaire {pdfData.ligneBudgetaire}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 20 }}>
          <View style={[styles.rowBody]}>
            <Text style={styles.th}>Fournisseur</Text>
            {pdfData.tableComparaison?.map((item: any, index: any) => {
              return (
                <Text
                  key={index}
                  style={[styles.th, { backgroundColor: "#a3e0ad" }]}
                >
                  {item.vendor?.name}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View style={[styles.rowBody]}>
            <Text style={styles.th}>OFFRES</Text>
            {pdfData.tableComparaison?.map((item: any, index: any) => {
              return (
                <Text
                  key={index}
                  style={[styles.th, { backgroundColor: "#a3e0ad" }]}
                >
                  Offre n°{index + 1}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View
            style={[
              styles.rowSignature,
              styles.boldSignature,
              styles.headerSignature,
            ]}
          >
            <Text style={styles.row1Cadre}>DESIGNATION</Text>
            {(() => {
              return pdfData.tableComparaison?.map((item: any, index: any) => (
                <Text key={index} style={styles.row2Cadre}>
                  {Array.isArray(item.designation) &&
                  item.designation.length > 0 ? (
                    item.designation.map((line: any, index: any) => (
                      <Text key={index}>
                        {line}
                        {"\n"}
                      </Text>
                    ))
                  ) : (
                    <Text>Aucune donnée</Text>
                  )}
                </Text>
              ));
            })()}
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View style={[styles.rowBody]}>
            <Text style={styles.tr}>Montant total</Text>
            {pdfData.tableComparaison?.map((item: any, index: any) => {
              return (
                <Text key={index} style={styles.tr}>
                  {item.amount ? formatMontant(item.amount) : ""}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={{ width: "100%" }}>
          <View style={[styles.rowBody]}>
            <Text style={styles.tr}>Modalité de paiment</Text>
            {pdfData.tableComparaison?.map((item: any, index: any) => {
              return (
                <Text key={index} style={styles.tr}>
                  {item.modePaie}
                </Text>
              );
            })}
          </View>
        </View>
        <View style={{ width: "100%", marginTop: 15 }}>
          <View style={[styles.rowBody, { backgroundColor: "#a3e0ad" }]}>
            <Text style={styles.tr}>N° OFRES ET FOURNISSEURS RETENU</Text>
            <Text style={{ textAlign: "center" }}>
              offre n° {pdfData.offre?.index}
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={[styles.rowBody]}>
            <View
              style={{
                width: "100%",
                display: "flex",
                borderTop: "none",
                flexDirection: "column",
              }}
            >
              <Text style={{ padding: 4, fontSize: 10 }}>
                JUSTIFICATION DE CHOIX : si le choix ne correspond pas aux
                critère requis
              </Text>
              <Text style={{ padding: 4, fontSize: 10 }}>
                Fournir un argumentaires
              </Text>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Image
                  style={styles.checkbox}
                  src={
                    pdfData.offre?.motif &&
                    pdfData.offre?.motif.includes("moins_distant")
                      ? "/logistique/images/checkbox.png"
                      : "/logistique/images/empty-checkbox.png"
                  }
                />
                <Text style={{ padding: 4, fontSize: 10 }}>Moins distant</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: 2,
                  marginBottom: 2,
                }}
              >
                <Image
                  style={styles.checkbox}
                  src={
                    pdfData.offre?.motif &&
                    pdfData.offre?.motif.includes("conforme_aux_besoins")
                      ? "/logistique/images/checkbox.png"
                      : "/path/to/empty-checkbox.png"
                  }
                />
                <Text style={{ padding: 4, fontSize: 10 }}>
                  conforme au besoin
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderLeft: "1px solid #000",
              }}
            >
              <Text style={{ padding: 4, fontSize: 10 }}>ARGUMENTAIRES</Text>
              <Text style={{ padding: 4, fontSize: 10 }}>
                {pdfData.offre?.argument}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #000",
                width: "33%",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 10,
                  padding: 10,
                }}
              >
                Validé(e) par:
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  width: "100%",
                  fontSize: 10,
                  padding: 10,
                  height: 100,
                }}
              >
                Signature
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
  th: {
    width: "50%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 4,
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
  checkbox: {
    width: 15,
    height: 15,
    marginLeft: 4,
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
    paddingLeft: 5,
    paddingVertical: 2,
  },
  row1Cadre: {
    width: "50%",
    textAlign: "center",
    alignItems: "center",
    paddingLeft: 5,
    paddingVertical: 2,
    height: 62,
  },
  row2Cadre: {
    width: "50%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
    height: 62,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
});
export default function PDFButton({ data }: { data: PvComparaisonItem }) {
  return (
    <PDFDownloadLink
      document={<PrintPVComparaison pdfData={data} />}
      fileName="PV_Comparaison.pdf"
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
