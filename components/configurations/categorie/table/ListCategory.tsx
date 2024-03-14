import React from "react";
import { Box, Paper, styled, Stack, Container, FormLabel, TextField, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Delete, Edit } from "@mui/icons-material";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { categorieStockItem } from "../../../../redux/features/configuration/categorie.interface";
import useFetchCategorieList from "../hooks/useFetchCategorie";
import { useRouter } from "next/router";

const ListCategorie = () => {
    const { categorieStocks } = useAppSelector((state) => state.categorieStock);
    const fetchCategorieList = useFetchCategorieList();
    const router = useRouter();
    React.useEffect(() => {
        fetchCategorieList();
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
                            Liste des categories
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
                    {categorieStocks
                    .map((row: categorieStockItem, index: any) => {
                      return (
                        <Stack direction="row" spacing={2} sx={{
                                flex: "1 1 100%",
                                justifyContent: "space-around",
                                alignItems: "center",
                                padding: "4px",
                                width: "100%"
                            }} >
                            <Container>
                                <FormLabel sx={{ padding: "10" }} >{row.categorieStock}</FormLabel>
                            </Container>
                            <IconButton
                                color="accent"
                                aria-label="Modifier"
                                component="span"
                                size="small"
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                color="secondary"
                                aria-label="Supprimer"
                                component="span"
                                size="small"
                            >
                                <Delete />
                            </IconButton>
                        </Stack> );
                    })}
                </Paper>
            </Box>
        </TableSection>
    );
};

const TableSection = styled("div")(({ theme }) => ({
    paddingBlock: theme.spacing(2),
    paddingLeft: theme.spacing(2),
}));

export default ListCategorie;
