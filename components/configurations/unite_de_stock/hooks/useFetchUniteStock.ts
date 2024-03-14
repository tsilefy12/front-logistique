import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getUniteStocks } from "../../../../redux/features/configuration/useCase/uniteStock/getUniteStock";

/**
 * @description Hook to fetch employees
 */
const useFetchUniteStockList = () => {
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
    await dispatch(getUniteStocks({ args }));
  };
};

export default useFetchUniteStockList;
