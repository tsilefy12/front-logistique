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
} from "@react-pdf/renderer";
import { bonReceptionItem } from "../../../../redux/features/bon_reception/bonReception.interface";


function PrintBonReception({ pdfData }: { pdfData: any }) {
     console.log(pdfData)
     return (
          <Document>
               <Page style={{ padding:15 }}>
                    <View style={styles.table}>
                         <View style={[styles.row, styles.bold]}>
                              <Text style={styles.row1}>
                                   <Image
                                        style={styles.logo}
                                        src={`/logistique/images/logo/MV_logo.png`}
                                   />
                              </Text>
                              <View style={styles.row2}>
                                   <Text>Bon de Réception</Text>
                              </View>
                         </View>
                    </View>
                    <View style={styles.table}>
                         <View style={{width:'100%',alignItems:"center"}}>
                              <Text style={{width:'100%',fontSize:14,textAlign:"center"}}>Association Madagasikara voakajy</Text>
                         </View>
                    </View>
                    <View style={{width: "100%",}}>
                         <View style={{width: "100%",display: "flex",flexDirection: "column",marginTop:10}}>
                              <Text style={{width: "100%",textAlign:"left",fontWeight:"bold",fontSize:10,paddingBottom:5}}>LOT IIf14P Bis A Andraharo</Text>
                              <Text style={{width: "100%",textAlign:"left",fontSize:10,paddingBottom:5}}>BP 5281,101 Antananarivo</Text>
                              <Text style={{width: "100%",textAlign:"left",fontSize:10,paddingBottom:5}}>Contact: +261 342515523</Text>
                         </View>
                    </View>

                    <View style={{width: "100%",marginTop:20,}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.th}>Date</Text>
                              <Text style={styles.th}>Tiers: Fournisseurs</Text>
                         </View>
                    </View>
                    <View style={{width: "100%"}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.tr}>{pdfData.dateReception}</Text>
                              <Text style={styles.tr}>Nom: {pdfData.bonCommandeExterne?.vendor?.name}</Text>
                         </View>
                    </View>

                    <View style={{width: "100%",marginTop:20,}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.th}>Desination</Text>
                              <Text style={styles.th}>Quantité</Text>
                         </View>
                    </View>
                    {pdfData && pdfData.produitRecu?.map(
                         (element:any, index: any) => {
                              return (
                                   <View style={{width: "100%"}}>
                                        <View style={[styles.rowBody]}>
                                             <Text style={styles.tr}>{element?.designation}</Text>
                                             <Text style={styles.tr}>{element?.quantite}</Text>
                                        </View>
                                   </View>
                              )
                         }
                    )} 
                    <View style={{width: "100%",marginTop:20}}>
                         <View style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
                              <Text style={{width: "50%",textAlign:"center",fontSize:12,paddingTop: 2,paddingBottom:4}}>Fournisseur</Text>
                              <Text style={{width: "50%",textAlign:"center",fontSize:12,paddingTop: 2,paddingBottom:4}}>Client</Text>
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
     rowBody: {
          display: "flex",
          flexDirection: "row",
          fontSize: 11,
          border: "1px solid #000",
     },
     th:{
          width: "50%",
          textAlign: "center",
          borderLeft: "1px solid #000",
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft:2,
          textDecoration: "underline",
          fontWeight: "bold",
          fontSize: 10,
     },
     tr:{
          width: "50%",
          textAlign: "left",
          borderLeft: "1px solid #000",
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft:2,
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
          fontSize: 20,
          justifyContent: "center",
     },
     logo: {
          width: 100,
          height: 90,
     },
});
export default function PDFButton({ data }: { data: bonReceptionItem }) {
     return (
          <PDFDownloadLink
               document={<PrintBonReception pdfData={data} />}
               fileName="bon_reception.pdf"
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