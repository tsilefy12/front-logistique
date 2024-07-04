import React, { useEffect, useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import { Stack, TextField, Typography } from "@mui/material";
import { useAppSelector } from "../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import { debounce } from "lodash";
import { TableLoading } from "../../../../shared/loading";

const TypeEquipmentTableToolbar = ({filtre , setFiltre} : any) => {
  const { loading } = useAppSelector((state) => state.typeEquipment);
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
            Liste des types de materiels
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

export default TypeEquipmentTableToolbar;
