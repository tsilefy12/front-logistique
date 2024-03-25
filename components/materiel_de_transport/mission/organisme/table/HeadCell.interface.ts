import { Order } from "../../../../../config/table.config";
import { MissionTranportItem } from "../../../../../redux/features/mission_transport/missionTransport.interface";


export interface HeadCell {
  disablePadding: boolean;
  id: any;
  label: string;
  numeric: boolean;
}

export interface MissionTransportEnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof MissionTranportItem
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}
