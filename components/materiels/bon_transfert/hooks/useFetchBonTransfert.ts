import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getBonTransferts } from "../../../../redux/features/bon_transfert/bonTransfertSlice";

/**
 * @description Hook to fetch employees
 */
const useFetchBonTransfert = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {};
        if (router.query.search) {
            args.where = {
                OR:[
                    {
                        expediteur:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        reference:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        departement:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        grant:{
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
                ]
            };
        }
        if (router.query.orderBy && router.query.order) {
            args.orderBy = {
                [<string>router.query.orderBy]: router.query.order,
            };
        }
        await dispatch(getBonTransferts({ args }));
    };
};

export default useFetchBonTransfert;
