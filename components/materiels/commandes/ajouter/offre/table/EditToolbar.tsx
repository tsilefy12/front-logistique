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
import { useAppDispatch } from "../../../../../../hooks/reduxHooks";
import { cancelEdit } from "../../../../../../redux/features/OfferOrder/offerOrderSlice";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

export default function EditToolbar(props: EditToolbarProps) {
  const dispatch = useAppDispatch();
  const { setRows, setRowModesModel } = props;
  var id = initialRows.length;
  const handleClick = () => {
    id = new Date().getTime();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        number: "",
        paymentMethod: "",
        ProformaNumber: "",
        vatRegime: "",
        vat: "",
        vendorId: "",
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "number" },
    }));
    dispatch(cancelEdit());
  };

  return (
    <GridToolbarContainer>
      <Button color="info" startIcon={<AddIcon />} onClick={handleClick}>
        Ajouter entrée
      </Button>
    </GridToolbarContainer>
  );
}
