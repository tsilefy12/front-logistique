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
            <Icon sx={{ margin: 2, color: "GrayText" }}>{page.icon}</Icon>
            <FormLabel sx={{ margin: 2, cursor: "pointer" }}>
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
  color: "none",
  "&:hover": {
    cursor: "pointer",
    backgroundColor: "#9EC04E",
  },
}));
