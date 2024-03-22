import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import {
  usePDF,
  Document,
  Page,
  StyleSheet,
  View,
  Text,
  Canvas,
  Image,
  Font,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  table: {
    width: "100%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #000",
    borderTop: "none",
    fontSize: 11,
  },
  rowBody: {
    display: "flex",
    flexDirection: "row",
    fontSize: 11,
    border: "1px solid #000",
    borderTop: "none",
  },
  header: {
    border: "1px solid #000",
  },
  bold: {
    fontWeight: "normal",
  },
  row1: {
    width: "30%",
    textAlign: "left",
    paddingLeft: 5,
    paddingVertical: 2,
    textDecoration: "underline",
    fontWeight: "bold",
    fontSize: 10,
  },
  row2: {
    width: "12%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    fontSize: 7,
    paddingVertical: 2,
  },
  row3: {
    width: "12%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    fontSize: 7,
    paddingVertical: 2,
  },
  row4: {
    width: "12%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
    fontSize: 7,
  },
  row5: {
    width: "12%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
    fontSize: 7,
  },
  row6: {
    width: "11%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    fontSize: 7,
    paddingVertical: 2,
  },
  row7: {
    width: "11%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    fontSize: 7,
    paddingVertical: 2,
  },
});

const DetailSalarial = () => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row1}>Détail salarial</Text>
        <Text style={styles.row2}>Heures de travail mensuel</Text>
        <Text style={styles.row3}></Text>
        <Text style={styles.row4}>Point d’indice «Indice_2022»</Text>
        <Text style={styles.row5}>
          Valeur du point d’indice «Valeur_indice_2022»
        </Text>
        <Text style={styles.row6} wrap>
          Salaire de base «SB2022»
        </Text>
        <Text style={styles.row7} wrap>
          Monnaie «Devise»
        </Text>
      </View>
    </View>
  );
};

export default DetailSalarial;
