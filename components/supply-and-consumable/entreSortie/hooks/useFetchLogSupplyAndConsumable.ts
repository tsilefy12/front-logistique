import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getLogSuplyAndConsumableListe } from "../../../../redux/features/logSuplyAndConsumable";

const useFetchLogSuplyAndConsumableList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        // OR: [
        //   {
        //     OperationType: {
        //       contains: router.query.search,
        //       mode: "insensitive",
        //     },
        //   },
        // ],
      };
    }

    if (router.query.orderBy && router.query.order) {
      switch (router.query.orderBy) {
        default:
          args.orderBy = {
            [<string>router.query.orderBy]: router.query.order,
          };
          break;
      }
    }
    dispatch(getLogSuplyAndConsumableListe({ args }));
  };
};

export default useFetchLogSuplyAndConsumableList;
