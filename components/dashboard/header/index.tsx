import { Stack, useMediaQuery, useTheme } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavbarMobile from "../menuMobile";

const HeaderDashboard = () => {
  const today = format(new Date(), "dd/MM/yyyy");
  const [currentTime, setCurrentTime] = useState("");
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000); // Met à jour chaque seconde

    return () => clearInterval(intervalId);
  }, []);

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
      <Stack>
        <img
          src={`/logistique/images/logo/MV_logo.png`}
          style={{ width: "60px", height: "60px" }}
        />
      </Stack>
      <Stack direction="row" justifyContent="space-between" gap={1}>
        <Stack
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
          }}
        >
          <span style={{ color: "GrayText" }}>{today}</span>
          <span
            style={{
              color: "GrayText",
            }}
          >
            {currentTime}
          </span>
        </Stack>
        <Stack direction="row" gap={1} alignItems={"center"}>
          <span style={{ color: "GrayText" }}>compte</span>
          <AccountCircleIcon style={{ fontSize: "25px" }} />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default HeaderDashboard;
