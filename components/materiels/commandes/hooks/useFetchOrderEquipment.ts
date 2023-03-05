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
        ],
      };
    }
    if (router.query.orderBy && router.query.order) {
      switch (router.query.orderBy) {
        case "Designation":
          args.orderBy = {
            designation: router.query.order,
          };
          break;

        case "Raison":
          args.orderBy = {
            reason: router.query.order,
          };
          break;

        case "deadline de Reception":
          args.orderBy = {
            deadlineOfReception: router.query.order,
          };
          break;

        case "Demandeur":
          args.orderBy = {
            applicantId: router.query.order,
          };
          break;

        case "Status":
          args.orderBy = {
            status: router.query.order,
          };
          break;

        default:
          args.orderBy = {
            [<string>router.query.orderBy]: router.query.order,
          };
          break;
      }
    }
    dispatch(getOrderEquipmentList({ args }));
  };
};

export default useFetchOrderEquipement;
