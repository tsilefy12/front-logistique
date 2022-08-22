import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";
import { IconButton, styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { initialRows } from "./constante";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Link from "next/link";
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColumns,
  GridRowParams,
  MuiEvent,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  frFR,
} from "@mui/x-data-grid";
import { defaultLabelDisplayedRows, labelRowsPerPage } from "../../../../../../config/table.config";
import EditToolbar from "./EditToolbar";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";

export default function ListDocCandidature() {
  const [rows, setRows] = React.useState(initialRows);
  const router = useRouter();
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params: any,
    event: any
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row: any) => row.id !== id));
  };

  const handleClickAddArticle = async (id : any) => {
    router.push(`/materiels/commande/${id}/offre/article`);
  }

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  function getId(params: any) {
    return `${params.row.id || ""}`;
  }

  const columns: GridColumns = [
    {
      field: "numero",
      headerName: "Numéro",
      editable: true,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "societe",
      headerName: "Société",
      editable: true,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "num_proforma",
      headerName: "Num proforma",
      type: "text",
      editable: true,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
        field: "regime_tva",
        headerName: "Régime Tva",
        type: "text",
        editable: true,
        flex: 1,
        align: "left",
        headerAlign: "left",
    },
    {
        field: "tva",
        headerName: "Tva",
        type: "text",
        editable: true,
        flex: 1,
        align: "left",
        headerAlign: "left",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 200,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [

            <GridActionsCellItem
              key={`${id}-save`}
              icon={<CheckIcon color="info" />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key={`${id}-cancel`}
              icon={<CancelIcon color="warning" />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            key={`${id}-edit`}
            icon={<Link href="/materiels/commande/1/offre/article">
                    <Button variant="outlined" color="info">
                        <AddIcon />
                            Article
                    </Button>  
                </Link>}
            label="Article"
            color="inherit"
          />,
          <GridActionsCellItem
            key={`${id}-edit`}
            icon={<EditIcon color="primary" />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key={`${id}-delete`}
            icon={<DeleteIcon color="warning" />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <MyTableContainer>
      <Typography variant="h6" mb={1}>
        Offre
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        localeText={
          (frFR.components.MuiDataGrid.defaultProps.localeText || {},
          {
            columnMenuSortAsc: "Trier par ordre croissant",
            columnMenuSortDesc: "Trier par ordre décroissant",
            columnMenuUnsort: "Annuler le tri",
            columnMenuFilter: "Filtrer",
            columnMenuHideColumn: "Masquer la colonne",
            columnMenuShowColumns: "Afficher toutes les colonnes",
            footerRowSelected(count) {
              return `${count} ligne(s) sélectionnée(s)`;
            },
            MuiTablePagination: {
              labelRowsPerPage: labelRowsPerPage,
              labelDisplayedRows: defaultLabelDisplayedRows,
            },
          })
        }
      />
    </MyTableContainer>
  );
}

const MyTableContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  borderRadius: 20,
  background: "#fff",
  marginBottom: theme.spacing(5),
  height: 500,
  width: "100%",
}));

const MyBoutton = styled(Button)(({ theme }) => ({
  color: "#9E9E9E",
}));
