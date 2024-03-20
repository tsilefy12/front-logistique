import { Print } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import {
  Document,
  Image,
  Link,
  PDFDownloadLink,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { BonCommandeItem } from "../../../../redux/features/bon_commande_interne/bonCommandeInterne.interface";

function PrintBCI({ pdfData }: { pdfData: any }) {
     return (
          <Document>
               <Page style={{ paddingHorizontal: 40 }}>
               <View
                    style={{
                         display: "flex",
                         flexDirection: "row",
                         justifyContent: "center",
                         alignItems: "center",
                         width: "100%",
                         padding: 10,
                         gap: 20,
                    }}
               >
                    <View
                         style={{
                              border: "1px solid grey",
                         }}
                    >
                    <Image
                         src="/logistique/images/logo/MV_logo.png"
                         style={{ width: 80, height: 80 }}
                    />
                    </View>
                    <View
                    style={{
                         display: "flex",
                         flexDirection: "column",
                         alignItems: "center",
                         fontSize: 16,
                         color: "black",
                         border: "1px solid grey",
                    }}
                    >
                    <Text>
                         Bon de commande interne
                    </Text>
                    </View>
                    <View
                         style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              fontSize: 16,
                              color: "black",
                              border: "1px solid grey",
                         }}
                         >
                         <Text>
                              P05-0
                         </Text>
                         <Text>
                              I. BCI
                         </Text>
                    </View>
               </View>
               <View
                    style={{
                         display: "flex",
                         flexDirection: "row",
                         justifyContent: "center",
                         alignItems: "flex-start",
                         border:"1px solid grey",
                         width: "100%",
                         padding: 10,
                         gap: 20,
                    }}

               >
                    
               </View>
               <View style={style.tr}>
                    <Text style={style.td1}>Mois :</Text>
                    <Text style={style.td2}>
                    {pdfData?.payementDate
                    ? new Date(pdfData.payementDate).toLocaleDateString("fr", {
                         month: "long",
                         year: "numeric",
                         })
                    : "-"}
                    </Text>
               </View>
               <View style={style.tr}>
                    <Text style={style.td1}>Nom et Prénoms :</Text>
                    <Text style={style.td2}>
                    {pdfData?.prestataire?.name + " " + pdfData?.prestataire?.surname ??
                    "-"}
                    </Text>
               </View>
               <View style={style.tr}>
                    <Text style={style.td1}>Référence :</Text>
                    <Text style={style.td2}>{pdfData?.reference ?? "-"}</Text>
               </View>
               <View style={style.tr}>
                    <Text style={style.td1}>Date début/fin de la prestation :</Text>
                    <Text style={style.td2}>
                    {pdfData?.startDate
                    ? new Date(pdfData?.startDate).toLocaleDateString("fr", {
                         month: "long",
                         year: "numeric",
                         })
                    : "-"}{" "}
                    /{" "}
                    {pdfData?.endDate
                    ? new Date(pdfData?.endDate).toLocaleDateString("fr", {
                         month: "long",
                         year: "numeric",
                         })
                    : "-"}
                    </Text>
               </View>
               <View style={style.tr}>
                    <Text style={style.td1}>Service fourni :</Text>
                    <Text style={style.td2}>{pdfData?.position ?? "-"}</Text>
               </View>
               <View style={style.tr}>
                    <Text style={style.td1}>Prestation brute (MGA) :</Text>
                    <Text style={style.td2}>{pdfData?.base ?? "-"}</Text>
               </View>
               <View style={style.tr}>
                    <Text style={style.td1}>ISI (5%)</Text>
                    <Text style={style.td2}>{pdfData?.isiChamp ?? "-"}</Text>
               </View>
               <View style={style.tr}>
                    <Text style={style.td1}>Prestation net (MGA) :</Text>
                    <Text style={style.td2}>{pdfData?.prestationNet ?? "-"}</Text>
               </View>
               <View style={style.tr}>
                    <Text style={style.td1}>Total Prestation (MGA) :</Text>
                    <Text style={style.td2}>{pdfData?.totalPrestation ?? "-"}</Text>
               </View>
               </Page>
          </Document>
     );
}

const style = StyleSheet.create({
  tr: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
    fontSize: 12,
  },
  td1: {
    padding: 5,
    border: "1px solid black",
    textAlign: "left",
    width: "40%",
  },
  td2: {
    padding: 5,
    border: "1px solid black",
    textAlign: "left",
    width: "60%",
  },
});

export default function PDFButton({ data }: { data: BonCommandeItem }) {
  return (
    <PDFDownloadLink
      document={<PrintBCI pdfData={data} />}
      fileName="fiche-paie.pdf"
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