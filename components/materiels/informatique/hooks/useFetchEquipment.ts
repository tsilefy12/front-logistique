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
      },
    };

    if (router.query.search) {
      console.log("search", router.query.search);
      // implement here the search logic
      // args.where = {
      // };
    }

    await dispatch(getEquipments({ args }));
  };
};

export default useFetchEquipment;
