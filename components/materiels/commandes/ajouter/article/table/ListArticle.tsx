import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
import { useRouter } from "next/router";
import { useConfirm } from "material-ui-confirm";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../../hooks/reduxHooks";
// import useFetchOfferOrderListe from "./hooks/useFetchOfferOrder";
import EditToolbar from "./EditToolbar";
import {
  createOfferOrder,
  deleteOfferOrder,
  editOfferOrder,
  updateOfferOrder,
} from "../../../../../../redux/features/OfferOrder";
import AddIcon from "@mui/icons-material/Add";
import { cancelEdit } from "../../../../../../redux/features/OfferOrder/offerOrderSlice";
import {
  defaultLabelDisplayedRows,
  labelRowsPerPage,
} from "../../../../../../config/table.config";
import Link from "next/link";
import useFetchOfferOrderItemListe from "./hooks/useFetchOfferOrderItem";
import {
  createOfferOrderItem,
  deleteOfferOrderItem,
  editOfferOrderItem,
  updateOfferOrderItem,
} from "../../../../../../redux/features/offerOrderItem";

export default function ListArticleOffre() {
  const { isEditing, offerOrderItem, offerOrderItemListe } = useAppSelector(
    (state) => state.offerOrderItem
  );
  const [rows, setRows] = React.useState(offerOrderItemListe);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const refClickEdit: any = React.useRef(null);
  // const refBtnArticle: any = React.useRef(null);
  const router = useRouter();
  // const commandeId: any = router.query.commandId;
  const offerId: any = router.query.id;
  const fetchOfferOrderItemList = useFetchOfferOrderItemListe();
  const dispatch = useAppDispatch();
  const confirm = useConfirm();

  React.useEffect(() => {
    fetchOfferOrderItemList();
  }, [router.query]);

  React.useEffect(() => {
    setRows(offerOrderItemListe);
  }, [offerOrderItemListe]);

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

    const id: any = idRow;
    dispatch(editOfferOrderItem({ id }));
    setRowModesModel({
      ...rowModesModel,
      [idRow]: { mode: GridRowModes.Edit },
    });
  };

  const handleSaveClick = async (id: GridRowId, value: any) => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

  };
  React.useEffect(() => {
    if (rows.length > offerOrderItemListe.length) {
      addOfferOrderItem();
    }
  }, [rows]);

  const addOfferOrderItem = async () => {
    const lastIndex = offerOrderItemListe.length;
    if (rows[lastIndex].isNew === false) {
      try {
        await dispatch(
          createOfferOrderItem({
            designation: rows[rows.length - 1].designation,
            quantity: rows[rows.length - 1].quantity,
            unitPrice: rows[rows.length - 1].unitPrice,
            otherInformation: rows[rows.length - 1].otherInformation,
            SKU: rows[rows.length - 1].SKU,
            offerOrderId: offerId,
          })
        );
        fetchOfferOrderItemList();
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
        await dispatch(deleteOfferOrderItem({ id }));
        fetchOfferOrderItemList();
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
    
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row: any) => (row.id === newRow.id ? updatedRow : row)));
    if (isEditing) {
      const value: any = newRow;
      try {
        dispatch(
          updateOfferOrderItem({
            id: offerOrderItem.id,
            offerOrderItem: {
              designation: value.designation,
              quantity: value.quantity,
              unitPrice: value.unitPrice,
              SKU: value.SKU,
              otherInformation: value.otherInformation,
              offerOrderId: offerId,
            },
          })
        );
        fetchOfferOrderItemList();
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
      headerName: "Quantité",
      editable: true,
      flex: 1,
      align: "left",
      headerAlign: "left",
      type: "number",
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
      field: "otherInformation",
      headerName: "Autre information",
      editable: true,
      type: "text",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    // {
    //   field: "vat",
    //   headerName: "TVA",
    //   editable: true,
    //   flex: 1,
    //   align: "left",
    //   headerAlign: "left",
    // },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 200,
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
