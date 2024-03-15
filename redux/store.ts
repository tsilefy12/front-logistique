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
    stagiaire : stagiaireSlice.reducer,
    bonCommandeInterne : bonCommandeInterneSlice.reducer,
    pvComparaison : pvComparaisonSlice.reducer,
    pvComparaisonFournisseurs: pvComparaisonFournisseurSlice.reducer
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
