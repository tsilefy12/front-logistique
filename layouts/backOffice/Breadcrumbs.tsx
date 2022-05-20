import React, { Fragment, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Paper, Container} from "@mui/material";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import HomeWorkIcon from "@mui/icons-material/HomeWork";

const MvBreadcrumbs = () => {
  const router = useRouter();
  const routeArray = router.pathname.split("/");
  routeArray.shift() 
  
  return (
    <Paper sx={{ py: 1 }}>
      <Container maxWidth="lg">
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            <IconButton aria-label="home" size="large">
              <HomeWorkIcon fontSize="inherit" />
            </IconButton>
          </Link>
          <Link underline="hover" color="inherit" href="/">
            Employés
          </Link>
          {routeArray.map((route, index) =>
            index === routeArray.length ? (
              <span key={index}>
                <Link underline="hover" color="inherit" href={router.pathname}>
                  {route}
                </Link>
              </span>
            ) : (
              <span key={index}>
                <Typography color="text.primary">{route}</Typography>
              </span>
            )
          )}
        </Breadcrumbs>
      </Container>
    </Paper>
  );
};

export default MvBreadcrumbs;
