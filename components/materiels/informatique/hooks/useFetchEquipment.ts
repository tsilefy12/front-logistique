import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/reduxHooks";
import { getEquipments } from "../../../../redux/features/equipment";

const useFetchEquipment = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { linkedEmployee } = useAppSelector((state) => state.auth);

  return async () => {
    let args: any = {
      include: {
        program: true,
        workplace: true,
      },
    };

    args.where = {
      employee: {
        id: {
          equals: linkedEmployee?.id,
        },
      },
    };

    if (router.query.search) {
      console.log("search", router.query.search);
      args.where = {
        AND: [
          {
            employee: {
              id: {
                equals: linkedEmployee?.id,
              },
            },
          },
          {
            OR: [
              {
                actinumOptimvity: {
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
              {
                additionalInformation: {
                  contains: router.query.search,
                  mode: "insensitive",
                },
              },
              {
                status: {
                  contains: router.query.search,
                  mode: "insensitive",
                },
              },
              {
                typeEquipmentId: {
                  contains: router.query.search,
                  mode: "insensitive",
                },
              },
              {
                imageUrl: {
                  contains: router.query.search,
                  mode: "insensitive",
                },
              },
            ],
          },
        ],
      };
    }

    await dispatch(getEquipments({ args }));
  };
};

export default useFetchEquipment;
