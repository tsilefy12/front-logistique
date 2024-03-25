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
import { format } from "date-fns";
import { BonCommandeItem } from "../../../../redux/features/bon_commande_interne/bonCommandeInterne.interface";

function PrintBCI({ pdfData }: { pdfData: any }) {
     return (
          <Document >
               <Page style={{ padding:15 }} orientation="landscape">
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
                    <View style={styles.table}>
                         <View style={[styles.rowBody]}>
                            <View style={{width: "100%",display: "flex",borderTop:"none",flexDirection: "column"}}>
                                <Text style={{padding:4,fontSize:10}}>Programme / Projet:  {pdfData.programme}</Text>
                                <Text style={{padding:4,fontSize:10}}>Grants:  {pdfData.grant}</Text>
                                <Text style={{padding:4,fontSize:10}}>Ligne budgétaire:  {pdfData.ligneBudgetaire}</Text>
                                <Text style={{padding:4,fontSize:10}}>Nom du démandeur: {pdfData.owner?.name} {pdfData.owner?.surname} </Text>
                            </View>
                            <View style={{width: "100%",display: "flex",flexDirection: "column",borderLeft:"1px solid #000"}}>
                                <Text style={{padding:4,fontSize:10}}>Date:  {pdfData.dateBonCommande ? format(new Date(pdfData.dateBonCommande),"dd/MM/yyyy") :""}</Text>
                                <Text style={{padding:4,fontSize:10}}>Numéro bon de commande:  {pdfData.numBonCommande}</Text>
                            </View>
                         </View>
                    </View>
                    <View style={{width: "100%",marginTop:20,}}>
                         <View style={[styles.rowBody]}>
                              <Text style={styles.th}>Désignation</Text>
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
                                             <Text style={styles.tr}>{element?.pu} ar</Text>
                                             <Text style={styles.tr}>{element?.valueArticle} ar</Text>
                                        </View>
                                   </View>
                              )
                         }
                    )}
                    <View style={{width: "100%"}}>
                        <View style={[styles.rowBody]}>
                                <Text style={styles.tr1}>MONTANT TOTAL</Text>
                                <Text style={styles.tr}>{pdfData?.montantTotal}</Text>
                        </View>
                        <View style={[styles.rowBody]}>
                                <Text style={styles.tr1}>soit:</Text>
                        </View>
                    </View>
                    
                    <View style={{width:"100%"}}>
                        <View style={{width: "100%",border:"1px solid #000",borderBottom:"none",display:"flex",flexDirection:"row",fontSize:"10"}}>
                            <Text style={styles.headerCadre1}>Date et signature</Text>
                            <Text style={styles.headerCadre}>
                                Demandeur
                            </Text>
                            <Text style={styles.headerCadre}>
                                Verification technique
                            </Text>
                            <Text style={styles.headerCadre}>
                                Verification financière
                            </Text>
                            <Text style={styles.headerCadre}>
                                Logisticien
                            </Text>
                        </View>
                        <View
                        style={[
                            styles.rowSignature,
                            styles.boldSignature,
                            styles.headerSignature,
                        ]}
                        >
                            <Text style={styles.row1Cadre}></Text>
                            <Text style={styles.row2Cadre}></Text>
                            <Text style={styles.row2Cadre}></Text>
                            <Text style={styles.row2Cadre}></Text>
                            <Text style={styles.row2Cadre}></Text>
                        </View>
                    </View>
                    <View style={{width:"100%"}}>
                        <View style={{width: "100%",border:"1px solid #000",borderBottom:"none",display:"flex",flexDirection:"row",fontSize:"10"}}>
                            <Text style={styles.headerCadre1}>Date commande</Text>
                            <Text style={styles.headerCadre}>
                                Fournisseur /Prestataire
                            </Text>
                            <Text style={styles.headerCadre}>
                                Date réception
                            </Text>
                            <Text style={styles.headerCadre1}>
                                Date Facture
                            </Text>
                            <Text style={styles.headerCadre}>
                                Montant
                            </Text>
                        </View>
                        <View
                        style={[
                            styles.rowSignature,
                            styles.boldSignature,
                            styles.headerSignature,
                        ]}
                        >
                            <Text style={styles.row1Cadre}></Text>
                            <Text style={styles.row2Cadre}></Text>
                            <Text style={styles.row2Cadre}></Text>
                            <Text style={styles.row2Cadre}></Text>
                            <Text style={styles.row2Cadre}></Text>
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
     tr1:{
        width: "80%",
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
          width: "60%",
          display: "flex",
          alignItems: "center",
          borderLeft: "1px solid #000",
          fontSize: 20,
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
        textAlign: "left",
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