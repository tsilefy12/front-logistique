import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/reduxHooks";
import { getTransportationEquipments } from "../../../redux/features/transportation_equipment";

const useFetchTransportationEquipments = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {
            include: {
                vendor: true
            }
        };
        if (router.query.search) {
            args.where = {
                OR : [
                    {
                        registration: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    }, 
                    {
                        type: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    }, 
                    {
                        brand: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    }, 
                    {
                        otherInformation: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },         
                ],
            }      
        }

        if (router.query.orderBy && router.query.order) {
            switch (router.query.orderBy) {
                case "registration":
                    args.orderBy = {
                        registration: router.query.order
                    };
                    break;
      
                case "type":
                    args.orderBy = {
                        type:router.query.order
                    };
                    break;

                case "brand":
                    args.orderBy = {
                        brand: router.query.order
                    };
                    break;
                
                case "otherInformation":
                    args.orderBy = {
                        otherInformation: router.query.order
                    };
                    break;
      
              default:
                args.orderBy = {
                  [<string>router.query.orderBy]: router.query.order,
                };
                break;
            }
          }
        await dispatch(getTransportationEquipments({ args }));
    };
};

export default useFetchTransportationEquipments;
