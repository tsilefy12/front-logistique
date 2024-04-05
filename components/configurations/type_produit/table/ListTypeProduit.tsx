import React from "react";
import { Box, Paper, styled, Stack, Container, FormLabel, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import { typeProduitItem } from "../../../../redux/features/configuration/typeProduit.interface";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useFetchTypeProduitList from "../hooks/useFetchTypeProduitList";
import { useRouter } from "next/router";
import { deleteTypeProduit, editTypeProduit } from "../../../../redux/features/configuration/typeProduitSlice";
import { useConfirm } from "material-ui-confirm";

const ListTypeProduit = () => {
     const { typeProduits } = useAppSelector((state) => state.typeProduit);
    const fetchTypeProduitList = useFetchTypeProduitList();
    const dispatch: any = useAppDispatch();
    const router = useRouter();
    const confirm = useConfirm();
   
    const handleClickEdit = async (id: any) => {
        await dispatch(editTypeProduit({ id }));
    };
    
    const handleclickDelete = async (id: any) => {
        confirm({
            title: "Supprimer ce Type de produit",
            description: "Voulez-vous vraiment supprimer ce type de produit ?",
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
            await dispatch(deleteTypeProduit({ id }));
            fetchTypeProduitList();
          })
          .catch(() => {});
    };

    React.useEffect(() => {
        fetchTypeProduitList();
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
                            alignItems: "center"
                        }}
                    >
                        <Typography variant="h6" id="tableTitle" component="div">
                            Liste type des produits
                        </Typography>
                        <TextField
                            variant="outlined"
                            id="search"
                            name="search"
                            placeholder="Recherche"
                            size="small"
                            sx={{  padding: "20px"}}
                        />
                    </Stack>
                    {typeProduits ? typeProduits
                    .map((row: typeProduitItem, index: any) => {
                      return (
                        <Stack direction="row" spacing={2} sx={{
                                flex: "1 1 100%",
                                justifyContent: "space-around",
                                alignItems: "center",
                                padding: "4px",
                                width: "100%"
                            }} >
                            <Container>
                                <FormLabel sx={{ padding: "10" }} >{row.typeProduct}</FormLabel>
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
                            </Stack> );
                    }):(<Stack direction="row" spacing={2} sx={{
                        flex: "1 1 100%",
                        justifyContent: "space-around",
                        alignItems: "center",
                        padding: "4px",
                        width: "100%"
                    }} >
                    <Container>
                        <FormLabel sx={{ padding: "10" }} > Rien à aficher</FormLabel>
                    </Container>
                    
                </Stack> )}
                </Paper>
            </Box>
        </TableSection>
    );
};

const TableSection = styled("div")(({ theme }) => ({
    paddingBlock: theme.spacing(2),
    paddingLeft: theme.spacing(2),
}));

export default ListTypeProduit;
