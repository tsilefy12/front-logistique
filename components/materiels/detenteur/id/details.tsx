import React from "react";
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

const Details = () => {
  const router = useRouter();

  //   const id: any = router.query.id;
  const { id }: any = router.query;
  //   console.log("list Id ", id);

  const dispatch: any = useAppDispatch();

  const { holder } = useAppSelector((state: any) => state.holder);

  const confirm = useConfirm();

  React.useEffect(() => {
    if (id) {
      const args: any = {};
      args.include = {
        // internshipType: true,
        // position: true,
      };
      dispatch(getHolder({ id, args }));
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

  return (
    <DetailStagiaireWrapper maxWidth="xl">
      <NavigationContainer>
        <SectionNavigation>
          <Stack flexDirection={"row"}>
            <Link href="/materiels/detenteur">
              <Button color="info" variant="text" startIcon={<ArrowBack />}>
                Retour
              </Button>
            </Link>
            <Link href={`/materiels/detenteur/${holder.id}/edit`}>
              <Button
                variant="text"
                color="primary"
                size="small"
                startIcon={<Edit />}
                sx={{ marginInline: 3 }}
                onClick={() => {
                  dispatch(editHolder({ id }));
                }}
              >
                Modifier
              </Button>
            </Link>

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
