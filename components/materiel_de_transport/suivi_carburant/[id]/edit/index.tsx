import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import { editSuiviCarburant } from "../../../../../redux/features/suivi_carburant/suiviCarburantSlice";
import FormSuiviCarburant from "../../add/formSuiviCarburant";

const EditSuiviCarburant = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
        getSuiviCarburant(router.query.id as string);
    }
  }, [router.query]);

  const getSuiviCarburant = async (id: string) => {
    await dispatch(editSuiviCarburant({ id }));
  };
  return <FormSuiviCarburant></FormSuiviCarburant>;
};

export default EditSuiviCarburant;