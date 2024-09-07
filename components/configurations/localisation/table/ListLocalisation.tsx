import React from "react";
import {
  Box,
  Paper,
  styled,
  Stack,
  Container,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import useFetchLocalisationList from "../hooks/useFetchUniteStock";
import {
  deleteLocalisation,
  editLocalisation,
} from "../../../../redux/features/configuration/localisationSlice";
import { cancelEdit } from "../../../../redux/features/location/locationSlice";
import { LocalisationItem } from "../../../../redux/features/configuration/localisation.interface";

const ListeLocalisation = () => {
  const fetchLocalisationList = useFetchLocalisationList();
  const { localisations } = useAppSelector((state) => state.localisation);
  const router = useRouter();

  const confirm = useConfirm();
  const dispatch: any = useAppDispatch();

  React.useEffect(() => {
    fetchLocalisationList();
  }, []);

  const handleClickEdit = async (id: any) => {
    await dispatch(editLocalisation({ id }));
  };

  const handleclickDelete = async (id: any) => {
    dispatch(cancelEdit());
    confirm({
      title: "Supprimer cette localisation",
      description: "Voulez-vous vraiment supprimer cette localisation ?",
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
        await dispatch(deleteLocalisation({ id }));
        fetchLocalisationList();
      })
      .catch(() => {});
  };

  return (
    <TableSection>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <Stack
            direction="row"
            sx={{
              flex: "1 1 100%",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" id="tableTitle" component="div">
              Liste des localisations
            </Typography>
            <TextField
              variant="outlined"
              id="search"
              name="search"
              placeholder="Recherche"
              size="small"
              sx={{ padding: "20px" }}
            />
          </Stack>
          {localisations.length > 0 ? (
            localisations.map((row: LocalisationItem, index: any) => {
              return (
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    flex: "1 1 100%",
                    justifyContent: "space-around",
                    alignItems: "center",
                    padding: "4px",
                    width: "100%",
                  }}
                >
                  <Container>
                    <FormLabel sx={{ padding: "10" }}>
                      {row.localisation}
                    </FormLabel>
                  </Container>
                  <IconButton
                    color="primary"
                    aria-label="Modifier"
                    component="span"
                    onClick={() => handleClickEdit(row.id)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="warning"
                    aria-label="Supprimer"
                    component="span"
                    onClick={() => handleclickDelete(row.id)}
                  >
                    <Delete />
                  </IconButton>
                </Stack>
              );
            })
          ) : (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                flex: "1 1 100%",
                justifyContent: "space-around",
                alignItems: "center",
                padding: "4px",
                width: "100%",
              }}
            >
              <Container>
                <FormLabel sx={{ padding: "10" }}> Rien à aficher</FormLabel>
              </Container>
            </Stack>
          )}
        </Paper>
      </Box>
    </TableSection>
  );
};

const TableSection = styled("div")(({ theme }) => ({
  paddingBlock: theme.spacing(2),
  paddingLeft: theme.spacing(2),
}));

export default ListeLocalisation;
