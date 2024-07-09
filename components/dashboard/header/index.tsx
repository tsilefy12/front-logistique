import {
  Button,
  FormLabel,
  Link,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavbarMobile from "../menuMobile";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { Home } from "@mui/icons-material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

const HeaderDashboard = () => {
  const today = format(new Date(), "dd/MM/yyyy");
  const [currentTime, setCurrentTime] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAppSelector((state) => state.auth);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000); // Met à jour chaque seconde

    return () => clearInterval(intervalId);
  }, []);
  const [nomUtilisateur, setNomUtilisateur] = useState<string>("");
  useEffect(() => {
    const timer = setTimeout(() => {
      setNomUtilisateur(user?.name as string);
    }, 3000);
    return () => clearTimeout(timer);
  }, [user?.name]);
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems={"center"}
      sx={{
        backgroundColor: "#DFE3E8",
        padding: "10px",
      }}
    >
      <Stack
        paddingLeft={3}
        direction={"row"}
        gap={4}
        color={"GrayText"}
        alignItems={"center"}
      >
        <img
          src={`/logistique/images/logo/logo.png`}
          style={{
            width: "70px",
            height: "45px",
            backgroundColor: "transparent",
          }}
        />
      </Stack>
      <FormLabel style={{ fontSize: 25, color: "#A4C754", fontWeight: "bold" }}>
        Vkajy Logistique
      </FormLabel>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={5}
        paddingRight={5}
      >
        <Stack
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "5px",
          }}
        >
          <span style={{ color: "GrayText" }}> Section {today}</span>
          <span
            style={{
              color: "GrayText",
            }}
          >
            {currentTime}
          </span>
        </Stack>
        <Stack direction="row" gap={5} alignItems={"center"}>
          <CircleNotificationsIcon
            fontSize="large"
            style={{ color: "GrayText" }}
          />
          {user?.profileImageUrl != null ? (
            <img
              src={user?.profileImageUrl}
              style={{ width: "20px", height: "20px" }}
            />
          ) : (
            <AccountCircleIcon fontSize="large" style={{ color: "GrayText" }} />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default HeaderDashboard;
