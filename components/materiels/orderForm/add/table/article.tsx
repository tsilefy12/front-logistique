import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import EditToolbar from "./editToolBar";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
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
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../../config/table.config";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
// import {
//   createOffreFile,
//   editOffreFile,
//   updateOffreFile,
//   deleteOffreFile,
// } from "../../../../redux/features/offreFile";
// import { OffreFileItem } from "../../../../redux/features/offreFile/offreSliceFile.interface";
// import { cancelEdit } from "../../../../redux/features/offreFile/offreFileSlice";
import { useConfirm } from "material-ui-confirm";
import useFetchOrderFormItemListe from "./hooks/useFetchOrderFormItemListe";
import {
  createOrderFormItem,
  deleteOrderFormItem,
  editOrderFormItem,
  updateOrderFormItem,
} from "../../../../../redux/features/orderFormItem";
import { cancelEdit } from "../../../../../redux/features/orderFormItem/orderFormItemSlice";

export default function ListArticle() {
  const { orderFormItemListe, isEditing, orderFormItem } = useAppSelector(
    (state) => state.orderFormItem
  );
  const [rows, setRows] = React.useState(orderFormItemListe);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const refClickEdit: any = React.useRef(null);
  const router = useRouter();
  const bonDeCommandeId: any = router.query.id;
  const fetchOrderFormListe = useFetchOrderFormItemListe();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  React.useEffect(() => {
    fetchOrderFormListe();
    // console.log(orderFormItemListe);
  }, [router.query]);

  React.useEffect(() => {
    setRows(orderFormItemListe);
  }, [orderFormItemListe]);

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

  const handleEditClick = (idRow: GridRowId) => {
    // console.log(id);
    const id: any = idRow;
    dispatch(editOrderFormItem({ id }));
    setRowModesModel({
      ...rowModesModel,
      [idRow]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = async (id: GridRowId, value: any) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    // console.log(value);
  };
  React.useEffect(() => {
    if (rows.length > orderFormItemListe.length) {
      addOrderFormItem();
    }
  }, [rows]);

  const addOrderFormItem = async () => {
    const lastIndex = orderFormItemListe.length;
    if (rows[lastIndex].isNew === false) {
      try {
        await dispatch(
          createOrderFormItem({
            designation: rows[rows.length - 1].designation,
            quantity: rows[rows.length - 1].quantity,
            unitPrice: rows[rows.length - 1].unitPrice,
            SKU: rows[rows.length - 1].SKU,
            orderFormId: bonDeCommandeId,
          })
        );
        fetchOrderFormListe();
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const handleDeleteClick = (id: GridRowId) => () => {
    // setRows(rows.filter((row: any) => row.id !== id));
    handleclickDelete(id);
  };
  const handleclickDelete = async (id: any) => {
    confirm({
      title: "Supprimer fichier",
      description: "Voulez-vous vraiment supprimer cette Article ?",
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
        await dispatch(deleteOrderFormItem({ id }));
        fetchOrderFormListe();
      })
      .catch(() => {});
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row: any) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row: any) => row.id !== id));
    }
    dispatch(cancelEdit());
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    // console.log("edit");

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    if (isEditing) {
      // console.log(newRow);
      const value: any = newRow;
      try {
        dispatch(
          updateOrderFormItem({
            id: orderFormItem.id,
            orderFormItem: {
              designation: value.designation,
              quantity: value.quantity,
              unitPrice: value.unitPrice,
              SKU: value.SKU,
              orderFormId: bonDeCommandeId,
            },
          })
        );
        fetchOrderFormListe();
      } catch (error) {
        console.log("error", error);
      }
    }
    return updatedRow;
  };

  function getId(params: any) {
    return `${params.row.id || ""}`;
  }

  const columns: GridColumns = [
    {
      field: "designation",
      headerName: "Designation",
      editable: true,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "quantity",
      headerName: "Quantite",
      type: "number",
      editable: true,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "unitPrice",
      headerName: "Prix unitaire",
      type: "number",
      editable: true,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "SKU",
      headerName: "Unite Gestion De Stock",
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
      width: 100,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key={`${id}-save`}
              icon={<CheckIcon color="info" />}
              label="Save"
              onClick={() => handleSaveClick(id, row)}
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
            icon={<EditIcon color="primary" />}
            label="Edit"
            className="textPrimary"
            ref={refClickEdit}
            onClick={() => handleEditClick(id)}
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
        Article
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
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="right"
        my={2}
      >
        <MyBoutton variant="text">
          <AttachFileIcon />
          Charger un pJ (TDR)
        </MyBoutton>
      </Stack>
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
