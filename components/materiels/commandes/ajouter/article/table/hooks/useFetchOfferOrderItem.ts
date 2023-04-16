import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../../../../hooks/reduxHooks";
import { getOfferOrderItemListe } from "../../../../../../../redux/features/offerOrderItem";

const useFetchOfferOrderItemListe = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { commandeId }: any = router.query;

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
    // if (id) {
    //   args.where = {
    //     fileId: {
    //       equals: +commandeId,
    //     },
    //   };
    // }
    await dispatch(getOfferOrderItemListe({ args }));
  };
};

export default useFetchOfferOrderItemListe;
