import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getPassengerListe } from "../../../../redux/features/passenger";



const useFetchPassenger = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
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
        ],
      };
    }
    if (router.query.orderBy && router.query.order) {
      switch (router.query.orderBy) {
        case "Etat article":
          args.orderBy = {
            name: router.query.order,
          };
          break;

        default:
          args.orderBy = {
            [<string>router.query.orderBy]: router.query.order,
          };
          break;
      }
    }
    dispatch(getPassengerListe({ args }));
  };
};

export default useFetchPassenger;
