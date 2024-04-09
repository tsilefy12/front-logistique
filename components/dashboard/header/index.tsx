import { FormControl, FormLabel, Stack, useMediaQuery, useTheme } from "@mui/material"
import { format } from "date-fns";
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NavbarMobile from "../menuMobile";

const HeaderDashboard = () => {
    const today = format(new Date(), 'dd/MM/yyyy');
    const [currentTime, setCurrentTime] = useState('');
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000); // Met à jour chaque seconde

        return () => clearInterval(intervalId);
    }, []);

    return (

        <FormControl fullWidth sx={StyleHeader}>
            <Stack direction="row" justifyContent="space-between">
                <FormControl style={{display: !matches ? 'none': 'block', marginLeft: "-10px"}}>
                    {matches ? (
                        <NavbarMobile matches={matches} />
                    ) : ''}
                </FormControl>
               <FormControl>
               <img src={`/logistique/images/logo/MV_logo.png`} style={{width: "60px",height: "55px", marginLeft: matches ? "10px": "65px"}} />
               </FormControl>
                <Stack direction="row" justifyContent="space-between" margin={2}>

                    <FormLabel style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: "2px" }}>
                        <span style={{ color: "GrayText" }}>{today}</span>
                        <span style={{ marginLeft: "10px", color: "GrayText", display: matches ? 'none': "flex" }}>{currentTime}</span>
                    </FormLabel>

                    <FormControl fullWidth style={{ marginLeft: "10px" }}>
                        <Stack direction="row">
                            <span style={{ color: "GrayText" }}>compte</span><AccountCircleIcon style={{ fontSize: "25px", marginRight: "20px"}} />
                        </Stack>
                    </FormControl>
                </Stack>
            </Stack>
        </FormControl>
    )
}
export default HeaderDashboard;

const StyleHeader = {
    height: "20vh",
    position: "fixed",
    top: 0,
    left: 0,
    //borderBottom: "1px solid black",
    backgroundColor: "rgb(224, 224, 224)",
}
