import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { editConsumptionInvoice } from "../../../../../redux/features/consumption_invoice";
import FormFactureConsommation from "../../creer";



const EditFactureConsommation = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (router.query.id) {
            getConsumptionInvoice(router.query.id as string);
        }
    }, [router.query]);

    const getConsumptionInvoice = async (id: string) => {
        await dispatch(editConsumptionInvoice({ id }));
    };
    return <FormFactureConsommation></FormFactureConsommation>;
}

export default EditFactureConsommation;