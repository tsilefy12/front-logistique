import { useRouter } from "next/router";
import { getLocationtList } from "../../../../redux/features/location/locationSlice";
import { useAppDispatch } from "../../../../hooks/reduxHooks";

const useFetchLocationDeTransport = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [
          {
            responsable: {
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
    dispatch(getLocationtList({ args }));
  };
};

export default useFetchLocationDeTransport;
