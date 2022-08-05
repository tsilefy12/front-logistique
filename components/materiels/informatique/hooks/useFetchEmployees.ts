import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getEmployees } from "../../../../redux/features/equipment";

/**
 * @description Hook to fetch employees
 */
const useFetchEmployes = () => {
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
        await dispatch(getEmployees({ args }));
    };
};

export default useFetchEmployes;
