import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import {
  Badge,
  FormControl,
  Icon,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  useTheme,
} from "@mui/material";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";

import { useRouter } from "next/router";
import { logout } from "../../../redux/features/auth/authSlice";
import {
  ButtonProfile,
  OneButtonLink,
  OneButtonLinkWithItems,
} from "../../../layouts/backOffice/navbar/ButtonNav";
import { WidthFull } from "@mui/icons-material";

const VerticalMenu = ({ matches }: any) => {
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
    <ListPageContainer>
      {navMenu.map((page, index) => (
        <OneButtonLink key={index} page={page}>
          <Stack direction={"row"}>
            <Icon sx={{ margin: 2 }}>{page.icon}</Icon>
            <ListItemText
              primary={page.name === "Configurations" ? "" : page.name}
              sx={{ margin: 2 }}
            />
          </Stack>
        </OneButtonLink>
      ))}
    </ListPageContainer>
  );
};

export default VerticalMenu;

const ListPageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[300],
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 30,
  padding: 10,
  height: "100%",
}));
