import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getHolderListe } from "../../../../redux/features/holder";

const useFetchDetenteurListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};

    if (router.query.search) {
      args.where = {
        OR: [
          {
            lastName: { contains: router.query.search, mode: "insensitive" },
          },
          {
            firstName: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            function: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
        ],
      };
    }
    if (router.query.orderBy && router.query.order) {
      args.orderBy = { [<string>router.query.orderBy]: router.query.order };
    }
    await dispatch(getHolderListe({ args }));
  };
};

export default useFetchDetenteurListe;
