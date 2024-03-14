import { TableCell, TableSortLabel } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { HeadCell } from "./HeadCell.interface";

const HeadCellComponent = ({
	headCell,
	operation
}: {
	headCell: HeadCell;
	operation: string;
	[key: string]: any;
}) => {
	const [order, setOrder] = React.useState<any>("asc");
	const [orderBy, setOrderBy] = React.useState<any>("");
	const router = useRouter();

	useEffect(() => {
		// intialize order status from url
		if (router.query.orderBy == headCell.id) {
			setOrderBy(router.query.orderBy);
			setOrder(router.query.order);
		} else {
			setOrderBy("");
			setOrder("asc");
		}
	}, [router.query.orderBy]);

	const handleClickOrder = (
		event: React.MouseEvent<unknown>,
		headCellId: string
	) => {
		let targetOrder = "asc";
		if (orderBy == headCellId) {
			targetOrder = order == "asc" ? "desc" : "asc";
		} else {
			targetOrder = "asc";
		}
		setOrder(targetOrder);
		setOrderBy(headCellId);
		router.push({
			query: {
				...router.query,
				order: targetOrder,
				orderBy: headCellId,
			},
		});
	};
	return (
		<TableCell
			key={headCell.id}
			align={"left"}
			padding={headCell.disablePadding ? "none" : "normal"}
			sortDirection={orderBy === headCell.id ? order : false}
		>
			<TableSortLabel
				active={orderBy === headCell.id}
				direction={order}
				onClick={(event) => handleClickOrder(event, headCell.id)}
			>
				{headCell.id === "unitPrice" || operation ==="INPUT" ? headCell.label[0] :headCell.label[1]}
			</TableSortLabel>
		</TableCell>
	);
};

export default HeadCellComponent;
