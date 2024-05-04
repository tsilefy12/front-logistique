import React, { useEffect } from "react";
import Container from "@mui/material/Container";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ArrowBack, Edit } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import {
  deleteHolder,
  editHolder,
  getHolder,
} from "../../../../redux/features/holder";
import CardGeneral from "./CardGeneral";
import { getEmployees } from "../../../../redux/features/employeStagiaire/employeeSlice";
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";

const Details = () => {
  const router = useRouter();
  const { id }: any = router.query;

  const dispatch: any = useAppDispatch();

  const { holder } = useAppSelector((state: any) => state.holder);
  
  const confirm = useConfirm();

  useEffect(() => {
    if (id) {
      dispatch(getHolder({ id, args:{
        include:{
          holderEquipment:{
            include:{
              equipment:true
            }
          }
        }
      }}));
    }
  }, [router.query]);

  const handleClickDelete = async () => {
    confirm({
      title: "Supprimer Detenteur",
      description: "Voulez-vous vraiment supprimer cet detenteur ?",
      cancellationText: "Annuler",
      confirmationText: "Supprimer",
      cancellationButtonProps: {
        color: "warning",
      },
      confirmationButtonProps: {
        color: "error",
      },
    })
      .then(async () => {
        await dispatch(deleteHolder({ id }));
        router.push(`/materiels/detenteur`);
      })
      .catch(() => {
        console.log("cancelled");
      });
  };
  const handleClickEdit = async (id: any) => {
    await dispatch(editHolder({ id }));
    router.push(`/materiels/detenteur/${id}/edit`);
};
  return (
    <DetailStagiaireWrapper maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation>
          <Stack flexDirection={"row"}>
            <Button color="info" variant="text" onClick={() => router.back()} startIcon={<ArrowBack />}>
              Retour
            </Button>
              <Button
                variant="text"
                color="primary"
                size="small"
                startIcon={<Edit />}
                sx={{ marginInline: 3 }}
                onClick={() =>handleClickEdit(id)}
              >
                Modifier
              </Button>
            <Button
              variant="text"
              color="warning"
              startIcon={<DeleteForever />}
              onClick={() => handleClickDelete()}
            >
              Supprimer
            </Button>
          </Stack>
          <Typography variant="h4">Détail Detenteur</Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>

      <Grid container spacing={4} pb={5}>
        <Grid item xs={12} md={9}>
          <CardGeneral holder={holder} />
        </Grid>
      </Grid>
    </DetailStagiaireWrapper>
  );
};

export default Details;

const DetailStagiaireWrapper = styled(Container)(({ theme }) => ({
  borderRadius: "20px",
  marginBottom: theme.spacing(2),
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "5px",
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
}));

export const BorderProfile = styled("span")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 25,
  width: 200,
  height: 200,
  borderRadius: "50%",
  border: "1px dashed #E0E0E0",
}));

const ProfileSection = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // marginBlock: 25,
  background: "#fff",
  paddingBlock: theme.spacing(3),
  borderRadius: "20px",
}));
