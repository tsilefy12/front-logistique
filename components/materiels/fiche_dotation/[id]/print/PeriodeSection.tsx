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
import Moment from "react-moment";

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
    width: "70%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
  },
});

const PeriodeSection = (props: any) => {
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row1}>Période concernée :</Text>
        <Text style={styles.row2}>
          {monthNames[props?.paySlip?.month]}
        </Text>
      </View>
    </View>
  );
};

export default PeriodeSection;
