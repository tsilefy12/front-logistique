import React from "react";
import Container from "@mui/material/Container";
import {
  Button,
  Grid,
  Stack,
  Divider,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import PassengerForm from "./organism/PassengerForm";
import PassengerListe from "./organism/table/PassengerList";



const Passenger = () => {
  return (
    <Container maxWidth="xl">
      <Stack>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          mb={1}
        >
          <Link href="/">
            <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
              Retour
            </Button>
          </Link>
        </SectionNavigation>
        <Divider />
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <PassengerForm />
        </Grid>
        <Grid item xs={12} md={8} mb={3}>
          <PassengerListe />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Passenger;

export const SectionNavigation = styled(Stack)(({}) => ({}));
