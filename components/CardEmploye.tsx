import {
  Avatar,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import useBasePath from "../hooks/useBasePath";
import palette from "../themes/palette";

const CardEmploye = () => {
    const theme = useTheme();
    const basePath = useBasePath();
    return (
      <Link href="/employe/1">
        <CustomCard>
          <CardContainer>
            <CardImg>
              <Avatar
                sx={{ width: 80, height: 80 }}
                alt="Remy Sharp"
                src={`${basePath}/images/employe.png`}
              />
            </CardImg>
            <CardDesc>
              <Typography variant="h6" color="initial">
                Anna Tracy
              </Typography>
              <Typography variant="body2" color={palette.accent.main}>
                Administration
              </Typography>
              <Typography variant="caption" color={theme.palette.grey[600]}>
                034 11 231 22
              </Typography>
            </CardDesc>
          </CardContainer>
        </CustomCard>
      </Link>
    );
  };
  
  export default CardEmploye;
  
  const CustomCard = styled(Paper)(({ theme }) => ({
    borderRadius: 20,
    boxShadow: " 3px 3px 20px 1px #0000000F",
    // border: `1px solid ${palette.grey[300]}`,
    overflow: "hidden",
    display: "flex",
    justifyContent: "flex-start",
    width: 286,
    height: 116,
    marginBlock: theme.spacing(2),
    cursor: "pointer",
  }));
  
  const CardDesc = styled("div")(({ theme }) => ({
    marginInline: theme.spacing(1),
  }));
  
  const CardImg = styled("div")(({ theme }) => ({
    marginInline: theme.spacing(1),
  }));
  
  const CardContainer = styled(Stack)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center"
    // padding: theme.spacing(1)
  }));
  