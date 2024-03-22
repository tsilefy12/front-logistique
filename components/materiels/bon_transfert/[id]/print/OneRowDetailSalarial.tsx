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

const OneRowDetailSalarial = ({
  col1,
  col2,
  col3,
  col4,
  col5,
  isTitle1,
  isTitle2,
  isTitle3,
  isTitle4,
  isTitle5,
}: any) => {
  const styles = StyleSheet.create({
    table: {
      width: "100%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      border: "1px solid #000",
      borderTop: "none",
      fontSize: 9,
      backgroundColor: "#D5D8DC",
    },
    rowBody: {
      display: "flex",
      flexDirection: "row",
      fontSize: 9,
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
      fontSize: 9,
      fontFamily: "Open Sans",
    },
    row11: {
      width: "8%",
      textAlign: "center",
      paddingTop: 2,
      paddingBottom: 2,

      fontWeight: isTitle1 ? "bold" : "normal",
      fontSize: isTitle1 ? 10 : 9,
      fontFamily: "Open Sans",
      backgroundColor: isTitle1 ? "#D5D8DC" : "#fff",
    },
    row12: {
      width: "23%",
      textAlign: "center",
      borderLeft: "1px solid #000",
      paddingTop: 2,
      paddingBottom: 2,

      fontWeight: isTitle2 ? "bold" : "normal",
      fontSize: isTitle2 ? 10 : 9,
      fontFamily: "Open Sans",
      backgroundColor: isTitle2 ? "#D5D8DC" : "#fff",
    },
    row13: {
      width: "23%",
      textAlign: "center",
      borderLeft: "1px solid #000",
      paddingTop: 2,
      paddingBottom: 2,

      fontWeight: isTitle3 ? "bold" : "normal",
      fontSize: isTitle3 ? 10 : 9,
      fontFamily: "Open Sans",
      backgroundColor: isTitle3 ? "#D5D8DC" : "#fff",
    },
    row14: {
      width: "23%",
      textAlign: "center",
      borderLeft: "1px solid #000",
      paddingTop: 2,
      paddingBottom: 2,

      fontWeight: isTitle4 ? "bold" : "normal",
      fontSize: isTitle4 ? 10 : 9,
      fontFamily: "Open Sans",
      backgroundColor: isTitle4 ? "#D5D8DC" : "#fff",
    },
    row15: {
      width: "23%",
      textAlign: "center",
      borderLeft: "1px solid #000",
      paddingTop: 2,
      paddingBottom: 2,

      fontWeight: isTitle5 ? "bold" : "normal",
      fontSize: isTitle5 ? 10 : 9,
      fontFamily: "Open Sans",
      backgroundColor: isTitle5 ? "#D5D8DC" : "#fff",
    },
  });
  return (
    <View style={styles.table}>
      <View style={[styles.rowBody]}>
        <Text style={styles.row11}>{col1}</Text>
        <Text style={styles.row12}>{col2}</Text>
        <Text style={styles.row13}>{col3}</Text>
        <Text style={styles.row14}>{col4}</Text>
        <Text style={styles.row15}>{col5}</Text>
      </View>
    </View>
  );
};

export default OneRowDetailSalarial;
