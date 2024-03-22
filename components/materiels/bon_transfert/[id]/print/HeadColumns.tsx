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
    width: "10%",
    textAlign: "center",
    paddingTop: 2,
    paddingBottom: 2,
  },
  row2: {
    width: "30%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
  },
  row3: {
    width: "40%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
  },
  row4: {
    width: "10%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
  },
  row5: {
    width: "10%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
  },
});

const HeadColumns = () => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row1}>N°</Text>
        <Text style={styles.row2}>Procédure</Text>
        <Text style={styles.row3}>Documents exploités</Text>
        <Text style={styles.row4}>Sigle</Text>
        <Text style={styles.row5}>Page</Text>
      </View>
      <View style={[styles.rowBody]}>
        <Text style={styles.row1}>RH05</Text>
        <Text style={styles.row2}>Rémunération du personnel</Text>
        <Text style={styles.row3}>
          RH05-05. Bulletin individuel de paie
        </Text>
        <Text style={styles.row4}>BIP</Text>
        <Text style={styles.row5}>39</Text>
      </View>
    </View>
  );
};

export default HeadColumns;
