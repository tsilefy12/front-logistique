import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getOrderEquipmentList } from "../../../../redux/features/orderEquipment";

const useFetchOrderEquipement = () => {
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
          {
            status: {
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
    dispatch(getOrderEquipmentList({ args }));
  };
};

export default useFetchOrderEquipement;
