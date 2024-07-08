import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { useAppSelector } from "../../../../../hooks/reduxHooks";
import { TableLoading } from "../../../../shared/loading";


const LocationDeTransportTableToolbar = ({filtre , setFiltre} : any) => {
  const { loading } = useAppSelector(
    (state) => state.locationDeTransport
  );

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
            alignItems: "center",
          }}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            Liste de location externe
          </Typography>
          <TextField
						variant="outlined"
						id="search"
						name="search"
						placeholder="Recherche"
						size="small"
						value={filtre}
						onChange={(e)=> setFiltre(e.target.value)}
					/>
        </Stack>
      </Toolbar>
      {loading && <TableLoading />}
    </>
  );
};

export default LocationDeTransportTableToolbar;
