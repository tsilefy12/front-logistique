import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getMissionDeTransportList } from "../../../../redux/features/mission_transport/missionTransportSlice";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";
import { getBudgetLineList } from "../../../../redux/features/grant_ligneBudgétaire_programme/budgeteLineSlice";


/**
 * @description Hook to fetch programs
 */
const useFetchMissionTransport = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {
          include:{
            transportationEquipment: true
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
                        pj: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                    {
                        libelle: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                    {
                        utilisateur: {
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
                ],
            };
        }
        if (router.query.orderBy && router.query.order) {
            args.orderBy = {
                [<string>router.query.orderBy]: router.query.order,
            };
        }
        await dispatch(getMissionDeTransportList({ args }));
        dispatch(getGrantList({}));
        dispatch(getBudgetLineList({}));
    };
};

export default useFetchMissionTransport;