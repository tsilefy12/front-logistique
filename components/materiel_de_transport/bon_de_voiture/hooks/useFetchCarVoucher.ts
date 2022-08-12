import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getCarVouchers } from "../../../../redux/features/car-voucher";
// import {
//   useAppDispatch,
//   useAppSelector,
// } from "../../../hooks/reduxHooks";


const useFetchCarVouchers = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    return async () => {
        let args: any = {};
        if (router.query.search) {
            args.where = {
                OR : [
                    {
                        number: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    }, 
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
                ],
            }      
        }

        if (router.query.orderBy && router.query.order) {
            switch (router.query.orderBy) {
                case "number":
                    args.orderBy = {
                        number: router.query.order
                    };
                    break;
      
                case "registration":
                    args.orderBy = {
                        registration:router.query.order
                    };
                    break;

                case "type":
                    args.orderBy = {
                        type: router.query.order
                    };
                    break;
                
      
              default:
                args.orderBy = {
                  [<string>router.query.orderBy]: router.query.order,
                };
                break;
            }
          }
        await dispatch(getCarVouchers({ args }));
    };
};

export default useFetchCarVouchers;
