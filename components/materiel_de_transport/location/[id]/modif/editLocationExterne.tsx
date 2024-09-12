import { useRouter } from "next/router";
import { useEffect } from "react";
import AddMaterielExterne from "../../addMaterielExterne/AddMaterielExterne";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { editTransportationEquipment } from "../../../../../redux/features/transportation_equipment";

const ModifLocationExterne = () => {
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
  return <AddMaterielExterne />;
};

export default ModifLocationExterne;
