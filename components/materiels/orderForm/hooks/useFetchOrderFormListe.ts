import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getOrderFormListe } from "../../../../redux/features/order-form";



const useFetchOrderFormListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
          {
            reference: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
        ]
      };
    }

    if (router.query.orderBy && router.query.order) {
      switch (router.query.orderBy) {
        // case "registration":
        //   args.orderBy = {
        //     name: router.query.order,
        //   };
        //   break;

        default:
          args.orderBy = {
            [<string>router.query.orderBy]: router.query.order,
          };
          break;
      }
    }
    args.include = {
      vendor:true,
    };
    await dispatch(getOrderFormListe({ args }));
  };
};

export default useFetchOrderFormListe;
