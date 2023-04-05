import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getOrderEquipmentItemListe } from "../../../redux/features/OrderEquipmentItem";

const useFetchOrderEquipmentItemList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
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
      args.orderBy = {
        [<string>router.query.orderBy]: router.query.order,
      };
    }
    // args.include = {
    //   orderEquipment: true,
    // };
    dispatch(getOrderEquipmentItemListe({ args }));
  };
};

export default useFetchOrderEquipmentItemList;
