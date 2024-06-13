import { useRouter } from "next/router";
import { usePermitted } from "../../../../config/middleware";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getBonCommandeExternes } from "../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";

/**
 * @description Hook to fetch employees
 */
const useFetchBonCommandeExterne = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const validate = usePermitted();
  return async () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
          {
            ref: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            modePaiement: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            conditionLivraison: {
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
          {
            demandeur: {
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
    if (validate("Logistiques BCE", "RM")) {
      args.where = {
        ...args.where,
        demandeur: user?.employeeId,
      };
    }
    await dispatch(getBonCommandeExternes({ args }));
  };
};

export default useFetchBonCommandeExterne;
