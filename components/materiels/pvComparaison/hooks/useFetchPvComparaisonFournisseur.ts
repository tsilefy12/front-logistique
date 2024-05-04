import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getPvComparaisons } from "../../../../redux/features/pvComparaison/pvComparaisonSlice";

/**
 * @description Hook to fetch employees
 */
const useFetchPvComparaisonFournisseurs = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {
            include :  {
                bonDeCommandeExterne: true,
                bonDeCommandeInterne:true,
                tableComparaison :{
                    include : {
                        offreRetenu:true,
                        vendor:true
                    }
                }
            }
        };
        if (router.query.search) {
            args.where = {};
        }
        if (router.query.orderBy && router.query.order) {
            args.orderBy = {
                [<string>router.query.orderBy]: router.query.order,
            };
        }
        const response = await dispatch(getPvComparaisons({ args }));
    };
};

export default useFetchPvComparaisonFournisseurs;
