import { useRouter } from "next/router";
import { useEffect } from "react";
import { editLocation } from "../../../../../redux/features/location/locationSlice";
import FormLocation from "../../add/formLocation";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";

const EditLocationDeTransport = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
      getLocationDeTransport(router.query.id as string);
    }
  }, [router.query]);

  const getLocationDeTransport = async (id: string) => {
    await dispatch(editLocation({ id }));
  };
  return <FormLocation/>;
};

export default EditLocationDeTransport;