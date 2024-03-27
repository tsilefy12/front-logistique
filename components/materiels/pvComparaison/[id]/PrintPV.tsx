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
import { PvComparaisonItem } from "../../../../redux/features/pvComparaison/pvComparaison.interface";
import { format } from "date-fns";

function PrintPVComparaison({ pdfData }: { pdfData: any }) {
     return (
          <Document >
               <Page style={{ padding:15 }} orientation="landscape">
                    <View style={styles.table}>
                         <View style={[styles.row, styles.bold]}>
                              <Text style={styles.row1}>
                                   <Image
                                        style={styles.logo}
                                        src={`/logistique/images/logo/MV_logo.png`}
                                   />
                              </Text>
                              <View style={styles.row2}>
                                   <Text style={{textAlign:"center",width:"100%",fontSize:12,backgroundColor:"#CC9933"}}>TABLEAU DE COMPARAISON D'OFFRE</Text>
                                   <Text style={{textAlign:"center",width:"100%",fontSize:10}}>Objet</Text>
                                   <Text style={{textAlign:"center",width:"100%",fontSize:10}}>Réference BCI / BCE</Text>
                                   <Text style={{textAlign:"center",width:"100%",fontSize:10}}>Grants</Text>
                                   <Text style={{textAlign:"center",width:"100%",fontSize:10}}>Ligne budgétaire</Text>
                              </View>
                         </View>
                    </View>
                    <View style={{width: "100%",marginTop:20,}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.th}>Fournisseur</Text>
                              <Text style={styles.th}></Text>
                              <Text style={styles.th}></Text>
                              <Text style={styles.th}></Text>
                         </View>
                    </View>
                    <View style={{width: "100%",marginTop:20,}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.th}>OFFRES</Text>
                              <Text style={styles.th}>OFFRES N°1</Text>
                              <Text style={styles.th}>OFFRES N°2</Text>
                              <Text style={styles.th}>OFFRES N°3</Text>
                         </View>
                    </View>
                    <View style={{width:"100%"}}>
                        <View
                        style={[
                            styles.rowSignature,
                            styles.boldSignature,
                            styles.headerSignature,
                        ]}
                        >
                            <Text style={styles.row1Cadre}>DESIGNATION</Text>
                            <Text style={styles.row2Cadre}></Text>
                            <Text style={styles.row2Cadre}></Text>
                            <Text style={styles.row2Cadre}></Text>
                        </View>
                    </View>
                    <View style={{width: "100%"}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.tr}>Montant total</Text>
                              <Text style={styles.tr}></Text>
                              <Text style={styles.tr}></Text>
                              <Text style={styles.tr}></Text>
                         </View>
                    </View>
                    <View style={{width: "100%"}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.tr}>Modalité de paiment</Text>
                              <Text style={styles.tr}></Text>
                              <Text style={styles.tr}></Text>
                              <Text style={styles.tr}></Text>
                         </View>
                    </View>
                    <View style={{width: "100%"}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.tr}></Text>
                              <Text style={styles.tr}></Text>
                              <Text style={styles.tr}></Text>
                              <Text style={styles.tr}></Text>
                         </View>
                    </View>
                    <View style={{width: "100%"}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.tr}>N° OFRES ET FOURNISSEURS RETENU</Text>
                              <Text style={{}}></Text>
                         </View>
                    </View>
                    <View style={styles.table}>
                         <View style={[styles.rowBody]}>
                            <View style={{width: "100%",display: "flex",borderTop:"none",flexDirection: "column"}}>
                                <Text style={{padding:4,fontSize:10}}>JUSTIFICATION DE CHOIX : si le choix ne correspond pas aux critère requis</Text>
                                <Text style={{padding:4,fontSize:10}}>Fournir un argumentaires</Text>
                                <View style={{display:"flex",flexDirection:"row"}}>
                                    <Text style={{padding:6,fontSize:10}}></Text>
                                    <Text style={{padding:6,fontSize:10}}>Moins disant</Text>
                                </View>
                                <View style={{display:"flex",flexDirection:"row"}}>
                                    <Text style={{padding:6,fontSize:10}}></Text>
                                    <Text style={{padding:6,fontSize:10}}>conforme au besoin</Text>
                                </View>
                            </View>
                            <View style={{width: "100%",display: "flex",flexDirection: "column",borderLeft:"1px solid #000"}}>
                                <Text style={{padding:4,fontSize:10}}>ARGUMENTAIRES</Text>
                            </View>
                         </View>
                    </View>
                    <View style={styles.table}>
                        <View style={{width:"100%",alignItems:"center"}}>
                          <View style={{display:"flex",flexDirection:"column",border:"1px solid #000",width:"50°"}}>
                                <Text style={{textAlign:"center",width:"100%",fontSize:10}}>Validé(e) par: e-mail par Raphali</Text>
                                <Text style={{textAlign:"center",width:"100%",fontSize:10}}>Signature</Text>
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
          borderTop:"none",
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
     rowSignature: {
      display: "flex",
      flexDirection: "row",
      border: "1px solid #000",
      fontSize: 11,
    },
    headerSignature: {
      border: "1px solid #000",
    },
    boldSignature: {
      fontWeight: "normal",
    },
    headerCadre1:{
        width: "33%",
        textAlign: "left",
        paddingLeft: 5,
        paddingVertical: 2,
    },
    headerCadre:{
      width: "33%",
      textAlign: "left",
      borderLeft: "1px solid #000",
      paddingLeft: 5,
      paddingVertical: 2,
    },
    row1Cadre :{
      width: "33%",
      textAlign: "center",
      alignItems:"center",
      paddingLeft: 5,
      paddingVertical: 2,
      height: 62,
    },
    row2Cadre: {
      width: "33%",
      textAlign: "left",
      borderLeft: "1px solid #000",
      paddingLeft: 5,
      paddingVertical: 2,
      height: 62,
    },
});
export default function PDFButton({ data }: { data: PvComparaisonItem }) {
     return (
          <PDFDownloadLink
               document={<PrintPVComparaison pdfData={data} />}
               fileName="fiche_dotation.pdf"
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