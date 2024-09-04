import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getModePaiements } from "../../../../redux/features/configuration/useCase/modePaiement/getModePaiement";

/**
 * @description Hook to fetch employees
 */
const useFetchModePaiementList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {};
    }
    if (router.query.orderBy && router.query.order) {
      args.orderBy = {
        [<string>router.query.orderBy]: router.query.order,
      };
    }
    await dispatch(getModePaiements({ args }));
  };
};

export default useFetchModePaiementList;
