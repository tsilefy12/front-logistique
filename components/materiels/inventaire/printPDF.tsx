import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { CircularProgress } from "@mui/material";

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
  },
});

// Composant pour le document PDF
const InventairePDF = ({ inventaireList }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={{ fontSize: 10 }}>
        Matériel :{" "}
        {inventaireList.map((item: any) => item.equipment?.designation)}
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
            <Text style={styles.tableCell}>{item.equipment?.designation}</Text>
            <Text style={styles.tableCell}>{item.dateInventaire}</Text>
            <Text style={styles.tableCell}>{item.datePreciation}</Text>
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

// Bouton pour télécharger le PDF
const ExportPDFButton = ({ inventaireList }: any) => (
  <PDFDownloadLink
    document={<InventairePDF inventaireList={inventaireList} />}
    fileName="inventaire.pdf"
  >
    {({ blob, url, loading, error }) =>
      loading ? <CircularProgress color="primary" /> : "PDF"
    }
  </PDFDownloadLink>
);

export default ExportPDFButton;
