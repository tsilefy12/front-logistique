// import {
//   useAppDispatch,
//   useAppSelector,
// } from "../../../../hooks/reduxHooks";
// import { getTimesheets } from "../../../../redux/features/timesheet";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { getVendors } from "../../../redux/features/vendor";

const useFetchVendors = () => {

  const router = useRouter();
  const dispatch = useAppDispatch();

      return async () => {
        let args: any = {};
        if (router.query.search) {
            args.where = {
                OR : [
                    {
                      name: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    }, 
                    {
                      address: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    }, 
                    {
                      phone: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                    {
                      email: {
                        contains: router.query.search,
                        mode: "insensitive",
                      }
                    },
                    {
                      website: {
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
                        name: router.query.order
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
            
          };
    await dispatch(getVendors({ args }));
  };
};

export default useFetchVendors;
