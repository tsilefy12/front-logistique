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
        let args: any = {
            include:{
                transportationEquipment: true,
            }
        };
        if (router.query.search) {
            args.where = {
                OR: [
                    {
                        materiel: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                    {
                        grant: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                    {
                        ligneBudgetaire: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                    {
                        modePaiement: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                    {
                        itineraire: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                    {
                        personnelTransporte: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                ]
            };
        }
        if (router.query.orderBy && router.query.order) {
            switch (router.query.orderBy) {
                case "materiel":
                    args.orderBy = {
                        materiel: router.query.order,
                    };
                    break;
                default:
                    args.orderBy = {
                        [<string>router.query.orderBy]: router.query.order,
                    };
                    break;
            }
        }
        await dispatch(getSuiviCarburantList({ args }));
    };
};

export default useFetchSuiviCarburants;