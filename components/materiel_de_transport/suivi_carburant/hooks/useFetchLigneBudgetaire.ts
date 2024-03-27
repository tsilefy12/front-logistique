import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getSuiviCarburantList } from "../../../../redux/features/suivi_carburant/suiviCarburantSlice";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";


/**
 * @description Hook to fetch programs
 */
const useFetchLigneBudgetaire = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {};
        if (router.query.orderBy && router.query.order) {
            args.orderBy = {
                [<string>router.query.orderBy]: router.query.order,
            }
        }
        await dispatch(getBudgetLineList({ args }));
    };
};

export default useFetchLigneBudgetaire;