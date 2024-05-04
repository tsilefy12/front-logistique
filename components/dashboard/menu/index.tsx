import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { Badge, FormControl, Icon, Link, ListItemButton, ListItemIcon, ListItemText, Stack, styled, useTheme } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";

import { useRouter } from "next/router";
import { logout } from "../../../redux/features/auth/authSlice";
import { ButtonProfile, OneButtonLink, OneButtonLinkWithItems } from "../../../layouts/backOffice/navbar/ButtonNav";
import { WidthFull } from "@mui/icons-material";

const NavbarBackOffice = ({ matches }: any) => {
	const theme = useTheme();
	/**
	 * Take all menu lists in the redux store
	 */
	const navMenu = useAppSelector((state) => state.menu.value);
	const dispatch = useAppDispatch();
	const router = useRouter();

	const handleClickLogout = () => {
		dispatch(logout({}));
		window.location.href = "/login";
	};

	return (
		<Container maxWidth="xl">
			<ToolbarBackOffice variant="dense">
				<ListMenuContainer>
					<ListPageContainer>
						{navMenu.map((page, index) => (

							<OneButtonLink key={index} page={page}>
								<Stack direction={"row"}>
									<Icon sx={{ margin: 2 }}>{page.icon}</Icon>
									<ListItemText primary={page.name === "Configurations"? '': page.name} sx={{ margin: 2 }} />
								</Stack>
							</OneButtonLink>
						)
						)}
					</ListPageContainer>
				</ListMenuContainer>
			</ToolbarBackOffice>
		</Container>
	);
};

export default NavbarBackOffice;

const ListPageContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexWrap: "wrap",
	height: 450,
	textAlign: "start",
	backgroundColor: theme.palette.grey[300],
	position: "fixed",
	right: 15,
	maxWidth: 240,
	float: "right",
}));

const ListMenuContainer = styled(Stack)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "left",
	width: "100%"
}));

export const MenuNavbarBo = styled(Stack)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "left",
}));

export const IconBntNavBO = styled(IconButton)(({ theme }) => ({}));

// export const AppbarBackOffice = styled(AppBar)(({ theme }) => ({
// 	// backgroundColor: theme.palette.grey[300],
// 	right: 10
// }));

export const ToolbarBackOffice = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	// justifyContent: "space-between",
}));
