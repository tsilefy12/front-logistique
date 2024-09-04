import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { editBonCommandeExterne } from "../../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";
import BonCommandeExterneForm from "../../add/bonCommadeExterneForm";

const Index = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
      getBCE(router.query.id as string);
    }
  }, [router.query]);

  const getBCE = async (id: string) => {
    await dispatch(editBonCommandeExterne({ id }));
  };
  return <BonCommandeExterneForm />;
};

export default Index;
