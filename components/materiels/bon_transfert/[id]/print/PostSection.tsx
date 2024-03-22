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
    fontFamily: "Open Sans",
  },
  row2: {
    width: "45%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
  },
  row3: {
    width: "10%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
  },
  row4: {
    width: "15%",
    textAlign: "left",
    borderLeft: "1px solid #000",
    paddingLeft: 5,
    paddingVertical: 2,
  },
});

const PostSection = (props: any) => {
  return (
    <View style={styles.table}>
      <View style={[styles.row, styles.bold, styles.header]}>
        <Text style={styles.row1}>Désignation du poste :</Text>
        <Text style={styles.row2}>
          {props?.paySlip?.employee?.position?.name}
        </Text>
        <Text style={styles.row3}>Date de fonction :</Text>
        <Text style={styles.row4}>
          <Moment format="DD/MM/YYYY">
            {props?.paySlip?.startDate}
          </Moment>
        </Text>
      </View>
    </View>
  );
};

export default PostSection;
