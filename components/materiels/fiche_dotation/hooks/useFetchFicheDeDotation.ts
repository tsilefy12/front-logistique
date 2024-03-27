import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getFicheDotations } from "../../../../redux/features/fiche_dotation/ficheDotationSlice";

/**
 * @description Hook to fetch employees
 */
const useFetchFicheDeDotation = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {};
        if (router.query.search) {
            args.where = {
                OR:[
                    {
                        region:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        district:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        commune:{
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
                        ligneBudgetaire:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    },
                    {
                        fokontany:{
                            contains:router.query.search,
                            mode: "insensitive"
                        }
                    }
                ]
            };
        }
        if (router.query.orderBy && router.query.order) {
            args.orderBy = {
                [<string>router.query.orderBy]: router.query.order,
            };
        }
        await dispatch(getFicheDotations({ args }));
    };
};

export default useFetchFicheDeDotation;
