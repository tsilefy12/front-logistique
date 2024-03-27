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
            materiel: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            responsable: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            referenceBudgetaire: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            prestataire: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            nif: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            stat: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            grant: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            ligneBudgetaire: {
              contains: router.query.search,
              mode: "insensitive",
            },
          },
          {
            itineraire: {
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
