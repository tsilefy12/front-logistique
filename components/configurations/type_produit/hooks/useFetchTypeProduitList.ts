import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getTypeProduits } from "../../../../redux/features/configuration/useCase/typeProduit/getTypeProduits";

/**
 * @description Hook to fetch employees
 */
const useFetchTypeProduitList = () => {
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
    await dispatch(getTypeProduits({ args }));
  };
};

export default useFetchTypeProduitList;
