import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { editSuplyAndConsumable } from "../../../../redux/features/supply-and-consumable";
import ArticleForm from "../../add/SupplyAndConsumableForm";

const IndexSuply = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
      getSuplyAndConsumable(router.query.id);
    }
  }, [router.query.id]);

  const getSuplyAndConsumable = async (id: any) => {
    await dispatch(editSuplyAndConsumable({ id }));
  };
  return;
  <ArticleForm></ArticleForm>;
};

export default IndexSuply;
