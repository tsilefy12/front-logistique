import Data, { Order } from "./type-variable";

export function createData(
  date: string,
  type: string,
  quantité: string,
  quantité_stocké:string,
  prix_Unitaire:string,
  valeur_stockée:string
): Data {
  return {
    date,
    type,
    quantité,
    quantité_stocké,
    prix_Unitaire,
    valeur_stockée
  };
}

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
export function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
export function getColorStatus(etat: string) {
  switch (etat) {
    case "Entrée":
      return "info";
      break;
    case "Sortie":
      return "primary";
      break;

    default:
      break;
  }
}
