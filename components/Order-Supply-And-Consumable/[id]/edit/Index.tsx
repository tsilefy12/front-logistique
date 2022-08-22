import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { editConsumable, getConsumable } from "../../../../redux/features/order-supply-and-consumable";
import ConsumableForm from "../../add/OrderSupplyAndConsumableForm";

const Index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.id) {
      getConsumable(router.query.id);
    }
  }, [router.query.id]);
  const getConsumable = async (id: any) => {
    await dispatch(editConsumable({ id }));
  };
  return <ConsumableForm></ConsumableForm>
};

export default Index;