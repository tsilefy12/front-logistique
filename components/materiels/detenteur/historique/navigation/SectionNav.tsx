import { Button, styled, Typography, Stack, Divider } from "@mui/material";
import Link from "next/link";
import React from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";

const Nav = () => {
  return (
    <NavigationContainer>
      <SectionNavigation>
        <Stack flexDirection={"row"}>
          <Link href="/materiels/informatiques">
            <Button color="info" variant="text" startIcon={<ArrowBack />}>
              Retour
            </Button>
          </Link>
        </Stack>
        <Typography variant="h4">
          Historique de détention de matériels
        </Typography>
      </SectionNavigation>
      <Divider />
    </NavigationContainer>
  );
};

export default Nav;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

const SectionNavigation = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  paddingBottom: "5px",
}));
