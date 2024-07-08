import React from "react";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { TableLoading } from "../../../shared/loading";
import { debounce } from "lodash";

const TransportEquipmentTableToolbar  = ({filtre , setFiltre} : any) => {
  const { loading } = useAppSelector(
    (state) => state.transportationEquipment
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
            Liste des materiels de transport
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

export default TransportEquipmentTableToolbar;
