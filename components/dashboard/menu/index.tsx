import React from "react";
import {
  Box,
  Stack,
  Icon,
  ListItemText,
  styled,
  FormLabel,
} from "@mui/material";
import Link from "@mui/material/Link";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { OneButtonLink } from "../../../layouts/backOffice/navbar/ButtonNav";
import NextLink from "next/link";
import { borderRadius } from "polished";

const VerticalMenu = ({ matches }: any) => {
  const navMenu = useAppSelector((state) => state.menu.value);

  return (
    <ListPageContainer>
      {navMenu.map((page, index) => (
        <Link
          href={`/logistique/${page.link}`}
          component={"a"}
          sx={{ textDecoration: "none" }}
        >
          <StyledStack direction={"row"}>
            <Icon sx={{ margin: 2 }}>{page.icon}</Icon>
            <FormLabel
              sx={{
                margin: 2,
                cursor: "pointer",
                fontWeight: "bold",
                "&:hover": {
                  color: "black",
                },
              }}
            >
              {page.name}
            </FormLabel>
          </StyledStack>
        </Link>
      ))}
    </ListPageContainer>
  );
};

export default VerticalMenu;

const ListPageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: 30,
  padding: 10,
  height: "100%",
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  backgroundColor: "transparent",
  cursor: "pointer",
  width: "100%", // Définir une largeur initiale
  color: "GrayText",
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    // backgroundColor: "#eaffbf",
    minWidth: "100%",
    borderRadius: 8,
    color: "black",
  },
}));
