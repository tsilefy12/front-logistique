/**
 * translate table to fr
 * @param param0 object
 * @returns
 */
 export function defaultLabelDisplayedRows({ from, to, count }: any) {
	return `${from}–${to} sur ${count !== -1 ? count : `plus que ${to}`}`;
}

export type Order = "asc" | "desc";

export const labelRowsPerPage = "Ligne(s) par page";

export const selectedItemsLabel = "séléctionné(s)";
