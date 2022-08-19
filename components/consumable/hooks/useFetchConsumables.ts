import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getConsumables } from "../../../redux/features/consummable";

const useFetchConsumables = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
          {
            item:{
              contains: router.query.search,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    if (router.query.orderBy && router.query.order) {
      switch (router.query.orderBy) {
        case "Article":
          args.orderBy = {
            item: router.query.order,
          };
          break;

        case "Demandeur":
          args.orderBy = {
            applicantId: router.query.order,
          };
          break;

        case "Quantité démandée":
          args.orderBy = {
            requestedQuantity: router.query.order,
          };
          break;

        case "Quantité livrée":
          args.orderBy = {
            deliveredQuantity: router.query.order,
          };
          break;

        case "Date de livraison":
          args.orderBy = {
            deliveryDate: router.query.order,
          };
          break;

        default:
          args.orderBy = {
            [<string>router.query.orderBy]: router.query.order,
          };
          break;
      }
    }
    await dispatch(getConsumables({ args }));
  };
};

export default useFetchConsumables;
