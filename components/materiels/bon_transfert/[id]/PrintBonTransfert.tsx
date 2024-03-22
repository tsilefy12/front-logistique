import { Print } from "@mui/icons-material";
import React, { Fragment } from "react";
import { Button, CircularProgress } from "@mui/material";
import {
    usePDF,
    Document,
    Page,
    StyleSheet,
    View,
    PDFDownloadLink,
    Text,
    Canvas,
    Image,
    Font,
  } from "@react-pdf/renderer";
import { bonTransfertItem } from "../../../../redux/features/bon_transfert/bonTransfert.interface";
import HeadColumns from "./print/HeadColumns";
import HeadBulletin from "./print/HeadBulletin";
import PeriodeSection from "./print/PeriodeSection";
import EmployeSection from "./print/EmployeSection";
import PostSection from "./print/PostSection";
import ProgramSection from "./print/ProgramSection";
import DateEmbaucheSection from "./print/DateEmbaucheSection";
import DetailSalarial from "./print/DetailSalarial";
import HeadDetailSalarial from "./print/HeadDetailSalarial";
import OneRowDetailSalarial from "./print/OneRowDetailSalarial";
import SignatureSection from "./print/SignatureSection";

const styles = StyleSheet.create({
    page: {
      padding: 15,
    },
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
      display: "flex",
      alignItems: "center",
      borderLeft: "1px solid #000",
      fontSize: 16,
      justifyContent: "center",
    },
    row3: {
      width: "20%",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      borderLeft: "1px solid #000",
      justifyContent: "center",
    },
    logo: {
      width: 100,
      height: 90,
    },
  });
function PrintBonTransfert({ pdfData }: { pdfData: any }) {
    console.log(pdfData)
    return (
        <Document>
            <Page size="A4" wrap style={styles.page}>
            <HeadColumns />
            <View style={styles.table}>
                <View style={[styles.row, styles.bold, styles.header]}>
                <Text style={styles.row1}>
                    <Image
                        style={styles.logo}
                        src={`/logistique/images/logo/MV_logo.png`}
                    />
                </Text>
                <View style={styles.row2}>
                    <Text>Bulletin individuel de paie</Text>
                </View>
                <View style={styles.row3}>
                    <Text>RH05-05.BIP</Text>
                </View>
                </View>
            </View>
            <PeriodeSection paySlip={""} />
            <EmployeSection paySlip={""} />
            <PostSection paySlip={""} />
            <ProgramSection paySlip={""} />
            <DateEmbaucheSection paySlip={""} />
            <DetailSalarial />
            <HeadDetailSalarial />
            <OneRowDetailSalarial col2="GAINS" isTitle2={true} />
            <Fragment key={1}>
                <OneRowDetailSalarial
                    col1={""}
                    col2={""}
                    col3={""}
                    col4={""}
                    col5={""}
                />
            </Fragment>
            <OneRowDetailSalarial
                col1="(5)"
                col2="Total GainsAINS"
                col3="(1)+(2) +(3) +(4)"
                col4="«Total_Gains»"
                isTitle1={true}
                isTitle2={true}
                isTitle3={true}
                isTitle4={true}
                isTitle5={true}
            />
            <OneRowDetailSalarial col1="/" />
            <OneRowDetailSalarial col2="RETENUES" isTitle2={true} />
            <Fragment key={2}>
                <OneRowDetailSalarial
                    col1={"col1"}
                    col2={"col2"}
                    col3={"col3"}
                    col4={"col4"}
                    col5={"col5"}
                />
            </Fragment>
            <OneRowDetailSalarial
                col1="(10)"
                col2="Total retenues"
                col3=""
                col4="«Total_Retenues»"
                isTitle1={true}
                isTitle2={true}
                isTitle3={true}
                isTitle4={true}
                isTitle5={true}
            />
            <OneRowDetailSalarial col1="/" />
            <OneRowDetailSalarial
                col1="(11)"
                col2="Montant net à payer"
                col3="(5)-(10)"
                col4="«Salaire_net»"
                isTitle1={true}
                isTitle2={true}
                isTitle3={true}
                isTitle4={true}
                isTitle5={true}
            />
            <Fragment key={""}>
            <OneRowDetailSalarial
                col1={"col1"}
                col2={"col2"}
                col3={"col3"}
                col4={"col4"}
                col5={"col5"}
            />
            </Fragment>
            <SignatureSection />
            </Page>
        </Document>
    );
}

export default function PDFButton({ data }: { data: any }) {
     return (
          <PDFDownloadLink
               document={<PrintBonTransfert pdfData={data} />}
               fileName="bci.pdf"
          >
               {({ blob, url, loading, error }) =>
               loading ? (
                    <CircularProgress size={25} color="primary" />
               ) : (
                    <Button
                    variant="contained"
                    color="info"
                    size="small"
                    startIcon={<Print />}
                    sx={{ marginInline: 3 }}
                    >
                    Imprimer
                    </Button>
               )
               }
          </PDFDownloadLink>
     );
}