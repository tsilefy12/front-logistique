import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getSuplyAndConsumableList } from "../../../../redux/features/supply-and-consumable";

const useFetchSuplyAndConsumableList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
          {
            designation: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            SKU: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
        ],
      };
    }

    if (router.query.orderBy && router.query.order) {
      switch (router.query.orderBy) {
        case "designation":
          args.orderBy = {
            designation: router.query.order,
          };
          break;

        case "quantity":
          args.orderBy = {
            quantity: router.query.order,
          };
          break;

        case "unitPrice":
          args.orderBy = {
            unitPrice: router.query.order,
          };
          break;

        case "SKU":
          args.orderBy = {
            SKU: router.query.order,
          };
          break;

        default:
          args.orderBy = {
            [<string>router.query.orderBy]: router.query.order,
          };
          break;
      }
    }
    await dispatch(getSuplyAndConsumableList({ args }));
  };
};

export default useFetchSuplyAndConsumableList;
