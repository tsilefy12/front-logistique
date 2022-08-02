import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getTypeEquipmentList } from "../../../../redux/features/typeEquipment";

const useFetchTypeEquipment = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
          {
            type: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            prefix: {
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
    dispatch(getTypeEquipmentList({ args }));
  };
};

export default useFetchTypeEquipment;
