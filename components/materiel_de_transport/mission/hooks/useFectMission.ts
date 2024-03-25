import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getMissionDeTransportList } from "../../../../redux/features/mission_transport/missionTransportSlice";


/**
 * @description Hook to fetch programs
 */
const useFetchMissionTransport = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {};
        if (router.query.search) {
            args.where = {
                OR: [
                    {
                      materiel: {
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
    };
};

export default useFetchMissionTransport;