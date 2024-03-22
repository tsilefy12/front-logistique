import React from "react";
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
    backgroundColor: "#D5D8DC",
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
    width: "100%",
    textAlign: "center",
    paddingTop: 2,
    paddingBottom: 2,
    textDecoration: "underline",
    fontWeight: "bold",
    fontSize: 10,
    fontFamily: "Open Sans",
  },
  row11: {
    width: "8%",
    textAlign: "center",
    paddingTop: 2,
    paddingBottom: 2,
    textDecoration: "underline",
    fontWeight: "bold",
    fontSize: 10,
    fontFamily: "Open Sans",
  },
  row12: {
    width: "23%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
    textDecoration: "underline",
    fontWeight: "bold",
    fontSize: 10,
    fontFamily: "Open Sans",
  },
  row13: {
    width: "23%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
    textDecoration: "underline",
    fontWeight: "bold",
    fontSize: 10,
    fontFamily: "Open Sans",
  },
  row14: {
    width: "23%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
    textDecoration: "underline",
    fontWeight: "bold",
    fontSize: 10,
    fontFamily: "Open Sans",
  },
  row15: {
    width: "23%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
    textDecoration: "underline",
    fontWeight: "bold",
    fontSize: 10,
    fontFamily: "Open Sans",
  },
});

const HeadDetailSalarial = () => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row1}>Détail salarial</Text>
      </View>
      <View style={[styles.rowBody]}>
        <Text style={styles.row11}>N°</Text>
        <Text style={styles.row12}>Rubrique</Text>
        <Text style={styles.row13}>Base de calcul</Text>
        <Text style={styles.row14}>Montant</Text>
        <Text style={styles.row15}>Observation</Text>
      </View>
    </View>
  );
};

export default HeadDetailSalarial;
