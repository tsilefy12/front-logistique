import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getBonCommandeExternes } from "../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";

/**
 * @description Hook to fetch employees
 */
const useFetchBonCommandeExterne = () => {
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
        await dispatch(getBonCommandeExternes({ args }));
    };
};

export default useFetchBonCommandeExterne;
