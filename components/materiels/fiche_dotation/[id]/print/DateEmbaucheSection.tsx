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
    width: "17%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
  },
  row3: {
    width: "18%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
    textDecoration: "underline",
    fontWeight: "bold",
    fontSize: 10,
  },
  row4: {
    width: "10%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
    fontSize: 7,
  },
  row5: {
    width: "10%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
    fontSize: 7,
  },
  row6: {
    width: "10%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    fontSize: 7,
    paddingVertical: 2,
  },
});

const DateEmbaucheSection = (props: any) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row1}>Date d’embauche :</Text>
        <Text style={styles.row2}>
          <Moment format="DD/MM/YYYY">
            {props?.paySlip?.employee?.hiringDate}
          </Moment>
        </Text>
        <Text style={styles.row3}>Position salariale :</Text>
        <Text style={styles.row4}>
          Catégorie {props?.paySlip?.employee?.category?.name}
        </Text>
        <Text style={styles.row5}>
          Classe {props?.paySlip?.employee?.class?.name}
        </Text>
        <Text style={styles.row6} wrap>
          Echelon {props?.paySlip?.employee?.echelon?.name}
        </Text>
      </View>
    </View>
  );
};

export default DateEmbaucheSection;
