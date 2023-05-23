import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getSuplyAndConsumableList } from "../../../redux/features/order-supply-and-consumable/useCase/getSupplyAndConsumables";

/**
 * @description Hook to fetch employees
 */
const useFetchSuplysAndConsumableList = () => {
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
    await dispatch(getSuplyAndConsumableList({ args }));
  };
};

export default useFetchSuplysAndConsumableList;
