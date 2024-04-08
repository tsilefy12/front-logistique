import { FormControl, FormLabel, Stack } from "@mui/material"
import logo from "../image/logo.png"
import { format } from "date-fns";
import WatchIcon from '@mui/icons-material/Watch';
import { AccountBalance, AccountCircle, FormatAlignJustify } from "@mui/icons-material";
import { useEffect, useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { position } from "polished";

const HeaderDashboard = () => {
    const today = format(new Date(), 'dd/MM/yyyy');
    const [currentTime, setCurrentTime] = useState('');

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
                <img src={`/logistique/images/logo/MV_logo.png`} style={styleLogo} />
                <Stack direction="row" justifyContent="space-between" margin={4}>
                    <FormLabel style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                        <span>{today}</span>
                        <span style={{marginLeft: "10px"}}>{currentTime}</span>
                    </FormLabel>
                    <FormControl fullWidth style={{ marginLeft: "10px" }}>
                        <Stack direction="row">
                            <span>compte</span><AccountCircleIcon />
                        </Stack>
                    </FormControl>
                </Stack>
            </Stack>
        </FormControl>
    )
}
export default HeaderDashboard;

const StyleHeader = {
    height: "15vh",
    position: "fixed",
    top: 0,
    left: 0,
    border: "1px solid red",
}
const styleLogo = {
    width: 80,
    height: 80,
}