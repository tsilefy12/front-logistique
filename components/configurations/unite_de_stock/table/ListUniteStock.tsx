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
import { uniteStockItem } from "../../../../redux/features/configuration/uniteStock.interface";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import useFetchUniteStockList from "../hooks/useFetchUniteStock";
import { useConfirm } from "material-ui-confirm";
import {
  deleteUniteDeStock,
  editUniteDeStock,
  cancelEdit,
} from "../../../../redux/features/configuration/uniteStockSlice";

const ListeUniteStock = () => {
  const { uniteStocks } = useAppSelector((state) => state.uniteStock);
  const fetchUniteStockList = useFetchUniteStockList();
  const router = useRouter();

  const confirm = useConfirm();
  const dispatch: any = useAppDispatch();

  const handleClickEdit = async (id: any) => {
    await dispatch(editUniteDeStock({ id }));
  };

  const handleclickDelete = async (id: any) => {
    dispatch(cancelEdit());
    confirm({
      title: "Supprimer ce unite de stock",
      description: "Voulez-vous vraiment supprimer ce unite de stock ?",
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
        await dispatch(deleteUniteDeStock({ id }));
        fetchUniteStockList();
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    fetchUniteStockList();
  }, [router.query]);
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
              Liste des unités de stock
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
          {uniteStocks ? (
            uniteStocks.map((row: uniteStockItem, index: any) => {
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
                      {row.uniteStock}
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

export default ListeUniteStock;
