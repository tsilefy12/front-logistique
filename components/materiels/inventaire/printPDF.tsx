import React, { useEffect, useRef, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  pdf,
} from "@react-pdf/renderer";
import { Button, CircularProgress } from "@mui/material";
import { Print } from "@mui/icons-material";
import { log } from "console";
import { format } from "date-fns";

// Styles pour le PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: "flex",
    width: "auto",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 5,
    borderBottom: "1px solid #ccc",
    fontSize: 10,
    border: 1,
    borderColor: "darkgrey",
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
});
const ExportPDFButton = ({ inventaireList }: any) => {
  const [design, setDesign] = useState<string>("");
  const uniques = useRef(new Set<string>());
  useEffect(() => {
    const des = inventaireList
      .map((item: any) => item.equipment?.designation)
      .filter((d: string | undefined) => d);
    des.forEach((d: any) => {
      if (!uniques.current.has(d)) {
        uniques.current.add(d);
        setDesign(d);
      }
    });
  }, [inventaireList]);

  // Composant pour le document PDF
  const InventairePDF = ({ inventaireList }: any) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            fontSize: 12,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Image
              style={styles.logo}
              src={`/logistique/images/logo/MV_logo.png`}
            />
          </View>
          <View style={{ textAlign: "center" }}>
            <Text>Inventaire du matériel : {design}</Text>
          </View>
          <View style={{ textAlign: "center" }}>
            <Text></Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Désignation</Text>
            <Text style={styles.tableCell}>Date d'inventaire</Text>
            <Text style={styles.tableCell}>Date de péremption</Text>
            <Text style={styles.tableCell}>Durée de vie</Text>
            <Text style={styles.tableCell}>État matériel</Text>
            <Text style={styles.tableCell}>Valeur</Text>
          </View>
          {inventaireList.map((item: any) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>
                {item.equipment?.designation}
              </Text>
              <Text style={styles.tableCell}>
                {format(new Date(item.dateInventaire), "dd/MM/yyyy")}
              </Text>
              <Text style={styles.tableCell}>
                {format(new Date(item.datePreciation), "dd/MM/yyyy")}
              </Text>
              <Text style={styles.tableCell}>{item.dureDeVie}</Text>
              <Text style={styles.tableCell}>
                {item.etatMateriel === "GOOD"
                  ? "Bon état"
                  : item.etatMateriel === "BAD"
                  ? "Mauvais"
                  : "Inutilisable"}
              </Text>
              <Text style={styles.tableCell}>{item.valeurInventaire}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
  const clickPDF = async () => {
    const pdfBlob = await pdf(
      <InventairePDF inventaireList={inventaireList} />
    ).toBlob();
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "Inventaire.pdf";
    downloadLink.click();
  };
  // Bouton pour télécharger le PDF
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<Print />}
      onClick={clickPDF}
    >
      PDF
    </Button>
  );
};
export default ExportPDFButton;
