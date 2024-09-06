import { Print } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  Document,
  Image,
  Page,
  pdf,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
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

const PrintPDF = ({ suplyAndConsumableList }: any) => {
  const [year, setYear] = useState<any[]>([]);
  const uniques = new Set<any>();

  useEffect(() => {
    const des = suplyAndConsumableList.map((item: any) => item.annee);

    des.forEach((itemYear: any) => {
      if (!uniques.has(itemYear)) {
        uniques.add(itemYear);
      }
    });

    setYear(Array.from(uniques));
  }, [suplyAndConsumableList]);

  const DocumentPDF = ({ suplyAndConsumableList }: any) => (
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
          <View>
            <Text>Fournitures et consommable du : {year}</Text>
          </View>
          <View>
            <Text></Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Désignation</Text>
            <Text style={styles.tableCell}>Reste</Text>
            <Text style={styles.tableCell}>Unité de stock</Text>
            <Text style={styles.tableCell}>Seuil</Text>
          </View>
          {suplyAndConsumableList.map((item: any) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.designation}</Text>
              <Text style={styles.tableCell}>{item.reste}</Text>
              <Text style={styles.tableCell}>
                {item.uniteStock?.uniteStock}
              </Text>
              <Text style={styles.tableCell}>{item.seuil}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const clickPDF = async () => {
    const pdfBlob = await pdf(
      <DocumentPDF suplyAndConsumableList={suplyAndConsumableList} />
    ).toBlob();
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "Fournitures-et-consommables.pdf";
    downloadLink.click();
  };
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

export default PrintPDF;
