import React from "react";
import { alpha } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { EnhancedTableToolbarProps } from "./type-variable";
import { TextField, Stack, Typography } from "@mui/material";

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={{
        pl: { sm: 0 },
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
          Details d'un article
        </Typography>

        <TextField
          variant="outlined"
          id="search"
          name="search"
          placeholder="Recherche"
          size="small"
        />
      </Stack>
    </Toolbar>
  );
};

export default EnhancedTableToolbar;
