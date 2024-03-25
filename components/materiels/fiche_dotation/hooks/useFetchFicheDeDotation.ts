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
            args.where = {};
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
