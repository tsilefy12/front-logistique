import { Box, FormLabel, Icon, Stack, styled } from "@mui/material";
import Link from "@mui/material/Link";
import allMenu from "../../../config/menu";

const VerticalMenu = ({ matches }: any) => {
  const navMenu = allMenu();

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
