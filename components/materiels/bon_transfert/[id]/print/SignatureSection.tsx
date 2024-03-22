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
    width: "20%",
    textAlign: "left",
    paddingLeft: 5,
    paddingVertical: 2,
    textDecoration: "underline",
    fontWeight: "bold",
    fontSize: 10,
    fontFamily: "Open Sans",
  },
  row2: {
    width: "80%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingRight: 5,
    paddingVertical: 2,
  },

  tableSignature: {
    width: "100%",
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
  row1Signature: {
    width: "33%",
    textAlign: "left",
    paddingLeft: 5,
    paddingVertical: 2,
    height: 62,
  },
  row2Signature: {
    width: "33%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
  },
  row3Signature: {
    width: "34%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
  },
});

const SignatureSection = () => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row1}>Dates et signatures :</Text>
        <View style={styles.row2}>
          <View style={styles.tableSignature}>
            <View
              style={[
                styles.rowSignature,
                styles.boldSignature,
                styles.headerSignature,
              ]}
            >
              <Text style={styles.row1Signature}>Salarié</Text>
              <Text style={styles.row2Signature}>
                Le Directeur Exécutif
              </Text>
              <Text style={styles.row3Signature}>
                Autres contrôles
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignatureSection;
