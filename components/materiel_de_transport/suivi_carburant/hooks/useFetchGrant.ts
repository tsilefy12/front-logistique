import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getGrantList } from "../../../../redux/features/grant_ligneBudgétaire_programme/grantSlice";


/**
 * @description Hook to fetch programs
 */
const useFetchGrant = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {};
        if (router.query.orderBy && router.query.order) {
            args.orderBy = {
                [<string>router.query.orderBy]: router.query.order,
            }
        }
        await dispatch(getGrantList({ args }));
    };
};

export default useFetchGrant;