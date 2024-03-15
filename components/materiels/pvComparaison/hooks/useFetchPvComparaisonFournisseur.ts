import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getPvComparaisonFournisseurs } from "../../../../redux/features/pvComparaison/pvComparaisonFournisseurSlice";

/**
 * @description Hook to fetch employees
 */
const useFetchPvComparaisonFournisseurs = () => {
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
        await dispatch(getPvComparaisonFournisseurs({ args }));
    };
};

export default useFetchPvComparaisonFournisseurs;
