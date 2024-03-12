import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { TableLoading } from "../../../shared/loading";
import { debounce } from "lodash";
import { styled } from "@mui/material";

const InventaireTableToolbar = () => {
  const { loading } = useAppSelector((state) => state.logSuplyAndConsumable);
  const [key, setKey] = React.useState<any>({
    filtreEntre: "",
    filtreSortie: "",
  });
  const router = useRouter();

  // console.log("entre", filtreEntre);
  // initialisation du champ de recherche
  React.useEffect(() => {
    if (router?.query?.search) {
      setKey(router.query.search);
    }
  }, [router.query.search]);

  const search = (key: string) => {
    const query = { ...router.query, search: key };
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  const debouncedSearch = React.useCallback(debounce(search, 300), [
    router.query,
  ]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    // const target = event.target;
    // const name = target.name;
    // const value = target.value;
    // setKey({ ...key, [name]: value });
    debouncedSearch(event.target.value);
  };

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Stack
          direction="row"
          sx={{
            flex: "1 1 100%",
            justifyContent: "space-between",
            alignItems: "center ",
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Liste Entre et Sortie
          </Typography>
          {/* <CustomStack
            direction={{ xs: "column", sm: "column", md: "row" }}
            spacing={{ xs: 2, sm: 2, md: 1 }}
          >
            <TextField
              fullWidth
              id="filtreEntre"
              variant="outlined"
              label="Entre"
              name="filtreEntre"
              value={key.filtreEntre}
              onChange={handleChange}
              size="small"
            />
            <TextField
              fullWidth
              id="filtreSortie"
              variant="outlined"
              label="Sortie"
              name="filtreSortie"
              onChange={handleChange}
              value={key.filtreSortie}
              size="small"
            />
          </CustomStack> */}
        </Stack>
      </Toolbar>
      {loading && <TableLoading />}
    </>
  );
};

export default InventaireTableToolbar;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexwrap: "wrap",
  },
}));
