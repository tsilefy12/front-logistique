import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { editOrderEquipmentItem } from "../../../../redux/features/OrderEquipmentItem";
import OrderEquipmentItemForm from "../../add/OrderEquipmentItemForm";
// import ArticleForm from "../../add/OrderEquipmentItemForm";

const IndexOrderEquipmentItem = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
      getOrderEquipementItem(router.query.id);
    }
  }, [router.query.id]);

  const getOrderEquipementItem = async (id: any) => {
    await dispatch(editOrderEquipmentItem({ id }));
  };
  return;
  <OrderEquipmentItemForm></OrderEquipmentItemForm>;
};

export default IndexOrderEquipmentItem;
