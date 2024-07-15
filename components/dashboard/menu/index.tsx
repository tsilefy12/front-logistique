import { Icon, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { usePermitted } from "../../../config/middleware";
import allMenu from "../../../config/menu";
import CardModule from "../utils/util";

export default function Menu() {
  const validate = usePermitted();
  const navMenu = allMenu();
  const router = useRouter();

  return (
    <Stack
      direction={"column"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Stack direction={"column"} justifyContent={"center"} flexWrap={"wrap"}>
        {navMenu.map((page: any, index: number) =>
          page.items.length === 0 ? (
            <CardModule href={page.link} color={page.color} key={index}>
              <Icon fontSize="medium">{page.icon}</Icon>
              <Typography variant="body2">{page.name}</Typography>
            </CardModule>
          ) : (
            <CardModule
              color={page.color}
              href={page.items[0].link}
              key={index}
            >
              <Icon fontSize="medium">{page.icon}</Icon>
              <Typography variant="body2">{page.name}</Typography>
            </CardModule>
          )
        )}
      </Stack>
    </Stack>
  );
}
