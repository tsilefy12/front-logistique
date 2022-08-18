import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getCarVouchers } from "../../../../redux/features/consumption_invoice";


/**
 * @description Hook to fetch programs
 */
const useFetchCarVouchers = () => {
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
        await dispatch(getCarVouchers({ args }));
    };
};

export default useFetchCarVouchers;