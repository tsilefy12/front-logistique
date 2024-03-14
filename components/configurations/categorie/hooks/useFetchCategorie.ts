import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getCategories } from "../../../../redux/features/configuration/useCase/categorie/getCategories";

/**
 * @description Hook to fetch employees
 */
const useFetchCategorieList = () => {
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
    await dispatch(getCategories({ args }));
  };
};

export default useFetchCategorieList;
