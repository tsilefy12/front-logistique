
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
        let args: any = {
            include:{
                transportationEquipment: true,
            }
        };
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
                        date: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                    {
                        montantTotal: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },
                ],
            }
        }

        if (router.query.orderBy && router.query.order) {
            switch (router.query.orderBy) {
                case "materiel":
                    args.orderBy = {
                        materiel: router.query.order
                    };
                    break;

                case "date":
                    args.orderBy = {
                        date: router.query.order
                    };
                    break;

                case "montantTotal":
                    args.orderBy = {
                        montantTotal: router.query.order
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
