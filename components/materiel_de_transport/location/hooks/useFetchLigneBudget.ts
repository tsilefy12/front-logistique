import { useRouter } from "next/router";
import { getLocationtList } from "../../../../redux/features/location/locationSlice";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";
import { getLineBudget } from "../../../../redux/features/lineBudget";
const useFetchLigneBudget = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {
      include: {
        transportationEquipment: true,
        vendor: true,
      },
    };
    if (router.query.search) {
      args.where = {};
    }
    if (router.query.orderBy && router.query.order) {
      args.orderBy = {
        [<string>router.query.orderBy]: router.query.order,
      };
    }
    dispatch(getLineBudget({ args }));
  };
};

export default useFetchLigneBudget;
