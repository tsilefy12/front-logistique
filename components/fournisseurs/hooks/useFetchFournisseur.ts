import { useRouter } from "next/router";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { getFournisseurList } from "../../../redux/features/fournisseur";

const useFetchFournisseur = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
          {
            name: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          // {
          //   address: {
          //     contains: router.query.search,
          //     mode: "insensitive",
          //   },
          // },
          // {
          //   email: {
          //     contains: router.query.search,
          //     mode: "insensitive",
          //   },
          // },
          // {
          //   phone: {
          //     contains: router.query.search,
          //     mode: "insensitive",
          //   },
          // },
          // {
          //   website: {
          //     contains: router.query.search,
          //     mode: "insensitive",
          //   },
          // },
        ],
      };
    }
    if (router.query.orderBy && router.query.order) {
      args.orderBy = {
        [<string>router.query.orderBy]: router.query.order,
      };
    }
    dispatch(getFournisseurList({ args }));
  };
};

export default useFetchFournisseur;
