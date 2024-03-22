import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getBonReceptions } from "../../../../redux/features/bon_reception/bonReceptionSlice";

/**
 * @description Hook to fetch employees
 */
const useFetchBonReception = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {
            include: {
                bonDeCommandeExterne: true,
            },
        };
        if (router.query.search) {
            args.where = {};
        }
        if (router.query.orderBy && router.query.order) {
            args.orderBy = {
                [<string>router.query.orderBy]: router.query.order,
            };
        }
        await dispatch(getBonReceptions({ args }));
    };
};

export default useFetchBonReception;
