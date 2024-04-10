import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getLogSuplyAndConsumableListe } from "../../../../redux/features/logSuplyAndConsumable";

const useFetchLogSuplyAndConsumableList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {
      include:{
        supplyAndConsumable: true
      }
    };
    if (router.query.search) {
      args.where = {};
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
    args.include = {
      supplyAndConsumable: true,
    };
    dispatch(getLogSuplyAndConsumableListe({ args }));
  };
};

export default useFetchLogSuplyAndConsumableList;
