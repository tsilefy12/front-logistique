import { useRouter } from "next/router";
import { getOfferOrderListe } from "../../../../../../../redux/features/OfferOrder";
import { useAppDispatch } from "../../../../../../../hooks/reduxHooks";

const useFetchOfferOrderListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return async () => {
    let args: any = {};
    if (router.query.search) {
      args.where = {
        OR: [],
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
    await dispatch(getOfferOrderListe({ args }));
  };
};

export default useFetchOfferOrderListe;
