import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getHolderListe } from "../../../../redux/features/holder";

const useFetchDetenteurListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
    let searchParams = router.query.search;
    let filterParams = router.query.filter;
    args.orderBy = {
      id: "desc",
    };
    if (router.query.filter && router.query.search) {
      args.where = {
        AND: [
          {
            function: {
              name: { contains: filterParams, mode: "insensitive" },
            },
          },
          {
            OR: [
              {
                lastName: { contains: searchParams, mode: "insensitive" },
              },
              {
                firstName: {
                  contains: searchParams,
                  mode: "insensitive",
                },
              },
              {
                matricule: {
                  contains: searchParams,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      };
    } else if (
      router.query.search &&
      (router.query.filter === undefined || router.query.filter === "")
    ) {
      args.where = {
        OR: [
          { lastName: { contains: searchParams, mode: "insensitive" } },
          {
            firstName: {
              contains: searchParams,
              mode: "insensitive",
            },
          },
          { matricule: { contains: searchParams, mode: "insensitive" } },
          {
            function: {
              name: { contains: searchParams, mode: "insensitive" },
            },
          },
        ],
      };
    } else if (
      router.query.filter &&
      (router.query.search === undefined || router.query.search === "")
    ) {
      args.where = {
        function: {
          name: { contains: filterParams, mode: "insensitive" },
        },
      };
    }
    if (router.query.orderBy && router.query.order) {
      args.orderBy = { [<string>router.query.orderBy]: router.query.order };
    }
    // args.include = {
    //   program: true,
    // };
    await dispatch(getHolderListe({ args }));
  };
};

export default useFetchDetenteurListe;
