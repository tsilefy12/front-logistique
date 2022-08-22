import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getTypeEquipments } from "../../../../redux/features/equipment";

/**
 * @description Hook to fetch programs
 */
const useFetchTypeEquipment = () => {
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
        await dispatch(getTypeEquipments({ args }));
    };
};

export default useFetchTypeEquipment;