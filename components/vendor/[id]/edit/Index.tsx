import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { editVendor } from "../../../../redux/features/vendor";
import VendorForm from "../../add/VendorForm";

const Index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
      getVendor(router.query.id);
    }
  }, [router.query.id]);

  const getVendor = async (id: any) => {
    await dispatch(editVendor({ id }));
  };
  return <VendorForm></VendorForm>;
};

export default Index;
