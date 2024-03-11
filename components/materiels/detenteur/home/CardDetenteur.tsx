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
import palette from "../../../../themes/palette";

const CardDetenteur = ({ holder }: any) => {
  const theme = useTheme();

  return (
    <Link href={`/materiels/detenteur/${holder.id}/detail`}>
      <CustomCard>
        <CardContainer>
          <CardImg>
            <Avatar
              sx={{ width: 80, height: 80 }}
              alt="Remy Sharp"
              // src={process.env.NEXT_PUBLIC_API_URL + holder?.photoURL}
            />
          </CardImg>
          <CardDesc>
            <Typography variant="h6" color="initial">
              {holder?.lastName} {holder?.firstName}
            </Typography>
            <Typography variant="body2" color={palette.accent.main}>
              {holder?.matricule}
            </Typography>
            <Typography variant="caption" color={theme.palette.grey[600]}>
              {holder?.function}
            </Typography>
            <Typography variant="caption" color={theme.palette.grey[600]}>
              {holder?.contact}
            </Typography>
          </CardDesc>
        </CardContainer>
      </CustomCard>
    </Link>
  );
};

export default CardDetenteur;

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
