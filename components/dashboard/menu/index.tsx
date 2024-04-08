import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { Badge, Link, Stack, styled, useTheme } from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";

import { useRouter } from "next/router";
import { logout } from "../../../redux/features/auth/authSlice";
import { ButtonProfile, OneButtonLink, OneButtonLinkWithItems } from "../../../layouts/backOffice/navbar/ButtonNav";

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
		<AppbarBackOffice position="relative" elevation={0} >
			<Container maxWidth="xl">
				<ToolbarBackOffice variant="dense">
					<ListMenuContainer>
						{/* <Link href="/">
							<IconBntNavBO aria-label="home">
								<HomeWorkIcon fontSize="inherit" />
							</IconBntNavBO>
						</Link>
						<Typography variant="h5" paddingX={2} color="GrayText">
							Logistique
						</Typography> */}
						<ListPageContainer>
							{navMenu.map((page, index) =>
								page.items.length === 0 ? (
									<OneButtonLink page={page} key={index}/>
								) : (
									<OneButtonLinkWithItems page={page} key={index} />
								)
							)}
						</ListPageContainer>
					</ListMenuContainer>
					{/* <MenuNavbarBo>
						<Tooltip title="Pas de notification" sx={{ mx: 4 }}>
							<IconButton
								size="large"
								aria-label="show 17 new notifications"
								color="inherit"
							>
								<Badge
									badgeContent={0}
									color="error"
									sx={{
										".MuiBadge-badge": {
											top: 6,
										},
									}}
								>
									<CircleNotificationsIcon fontSize="large" />
								</Badge>
							</IconButton>
						</Tooltip>
						<ButtonProfile handleClickLogout={handleClickLogout} />
					</MenuNavbarBo> */}
				</ToolbarBackOffice>
			</Container>
		</AppbarBackOffice>
	);
};

export default NavbarBackOffice;

const ListPageContainer = styled(Box)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "space-around",
    height: 450,
    width: 145,
    marginRight: "20%",
}));

const ListMenuContainer = styled(Stack)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "space-between",
    width: "100%"
}));

export const MenuNavbarBo = styled(Stack)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
}));

export const IconBntNavBO = styled(IconButton)(({ theme }) => ({}));

export const AppbarBackOffice = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.grey[300],
    right: 35
}));

export const ToolbarBackOffice = styled(Toolbar)(({ theme }) => ({
	display: "flex",
	justifyContent: "space-between",
}));
