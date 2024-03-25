import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getSuiviCarburantList } from "../../../../redux/features/suivi_carburant/suiviCarburantSlice";


/**
 * @description Hook to fetch programs
 */
const useFetchSuiviCarburants = () => {
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
        await dispatch(getSuiviCarburantList({ args }));
    };
};

export default useFetchSuiviCarburants;