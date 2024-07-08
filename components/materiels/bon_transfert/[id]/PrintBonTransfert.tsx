import { BorderLeft, Print } from "@mui/icons-material";
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
                                   <Text style={{textAlign:"center",width:"100%",fontSize:12,padding:4,color:"#ffffff",fontWeight:900,backgroundColor:"#76923E"}}>BON DE TRANSFERT</Text>
                              </View>
                         </View>
                    </View>
                    <View style={styles.table}>
                        <View style={{width: "100%",display: "flex",flexDirection: "row",marginTop:10}}>
                              <View style={{width: "75%",display: "flex",flexDirection: "column"}}>
                                   <View style={{width: "75%",display: "flex",flexDirection: "row"}}>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"center",fontWeight:900,fontSize:10,padding:5,backgroundColor:"#4AADC4",color:"#ffffff",}}>DESTINATAIRE</Text>
                                        <Text style={{width: "100%",border:"1px solid #000",borderLeft:"none",textAlign:"center",fontWeight:900,fontSize:10,padding:5,backgroundColor:"#4AADC4",color:"#ffffff",}}>EXPEDITEUR</Text>
                                   </View>
                                   <View style={{width: "75%",display: "flex",flexDirection: "row"}}>
                                        <Text style={{width: "100%",border:"1px solid #000",borderTop:"none",textAlign:"center",fontSize:10,padding:5}}>{pdfData?.destination}</Text>
                                        <Text style={{width: "100%",border:"1px solid #000",borderLeft:"none",borderTop:"none",textAlign:"center",fontSize:10,padding:5}}>{pdfData.expediteur}</Text>
                                   </View>
                              </View>
                              <View style={{width: "50%",display: "flex",flexDirection: "row",marginLeft:10}}>
                                   <View style={{width: "40%",display: "flex",flexDirection: "column",}}>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"center",fontWeight:"bold",fontSize:10,padding:5,backgroundColor:"#4AADC4",color:"#ffffff",}}>Date d'expediteur</Text>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"center",fontSize:10,padding:5,backgroundColor:"#4AADC4",borderTop:"none",color:"#ffffff",}}>VIA</Text>
                                   </View>
                                   <View style={{width: "50%",display: "flex",flexDirection: "column"}}>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"left",fontWeight:"bold",fontSize:10,padding:5,borderLeft:"none"}}>{pdfData.dateExp ? format(new Date(pdfData.dateExp),"dd/MM/yyyy"):""}</Text>
                                        <Text style={{width: "100%",border:"1px solid #000",textAlign:"left",fontSize:10,padding:5,borderLeft:"none",borderTop:"none"}}>{pdfData?.expeditionVia}</Text>
                                   </View>
                              </View>
                         </View>
                    </View>
                    <View style={{width: "100%",marginTop:20,}}>
                         <View style={[styles.rowBody,{backgroundColor:"#76923E"}]}>
                              <Text style={[styles.th,{borderLeft:"none"}]}>Quantité commandée</Text>
                              <Text style={styles.th}>Quantité expédiée</Text>
                              <Text style={[styles.th,{width: "50% !important"}]}>Designation</Text>
                              <Text style={styles.th}>Observation</Text>
                         </View>
                    </View>
                    {pdfData && pdfData.articleTransfert?.map(
                         (element:any, index: any) => {
                              return (
                                   <View key={index} style={{width: "100%"}}>
                                        <View style={[styles.rowBody ,{borderTop:"none !important",}]}>
                                             <Text style={[styles.tr,{borderLeft:"none"}]}>{element?.quantiteCommande}</Text>
                                             <Text style={styles.tr}>{element?.quantiteExpedie}</Text>
                                             <Text style={[styles.tr,{width: "50% !important"}]}>{element?.designation}</Text>
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
                                  <Text style={{width: "40%",border:"1px solid #000",borderTop:"none !important",textAlign:"center",fontSize:10,padding:10,height:80}}></Text>
                              </View>
                              <View style={[styles.footer]}>
                                  <Text style={{width: "40%",border:"1px solid #000",textAlign:"center",fontWeight:"bold",fontSize:10,padding:5}}>RECEPTIONNAIRE</Text>
                                  <Text style={{width: "40%",border:"1px solid #000",textAlign:"center",fontSize:10,padding:10,borderTop:"none !important",height:80}}></Text>
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
          width: "20%",
          textAlign: "center",
          borderLeft: "1px solid #000",
          paddingTop:4,
          padding :2,
          color:"#ffffff",
          fontWeight: 900,
          fontSize: 12,
     },
     tr:{
          width: "20%",
          textAlign: "center",
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
          width: "100%",
          display: "flex",
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
                    </Button>
               )
               }
          </PDFDownloadLink>
     );
}