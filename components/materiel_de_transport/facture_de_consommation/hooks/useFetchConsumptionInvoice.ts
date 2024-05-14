import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getConsumptionInvoices } from "../../../../redux/features/consumption_invoice";


const useFetchConsumptionInvoice = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    //const { linkedEmployee } = useAppSelector((state) => state.auth);

    return async () => {
        let args: any = {};
          if (router.query.search) {
            args.where = {
              OR: [
                    {
                        invoiceNumber: {
                        contains: router.query.search,
                        mode: "insensitive",
                      },
                    },
                    {
                        reason: {
                        contains: router.query.search,
                        mode: "insensitive",
                      },
                    },
                    {
                        carVoucher: {
                          number: {
                            contains: router.query.search,
                            mode: "insensitive",
                          },
                        },
                    },
                  ],
                };
          }
      
          if (router.query.orderBy && router.query.order) {
            switch (router.query.orderBy) {
                case "invoiceNumber":
                    args.orderBy = {
                        invoiceNumber: router.query.order
                    };
                    break;
      
                case "reason":
                    args.orderBy = {
                        reason:router.query.order
                    };
                    break;

                case "carVoucher":
                    args.orderBy = {
                        carVoucher: {
                            number: router.query.order,
                        },
                    };
                    break;
      
              default:
                args.orderBy = {
                  [<string>router.query.orderBy]: router.query.order,
                };
                break;
            }
          }
          args.include = {
            carVoucher: true,
          }
        await dispatch(getConsumptionInvoices({ args }));
    };
};

export default useFetchConsumptionInvoice;
