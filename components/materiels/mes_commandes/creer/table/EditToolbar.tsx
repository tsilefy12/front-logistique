import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { initialRows } from "./constante";

import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  GridToolbarContainer,
} from "@mui/x-data-grid";

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel
    ) => void;
}

export default function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;
    var id = initialRows.length;
    const handleClick = () => {
        id = id + 1;
        setRows((oldRows) => [
        ...oldRows,
        { id, designation: "", quantite: 0,prix_unitaire: 0,isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: "designation" },
        }));
    };

    return (
        <GridToolbarContainer>
        <Button color="info" startIcon={<AddIcon />} onClick={handleClick}>
            Ajouter article
        </Button>
        </GridToolbarContainer>
    );
}