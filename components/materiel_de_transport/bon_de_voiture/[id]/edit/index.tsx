import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { editCarVoucher, getCarVoucher } from "../../../../../redux/features/car-voucher";
import FormBonDeVoiture from "../../add/formBondeVoiture";
import { useEffect } from "react";
// import { useAppDispatch } from "../../../../hooks/reduxHooks";
// import { editTransportationEquipment } from "../../../../redux/features/transportation_equipment";
// import MaterielTransportForm from "../../add/MaterielTransportForm";

const EditBonDeVoiture = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
        getCarVoucher(router.query.id as string);
    }
  }, [router.query]);

  const getCarVoucher = async (id: string) => {
    await dispatch(editCarVoucher({ id }));
  };
  return <FormBonDeVoiture></FormBonDeVoiture>;
};

export default EditBonDeVoiture;