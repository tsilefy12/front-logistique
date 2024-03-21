import { Print } from "@mui/icons-material";
import { Button, CircularProgress } from "@mui/material";
import {
     Document,
     Image,
     PDFDownloadLink,
     Page,
     StyleSheet,
     Text,
     View,
     Font,
} from "@react-pdf/renderer";
import { BonCommandeItem } from "../../../../redux/features/bon_commande_interne/bonCommandeInterne.interface";

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
  ],
});

function PrintBCI({ pdfData }: { pdfData: any }) {
     console.log(pdfData)
     return (
          <Document>
               <Page style={{ padding:15 }}>
                    <View style={styles.table}>
                         <View style={[styles.row, styles.bold, styles.header]}>
                              <Text style={styles.row1}>
                                   <Image
                                        style={styles.logo}
                                        src={`/logistique/images/logo/MV_logo.png`}
                                   />
                              </Text>
                              <View style={styles.row2}>
                                   <Text>Bon de commande interne</Text>
                              </View>
                              <View style={styles.row3}>
                                   <Text>PO5-0I.BCI</Text>
                              </View>
                         </View>
                    </View>
                    <View style={{width: "100%",}}>
                         <View style={{width: "100%",borderBottom: "1px solid #000",}}>
                              <View style={[styles.rowBodyTitle]}>
                                   <Text style={styles.title}>Programme / Projet</Text>
                                   <Text style={styles.val}>{pdfData?.programme}</Text>
                                   <Text style={styles.title1}>Numéro bon commande</Text>
                                   <Text style={styles.val}>{pdfData?.numBon}</Text>
                              </View>
                              <View style={[styles.rowBodyTitle]}>
                                   <Text style={styles.title}>Grants</Text>
                                   <Text style={styles.val}>{pdfData?.grant}</Text>
                                   <Text style={styles.title1}>Date</Text>
                                   <Text style={styles.val}></Text>
                              </View>
                              <View style={[styles.rowBodyTitle]}>
                                   <Text style={styles.title}>Ligne Budgétaire</Text>
                                   <Text style={styles.val}>{pdfData?.ligneBudgetaire}</Text>
                                   <Text style={styles.title1}>Numéro de bon de commande</Text>
                                   <Text style={styles.val}>{pdfData?.numBonCommande}</Text>
                              </View>
                              <View style={[styles.rowBodyTitle]}>
                                   <Text style={styles.title}>Nom du Demandeur</Text>
                                   <Text style={styles.val}>{pdfData?.demandeur}</Text>
                                   <Text style={styles.title}></Text>
                                   <Text style={styles.val}></Text>
                              </View>
                         </View>
                    </View>
                    <View style={{width: "100%"}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.th}>Desination</Text>
                              <Text style={styles.th}>Caractéristique</Text>
                              <Text style={styles.th}>Quantité</Text>
                              <Text style={styles.th}>PU</Text>
                              <Text style={styles.th}>Valeur</Text>
                         </View>
                    </View>
                    {pdfData && pdfData.ArticleCommande?.map(
                         (element:any, index: any) => {
                              return (
                                   <View style={{width: "100%"}}>
                                        <View style={[styles.rowBody]}>
                                             <Text style={styles.tr}>{element?.designation}</Text>
                                             <Text style={styles.tr}>{element?.caracteristik}</Text>
                                             <Text style={styles.tr}>{element?.quantite}</Text>
                                             <Text style={styles.tr}>{element?.pu}</Text>
                                             <Text style={styles.tr}>{element?.valueArticle}</Text>
                                        </View>
                                   </View>
                              )
                         }
                    )} 
                    <View style={{width: "100%",}}>
                         <View style={[styles.rowBody]}>
                              <Text style={{width: "80%",textAlign: "center"}}>TOTAL COMMANDE</Text>
                              <Text style={{width: "20%"}}>{pdfData?.montantTotal}</Text>
                         </View>
                    </View>
                    <View style={{width: "100%",}}>
                         <View style={[styles.rowBody]}>
                              <Text style={{width: "100%"}}>Soit</Text>
                         </View>
                    </View>
                    <View style={{width: "100%",}}>
                         <View style={[styles.rowBody]}>
                              <Text style={{width: "30%",paddingTop:2,textDecoration:"underline"}}>Dates et Signature</Text>
                              <View style={[styles.rowBody]}>
                                   <Text style={{width: "23%",border:"1px solid #000",textAlign:"left",paddingTop: 2,paddingBottom: 8}}>Demande</Text>
                                   <Text style={{width: "23%",border:"1px solid #000",textAlign:"left"}}>Vérification</Text>
                                   <Text style={{width: "23%",border:"1px solid #000",textAlign:"left",paddingTop: 2,paddingBottom: 8}}>Validation</Text>
                                   <Text style={{width: "23%",border:"1px solid #000",textAlign:"left",paddingTop: 2,paddingBottom: 8}}>Autre</Text>
                              </View>
                         </View>
                    </View>
                    <View style={{width: "100%"}}>
                         <View style={[styles.rowBody]}>
                              <Text style={{width: "23%",border:"1px solid #000",textAlign:"left",paddingTop: 2,paddingBottom: 8}}>Date Commande</Text>
                              <Text style={{width: "23%",border:"1px solid #000",textAlign:"left",paddingTop: 2,paddingBottom: 8}}>Fournisseur /Prestataire</Text>2
                              <Text style={{width: "23%",border:"1px solid #000",textAlign:"left",paddingTop: 2,paddingBottom: 8}}>Date réception</Text>
                              <Text style={{width: "23%",border:"1px solid #000",textAlign:"left",paddingTop: 2,paddingBottom: 8}}>Date facture</Text>
                              <Text style={{width: "23%",border:"1px solid #000",textAlign:"left",paddingTop: 2,paddingBottom: 8}}>Montant</Text>
                         </View>
                    </View>
                    <View style={{width: "100%"}}>
                         <View style={[styles.rowBody]}>
                              <Text style={{width: "100%",textAlign:"left",paddingTop: 2,paddingBottom:4}}>Observation</Text>
                         </View>
                    </View>
               </Page>
          </Document>
     );
}

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
     rowBodyTitle:{
          display: "flex",
          flexDirection: "row",
          fontSize: 11,
          border: "1px solid #000",
          borderTop: "none",
          borderBottom:"none",
     },
     rowBody: {
          display: "flex",
          flexDirection: "row",
          fontSize: 11,
          border: "1px solid #000",
          borderTop: "none",
     },
     th:{
          width: "23%",
          textAlign: "center",
          borderLeft: "1px solid #000",
          paddingTop: 2,
          paddingBottom: 2,
          textDecoration: "underline",
          fontWeight: "bold",
          fontSize: 10,
     },
     val:{
          width: "30%",
          textAlign: "left",
          paddingTop: 2,
          paddingBottom: 2,
     },
     tr:{
          width: "23%",
          textAlign: "left",
          borderLeft: "1px solid #000",
          paddingTop: 2,
          paddingBottom: 2,
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
     title:{
          width: "30%",
          textAlign: "left",
          paddingLeft: 5,
          paddingVertical: 2,
          textDecoration: "underline",
          fontWeight: "bold",
          fontSize: 10,
     },
     title1:{
          width: "35%",
          textAlign: "left",
          paddingLeft: 5,
          paddingVertical: 2,
          textDecoration: "underline",
          fontWeight: "bold",
          borderLeft: "1px solid #000",
          fontSize: 10,
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
export default function PDFButton({ data }: { data: BonCommandeItem }) {
     return (
          <PDFDownloadLink
               document={<PrintBCI pdfData={data} />}
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