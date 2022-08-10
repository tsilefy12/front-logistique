import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { editTransportationEquipment } from "../../../../redux/features/transportation_equipment";
import MaterielTransportForm from "../../add/MaterielTransportForm";

const Index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
      getTransportationEquipment(router.query.id as string);
    }
  }, [router.query]);

  const getTransportationEquipment = async (id: string) => {
    await dispatch(editTransportationEquipment({ id }));
  };
  return <MaterielTransportForm></MaterielTransportForm>;
};

export default Index;
