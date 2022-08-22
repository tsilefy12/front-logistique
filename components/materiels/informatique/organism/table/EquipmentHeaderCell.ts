import { HeadCell } from "./HeadCell.interface";

export const equipmentHeadCells: readonly HeadCell[] = [
	{
		id: 'num_optim',
		numeric: false,
		disablePadding: true,
		label: 'N°Optim',
	  },
	  {
		id: 'type_materiel',
		numeric: true,
		disablePadding: false,
		label: 'Type',
	  },
	  {
		id: 'user',
		numeric: true,
		disablePadding: false,
		label: 'Utilisateur',
	  },
	  {
		id: 'designation',
		numeric: true,
		disablePadding: false,
		label: 'Désignation',
	  },
	  {
		id: 'etat',
		numeric: true,
		disablePadding: false,
		label: 'Etat',
	  },
];
