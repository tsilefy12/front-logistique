import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getInventaireListe } from "../../../redux/features/inventaire";

const useFetchInventaireList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
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
      inventaire: true,
    };
    dispatch(getInventaireListe({ args }));
  };
};

export default useFetchInventaireList;
