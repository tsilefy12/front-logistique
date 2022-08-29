import { useRouter } from "next/router";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { getDetenteurs } from "../../../../redux/features/detenteur";
// import {
//   useAppDispatch,
//   useAppSelector,
// } from "../../../hooks/reduxHooks";


const useFetchDetenteurs = () => {
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
                        surname: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    }, 
                    {
                        matricule: {
                            contains: router.query.search,
                            mode: "insensitive",
                        },
                    },          
                ],
            }      
        }
        if (router.query.orderBy && router.query.order) {
            args.orderBy = { [<string>router.query.orderBy]: router.query.order };
        }
        args.include = {
            program: true,
        }
        await dispatch(getDetenteurs({ args }));
    };
};

export default useFetchDetenteurs;
