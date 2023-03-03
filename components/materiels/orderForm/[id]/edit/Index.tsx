import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { editOrderForm } from "../../../../../redux/features/order-form";
import CreationBonCommande from "../../add/CreationBonCommande";



const IndexOrderForm = () => {
  
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.query.id) {
      getOrderForm(router.query.id);
    }
  }, [router.query.id]);

  const getOrderForm = async (id: any) => {
    await dispatch(editOrderForm({ id }));
  };
  
  return <CreationBonCommande></CreationBonCommande>
};

export default IndexOrderForm
