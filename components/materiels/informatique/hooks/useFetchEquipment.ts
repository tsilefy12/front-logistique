import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/reduxHooks";
import { getEquipments } from "../../../../redux/features/equipment";

const useFetchEquipment = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {
      include: {
        type: true,
        // employee: true,
      },
    };

    if (router.query.search) {
      console.log("search", router.query.search);
      // implement here the search logic
      // args.where = {
      // };
      args.where = {
        OR: [
          {
            type: {
              type: {
                contains: router.query.search,
                mode: "insensitive",
              },
            },
          },
          {
            numOptim: {
              contains: router.query.search,
                mode: "insensitive",
            },
          },
          {
            designation: {
              contains: router.query.search,
                mode: "insensitive",
            },
          },
        ],
      };
    }
    if (router.query.orderBy && router.query.order) {
      switch (router.query.orderBy) {
        case "num_optim":
          args.orderBy = {
            numOptim: 
              router.query.order,
          };
          break;
        default:
          args.orderBy = {
            [<string>router.query.orderBy]: router.query.order,
          };
          break;
      }
    }
    
    await dispatch(getEquipments({ args }));
  };
};

export default useFetchEquipment;
