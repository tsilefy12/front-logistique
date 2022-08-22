import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Add from "@mui/icons-material/Add";
import Delete from "@mui/icons-material/Delete";
import Edit from "@mui/icons-material/Edit";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { useConfirm } from "material-ui-confirm";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { ArticlItem } from "../../redux/features/artikel/articl.interface";
import ArticleTableHeader from "./organism/table/ArticleTableHeader";
import {
  labelRowsPerPage,
  defaultLabelDisplayedRows,
} from "../shared/table/tableFeature";
import Visibility from "@mui/icons-material/Visibility";
import useFetchArticls from "./hooks/useFetchArticles";
import { deleteArticl } from "../../redux/features/artikel";
import ArticleTableToolbar from "./organism/table/ArticleTableToolbar";
import AddIcon from "@mui/icons-material/Add";

export default function ArticleList() {
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const router = useRouter();

  const confirm = useConfirm();

  const dispatch = useAppDispatch();

  const { articls } = useAppSelector((state) => state.articl);

  const fetchArticls = useFetchArticls();

  React.useEffect(() => {
    fetchArticls();
  }, [router.query]);

  const handleClickDetail = async (id: any) => {
    router.push(`/fournitures_et_consommables/article/${id}/details`);
  };

  // const handleClickEdit = async (id: any) => {
  // 	await dispatch(editVendor({ id }));
  // 	router.push(`/fournisseurs/${id}/edit`);
  // };

  const handleClickDelete = async (id: any) => {
    confirm({
      title: "Supprimer l'article",
      description: "Voulez-vous vraiment supprimer cet article ?",
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
        await dispatch(deleteArticl({ id }));
        fetchArticls();
      })
      .catch(() => {});
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - articls.length) : 0;

  return (
    <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
      <NavigationContainer>
        <SectionNavigation>
          <Link href={"/fournitures_et_consommables/article/ajouter"}>
            <Button variant="contained" startIcon={<Add />} size="small">
              Ajouter
            </Button>
          </Link>
          <Typography variant="h4"> Liste des Articles </Typography>
        </SectionNavigation>
        {/* <Divider /> */}
      </NavigationContainer>

      <SectionTable>
        <Box sx={{ width: "100%", mb: 2 }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <ArticleTableToolbar />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size="small"
              >
                <ArticleTableHeader />
                <TableBody>
                  {articls
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: ArticlItem | any, index) => {
                      const labelId = `enhanced-table-checkbox-${index}`;
                      return (
                        <TableRow hover tabIndex={-1} key={row.id}>
                          <TableCell component="th" id={labelId} align="left">
                            {row.designation}
                          </TableCell>

                          <TableCell align="left">{row.quantity}</TableCell>

                          <TableCell align="left">{row.unitPrice}</TableCell>

                          <TableCell align="left">{row.SKU}</TableCell>

                          {/* <TableCell align="left">
														{row.website}
													</TableCell> */}
                          <TableCell align="right" width={"150px"}>
                            <BtnActionContainer
                              direction="row"
                              justifyContent="right"
                            >
                              <Button
                                sx={{ mr: 1 }}
                                color="accent"
                                variant="outlined"
                                size="small"
                              >
                                <AddIcon />
                                Gerer
                              </Button>
                              <Link
                                href={`/fournitures_et_consommables/article/${row.id}/details`}
                              >
                                <IconButton
                                  color="accent"
                                  aria-label="Details"
                                  component="span"
                                  size="small"
                                >
                                  <Visibility />
                                </IconButton>
                              </Link>
                              <IconButton
                                color="warning"
                                aria-label="Supprimer"
                                component="span"
                                size="small"
                                onClick={() => {
                                  handleClickDelete(row.id);
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </BtnActionContainer>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={articls.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={labelRowsPerPage}
              labelDisplayedRows={defaultLabelDisplayedRows}
            />
          </Paper>
        </Box>
      </SectionTable>
    </Container>
  );
}

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: "16px",
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "5px",
}));

const BtnActionContainer = styled(Stack)(({ theme }) => ({}));
const SectionTable = styled("div")(({ theme }) => ({}));
