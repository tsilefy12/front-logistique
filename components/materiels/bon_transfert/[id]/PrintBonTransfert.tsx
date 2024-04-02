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
import { bonTransfertItem } from "../../../../redux/features/bon_transfert/bonTransfert.interface";
import { format } from "date-fns";

function PrintBonTransfert({ pdfData }: { pdfData: any }) {
     console.log(pdfData.dateExp)
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
                              <Text style={{textAlign:"center",width:"100%"}}>BON DE TRANSFERT</Text>
                         </View>
                    </View>
                    <View style={styles.table}>
                        <View style={{width: "100%",display: "flex",flexDirection: "row",marginTop:10}}>
                              <View style={{width: "50%",display: "flex",flexDirection: "row"}}>
                                   <View style={{width: "40%",display: "flex",flexDirection: "column"}}>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"center",fontWeight:"bold",fontSize:10,padding:2}}>DESTINATAIRE</Text>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"center",fontSize:10,padding:2}}>{pdfData?.destination}</Text>
                                   </View>
                                   <View style={{width: "40%",display: "flex",flexDirection: "column"}}>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"center",fontWeight:"bold",fontSize:10,padding:2}}>EXPEDITEUR</Text>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"center",fontSize:10,padding:2}}>{pdfData.expediteur}</Text>
                                   </View>
                              </View>
                              <View style={{width: "50%",display: "flex",flexDirection: "row",marginLeft:10}}>
                                   <View style={{width: "40%",display: "flex",flexDirection: "column",}}>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"left",fontWeight:"bold",fontSize:10,paddingBottom:5}}>Date d'expediteur</Text>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"left",fontSize:10,paddingBottom:5}}>VIA</Text>
                                   </View>
                                   <View style={{width: "50%",display: "flex",flexDirection: "column"}}>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"left",fontWeight:"bold",fontSize:10,paddingBottom:5}}>{pdfData.dateExp ? format(new Date(pdfData.dateExp),"dd/MM/yyyy"):""}</Text>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"left",fontSize:10,paddingBottom:5}}>{pdfData?.expeditionVia}</Text>
                                   </View>
                              </View>
                         </View>
                    </View>
                    <View style={{width: "100%",marginTop:20,}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.th}>Quantité commandée</Text>
                              <Text style={styles.th}>Quantité expédiée</Text>
                              <Text style={styles.th}>Nombre de produits</Text>
                              <Text style={styles.th}>Designation</Text>
                              <Text style={styles.th}>Observation</Text>
                         </View>
                    </View>
                    {pdfData && pdfData.articleTransfert?.map(
                         (element:any, index: any) => {
                              return (
                                   <View style={{width: "100%"}}>
                                        <View style={[styles.rowBody]}>
                                             <Text style={styles.tr}>{element?.quantiteCommande}</Text>
                                             <Text style={styles.tr}>{element?.quantiteExpedie}</Text>
                                             <Text style={styles.tr}></Text>
                                             <Text style={styles.tr}>{element?.designation}</Text>
                                             <Text style={styles.tr}>{element?.observation}</Text>
                                        </View>
                                   </View>
                              )
                         }
                    )} 
                    <View style={{width: "100%",marginTop:20}}>
                         <View style={{width:"100%",display:"flex",flexDirection:"row",alignItems:"center"}}>
                              <View style={[styles.footer]}>
                                  <Text style={{width: "40%",border:"1px solid #000",textAlign:"center",fontWeight:"bold",fontSize:10,padding:5}}>EXPEDITEUR</Text>
                                  <Text style={{width: "40%",border:"1px solid #000",textAlign:"center",fontSize:10,padding:10}}></Text>
                              </View>
                              <View style={[styles.footer]}>
                                  <Text style={{width: "40%",border:"1px solid #000",textAlign:"center",fontWeight:"bold",fontSize:10,padding:5}}>RECEPTIONNAIRE</Text>
                                  <Text style={{width: "40%",border:"1px solid #000",textAlign:"center",fontSize:10,padding:10}}></Text>
                              </View>
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
          fontSize: 11,
     },
     footer:{
          width: "50%",
          alignItems:"center",
          display: "flex",
          flexDirection: "column",
     },
     rowBody: {
          display: "flex",
          flexDirection: "row",
          fontSize: 11,
          border:"1px solid #000"
     },
     th:{
          width: "50%",
          textAlign: "center",
          borderLeft: "1px solid #000",
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft:2,
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
          width: 80,
          height: 70,
     },
});
export default function PDFButton({ data }: { data: bonTransfertItem }) {
     return (
          <PDFDownloadLink
               document={<PrintBonTransfert pdfData={data} />}
               fileName="bon_transfert.pdf"
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