import { Button, Link, Stack, useMediaQuery, useTheme } from "@mui/material";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavbarMobile from "../menuMobile";
import { useAppSelector } from "../../../hooks/reduxHooks";

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
          second: "2-digit",
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
        padding: "2px",
      }}
    >
      <Stack paddingLeft={6}>
        <img
          src={`/logistique/images/logo/MV_logo.png`}
          style={{ width: "60px", height: "60px" }}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        gap={1}
        paddingRight={5}
      >
        <Stack
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 10,
            alignItems: "center",
          }}
        >
          {" "}
          <Link
            href="/logistique/materiels"
            component={"a"}
            sx={{ textDecoration: "none", color: "GrayText" }}
          >
            <Button variant="contained" sx={{ backgroundColor: "#9DBF4C" }}>
              Accueil
            </Button>
          </Link>
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
          <span style={{ color: "GrayText" }}>{nomUtilisateur}</span>
          {user?.profileImageUrl != null ? (
            <img
              src={user?.profileImageUrl}
              style={{ width: "20px", height: "20px" }}
            />
          ) : (
            <AccountCircleIcon
              style={{ fontSize: "25px", color: "GrayText" }}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
export default HeaderDashboard;
