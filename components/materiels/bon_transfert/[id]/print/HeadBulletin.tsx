import React from "react";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import useBasePath from "../../../../../hooks/useBasePath";
import { useRouter } from "next/router";
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
    marginTop: 15,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid #000",
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
    textAlign: "center",
    paddingTop: 2,
    paddingBottom: 2,
  },
  row2: {
    width: "50%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
  },
  row3: {
    width: "20%",
    textAlign: "center",
    borderLeft: "1px solid #000",
    paddingTop: 2,
    paddingBottom: 2,
  },
});

const HeadBulletin = () => {
  const router = useRouter();
  const basePath = useBasePath();
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <View style={styles.row1}>
          <Image src={`${router.basePath}/images/logo.png`} />
        </View>
        <Text style={styles.row2}>Procédure</Text>
        <Text style={styles.row3}>RH05-05.BIP</Text>
      </View>
    </View>
  );
};

export default HeadBulletin;
