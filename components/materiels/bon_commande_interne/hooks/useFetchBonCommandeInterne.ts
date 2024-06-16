import { useRouter } from "next/router";
import { usePermitted } from "../../../../config/middleware";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getBonCommandeInternes } from "../../../../redux/features/bon_commande_interne/bonCommandeInterneSlice";

/**
 * @description Hook to fetch employees
 */
const useFetchBonCommandeInterne = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const validate = usePermitted();
  const { user } = useAppSelector((state) => state.auth);
  return async () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
          {
            grant: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            programme: {
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
            demandeur: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            reference: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            type: {
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
    if (validate("Logistiques BCI", "RM")) {
      args.where = {
        ...args.where,
        demandeur: user?.employeeId,
      };
    }
    await dispatch(getBonCommandeInternes({ args }));
  };
};

export default useFetchBonCommandeInterne;
