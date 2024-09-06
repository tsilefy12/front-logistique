import { Download, Print } from "@mui/icons-material";
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
import { format } from "date-fns";
import { useEffect, useState } from "react";
import formatMontant from "../../../hooks/format";
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

const PrintPDF = ({ filteredCarVouchers }: any) => {
  const [year, setYear] = useState<any[]>([]);
  const uniques = new Set<any>();

  useEffect(() => {
    const des = filteredCarVouchers.map(
      (item: any) =>
        item.transportationEquipment?.registration +
        "-" +
        item.transportationEquipment?.brand
    );

    des.forEach((itemYear: any) => {
      if (!uniques.has(itemYear)) {
        uniques.add(itemYear);
      }
    });

    setYear(Array.from(uniques));
  }, [filteredCarVouchers]);

  const DocumentPDF = ({ filteredCarVouchers }: any) => (
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
            <Text>ENTRETIEN DE MATERIEL : {year}</Text>
          </View>
          <View>
            <Text></Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Matériel</Text>
            <Text style={styles.tableCell}>Date</Text>
            <Text style={styles.tableCell}>Référence</Text>
            <Text style={styles.tableCell}>Montant</Text>
          </View>
          {filteredCarVouchers.map((item: any) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.tableCell}>
                {item.transportationEquipment?.registration +
                  "-" +
                  item.transportationEquipment?.brand}
              </Text>
              <Text style={styles.tableCell}>
                {format(new Date(item.date), "dd/MM/yyyy")}
              </Text>
              <Text style={styles.tableCell}>{item.reference}</Text>
              <Text style={styles.tableCell}>
                {formatMontant(item.montantTotal || 0)}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  const clickPDF = async () => {
    const pdfBlob = await pdf(
      <DocumentPDF filteredCarVouchers={filteredCarVouchers} />
    ).toBlob();
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(pdfBlob);
    downloadLink.download = "Entretien.pdf";
    downloadLink.click();
  };
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<Download />}
      onClick={clickPDF}
    >
      PDF
    </Button>
  );
};

export default PrintPDF;
