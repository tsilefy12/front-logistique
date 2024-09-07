import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getLocalisations } from "../../../../redux/features/configuration/useCase/localisation/getLocalisation";

/**
 * @description Hook to fetch employees
 */
const useFetchLocalisationList = () => {
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
    await dispatch(getLocalisations({ args }));
  };
};

export default useFetchLocalisationList;
