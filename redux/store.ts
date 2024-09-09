import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { customizationSlice } from "./features/slices/customizationSlice";
import { menuSlice } from "./features/menu/menuSlice";
import { menuProfileSlice } from "./features/menu/menuprofileSlice";
import { authSlice } from "./features/auth";
import { vendorSlice } from "./features/vendor/vendorSlice";
import { typeEquipmentSlice } from "./features/typeEquipment/typeEquipmentSlice";
import { notificationSlice } from "./features/notification/notificationSlice";
import { transportationEquipmentSlice } from "./features/transportation_equipment/transportationEquipmentSlice";
import { fournisseurSlice } from "./features/fournisseur/fournisseurSlice";
import { orderEquipmentSlice } from "./features/orderEquipment/orderEquipmentSlice";
import { consumableSlice } from "./features/order-supply-and-consumable/OrderSupplyAndConsumable";
import { carVoucherSlice } from "./features/car-voucher/carVoucherSlice";
import { consumptionInvoiceSlice } from "./features/consumption_invoice/consumptionInvoiceSlice";
import { equipmentSlice } from "./features/equipment/equipmentSlice";
import { detenteurSlice } from "./features/detenteur/detenteurSlice";
import { passengerSlice } from "./features/passenger/passengerSlice";
import { orderFormSlice } from "./features/order-form/orderFormSlice";
import { suplyAndConsumableSlice } from "./features/supply-and-consumable/supply-and-consumable";
import { logSuplyAndConsumableSlice } from "./features/logSuplyAndConsumable/log-supply-and-consumableSlice";
import { orderEquipmentItemSlice } from "./features/OrderEquipmentItem/orderEquipmentItemSlice";
import { orderFormItemSlice } from "./features/orderFormItem/orderFormItemSlice";
import { selectOfferOrderSlice } from "./features/selectOfferOrder/selectOfferOrderSlice";
import { offerOrderSlice } from "./features/OfferOrder/offerOrderSlice";
import { offerOrderItemSlice } from "./features/offerOrderItem/offerOrderItemSlice";
import { holderSlice } from "./features/holder/holderSlice";
import { equipmentStockSlice } from "./features/equipmentStock/equipmentStockSlice";
import { categorieStockSlice } from "./features/configuration/categorieStockSlice";
import { typeProduitSlice } from "./features/configuration/typeProduitSlice";
import { UniteStockSLice } from "./features/configuration/uniteStockSlice";
import { InventaireSlice } from "./features/inventaire/inventaireSlice";
import { employeSlice } from "./features/employeStagiaire/employeeSlice";
import { stagiaireSlice } from "./features/employeStagiaire/stagiaireSlice";
import { bonCommandeInterneSlice } from "./features/bon_commande_interne/bonCommandeInterneSlice";
import { pvComparaisonSlice } from "./features/pvComparaison/pvComparaisonSlice";
import { pvComparaisonFournisseurSlice } from "./features/pvComparaison/pvComparaisonFournisseurSlice";
import { bonCommandeExterneSlice } from "./features/bon_commande_externe/bonCommandeExterneSlice";
import { ArticleCommandeInterneSlice } from "./features/bon_commande_interne/articleCommandeSlice";
import { bonReceptionSlice } from "./features/bon_reception/bonReceptionSlice";
import { ArticleTransfertSlice } from "./features/bon_transfert/articleTransfertSlice";
import { produitRecuSlice } from "./features/bon_reception/produitRecuSlice";
import { bonTransfertSlice } from "./features/bon_transfert/bonTransfertSlice";
import { ArticleCommandeExterneSlice } from "./features/bon_commande_externe/articleBCESlice";
import { missionTransportSlice } from "./features/mission_transport/missionTransportSlice";
import { locationSlice } from "./features/location/locationSlice";
import { suiviCarburantSlice } from "./features/suivi_carburant/suiviCarburantSlice";
import { ficheDotationSlice } from "./features/fiche_dotation/ficheDotationSlice";
import { grantSlice } from "./features/grant_ligneBudgétaire_programme/grantSlice";
import { budgetLineSlice } from "./features/grant_ligneBudgétaire_programme/budgeteLineSlice";
import { holderEquipementSlice } from "./features/holder/holderEquipementSlice";
import { activitySlice } from "./features/activity/activitySlice";
import { programSlice } from "./features/program/programSlice";
import { BonCommandeFournisseurSlice } from "./features/bon_commande_fournisseur/bonCommandeFournisseurSlice";
import { ArticleCommandeFournisseurSlice } from "./features/bon_commande_fournisseur/articleCommandeFournisseurSlice";
import { OffreRetenuSlice } from "./features/pvComparaison/offreRetenuSlice";
import { ModePaiementSlice } from "./features/configuration/modePaiementSlice";
import { prestataireSlice } from "./features/prestataire/prestataireSlice";
import { LocalisationSlice } from "./features/configuration/localisationSlice";
import { lineBudgetSlice } from "./features/lineBudget/lineBudgetSlice";
import { workplaceSlice } from "./features/workplace/workplaceSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    customization: customizationSlice.reducer,
    menu: menuSlice.reducer,
    menuprofile: menuProfileSlice.reducer,
    notification: notificationSlice.reducer,
    vendor: vendorSlice.reducer,
    typeEquipment: typeEquipmentSlice.reducer,
    orderEquipment: orderEquipmentSlice.reducer,
    fournisseur: fournisseurSlice.reducer,
    transportationEquipment: transportationEquipmentSlice.reducer,
    carVoucher: carVoucherSlice.reducer,
    suplyAndConsumable: suplyAndConsumableSlice.reducer,
    consumptionInvoice: consumptionInvoiceSlice.reducer,
    equipment: equipmentSlice.reducer,
    consumable: consumableSlice.reducer,
    detenteur: detenteurSlice.reducer,
    passenger: passengerSlice.reducer,
    orderForm: orderFormSlice.reducer,
    // logSuplyAndConsumable: logSuplyAndConsumableSlice.reducer,
    orderEquipmentItem: orderEquipmentItemSlice.reducer,
    orderFormItem: orderFormItemSlice.reducer,
    selectOfferOrder: selectOfferOrderSlice.reducer,
    offerOrder: offerOrderSlice.reducer,
    offerOrderItem: offerOrderItemSlice.reducer,
    logSuplyAndConsumable: logSuplyAndConsumableSlice.reducer,
    holder: holderSlice.reducer,
    equipmentStock: equipmentStockSlice.reducer,
    categorieStock: categorieStockSlice.reducer,
    uniteStock: UniteStockSLice.reducer,
    typeProduit: typeProduitSlice.reducer,
    inventaire: InventaireSlice.reducer,
    employe: employeSlice.reducer,
    stagiaire: stagiaireSlice.reducer,
    bonCommandeInterne: bonCommandeInterneSlice.reducer,
    articleCommandeInterne: ArticleCommandeInterneSlice.reducer,
    pvComparaison: pvComparaisonSlice.reducer,
    pvComparaisonFournisseurs: pvComparaisonFournisseurSlice.reducer,
    bonCommendeExterne: bonCommandeExterneSlice.reducer,
    bonReceptions: bonReceptionSlice.reducer,
    articleTransfert: ArticleTransfertSlice.reducer,
    produiReçu: produitRecuSlice.reducer,
    bonTransfert: bonTransfertSlice.reducer,
    articleCommandeBce: ArticleCommandeExterneSlice.reducer,
    suiviCarburant: suiviCarburantSlice.reducer,
    missionDeTransport: missionTransportSlice.reducer,
    locationDeTransport: locationSlice.reducer,
    ficheDotation: ficheDotationSlice.reducer,
    grant: grantSlice.reducer,
    lineBugetaire: budgetLineSlice.reducer,
    holderEquipment: holderEquipementSlice.reducer,
    activity: activitySlice.reducer,
    program: programSlice.reducer,
    bonDeCommandeFournisseur: BonCommandeFournisseurSlice.reducer,
    articleCommanedFournisseur: ArticleCommandeFournisseurSlice.reducer,
    offreRetenu: OffreRetenuSlice.reducer,
    modePaiement: ModePaiementSlice.reducer,
    prestataire: prestataireSlice.reducer,
    localisation: LocalisationSlice.reducer,
    ligneBudget: lineBudgetSlice.reducer,
    workplace: workplaceSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
