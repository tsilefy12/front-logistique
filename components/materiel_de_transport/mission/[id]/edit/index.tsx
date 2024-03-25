import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch } from "../../../../../hooks/reduxHooks";
import FormMission from "../../add/formMission";
import { editMissionDeTransport } from "../../../../../redux/features/mission_transport/missionTransportSlice";

const EditMissionDeTransport = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (router.query.id) {
        getMissionDeTransport(router.query.id as string);
    }
  }, [router.query]);

  const getMissionDeTransport = async (id: string) => {
    await dispatch(editMissionDeTransport({ id }));
  };
  return <FormMission></FormMission>;
};

export default EditMissionDeTransport;