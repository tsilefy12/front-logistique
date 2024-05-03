import {
  Avatar,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import palette from "../../../../themes/palette";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { getEmployees } from "../../../../redux/features/employeStagiaire/employeeSlice";
import { getInterns } from "../../../../redux/features/employeStagiaire/stagiaireSlice";

const CardDetenteur = ({ holder }: any) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
    
  const { employees } = useAppSelector((state) => state.employe);
  const { interns } = useAppSelector((state) => state.stagiaire);

  const total = [...employees.map((i:any)=>{
      return {
      id : i.id,matricule:i.matricule, name:i.name +" "+ i.surname, type: "employe"
      }
  }),...interns.map((i:any)=>{
      return {
          id : i.id,matricule:i.matricule, name:i.name +" "+ i.surname, type: "intern"
      }
  })]

  const fetchUtilsData = () => {
      dispatch(getEmployees({}));
      dispatch(getInterns({}));
  };

  useEffect(() => {
      fetchUtilsData();
  }, []);

  return (
    <Link href={`/materiels/detenteur/${holder.id}/detail`}>
      <CustomCard>
        <CardContainer>
          <CardImg>
            <Avatar
              sx={{ width: 80, height: 80 }}
              alt="Remy Sharp"
              src={process.env.NEXT_PUBLIC_API_URL + holder?.photoURL}
            />
          </CardImg>
          <CardDesc sx={{justifyContent: "space-between"}}>
            <Typography variant="h6" color="initial">
              {total.find((e) => e.id == holder?.name)?.name}
            </Typography>
            <Typography variant="body2" color={palette.accent.main}>
              {holder?.matricule}
            </Typography>
            <Typography variant="caption" color={theme.palette.grey[600]}>
              {holder?.function}
            </Typography><br></br>
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
  width: 350,
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
