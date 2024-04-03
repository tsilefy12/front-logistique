import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getBonCommandeFournisseurs } from "../../../../redux/features/bon_commande_fournisseur/bonCommandeFournisseurSlice";

/**
 * @description Hook to fetch bon commande fournisseur
 */
const useFetchBonCommandeFournisseur = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {
            include : {
                vendor:true
            }
        };
        if (router.query.search) {
            args.where = {
                OR:[
                    {
                        ref:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        modePaiement:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        conditionLivraison:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        type:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        demandeur:{
                            contains:router.query.search,
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
        await dispatch(getBonCommandeFournisseurs({ args }));
    };
};

export default useFetchBonCommandeFournisseur;
