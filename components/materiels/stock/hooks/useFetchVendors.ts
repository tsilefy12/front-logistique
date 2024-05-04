import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getTypeEquipmentList } from "../../../../redux/features/typeEquipment";

const useFetchEquipmentStock = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {
      include : {
        equipments :true
      }
    };
    if (router.query.search) {
      args.where = {
        OR: [
          {
            type: {
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
          //   phone: {
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
          //   website: {
          //     contains: router.query.search,
          //     mode: "insensitive",
          //   },
          // },
        ],
      };
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
    await dispatch(getTypeEquipmentList({ args }));
  };
};

export default useFetchEquipmentStock;
