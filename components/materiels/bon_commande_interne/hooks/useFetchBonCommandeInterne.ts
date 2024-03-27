import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getBonCommandeInternes } from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";

/**
 * @description Hook to fetch employees
 */
const useFetchBonCommandeInterne = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {};
        if (router.query.search) {
            args.where = {
                OR: [
                    {
                        grant: {
                            contains: router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        programme: {
                            contains: router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        ligneBudgetaire: {
                            contains: router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        demandeur: {
                            contains: router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        reference: {
                            contains: router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        type: {
                            contains: router.query.search,
                            mode: "insensitive"
                        }
                    },
                ]
            };
        }
        if (router.query.orderBy && router.query.order) {
            args.orderBy = {
                [<string>router.query.orderBy]: router.query.order,
            };
        }
        await dispatch(getBonCommandeInternes({ args }));
    };
};

export default useFetchBonCommandeInterne;
