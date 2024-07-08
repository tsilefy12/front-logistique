import React from "react";
import Container from "@mui/material/Container";
import {
  Button,
  Stack,
  Divider,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import TypeEquipmentForm from "./organism/TypeEquipmentForm";
import ListTypeEquipment from "./organism/table/ListTypeEquipment";

const TypeEquipmentSection = () => {
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
          <Typography variant="h4"> Type de matériel </Typography>
        </SectionNavigation>
        <Divider />
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TypeEquipmentForm />
        </Grid>
        <Grid item xs={12} md={8}>
          <ListTypeEquipment />
        </Grid>
      </Grid>
    </Container>
  );
};

const SectionNavigation = styled(Stack)(({ theme }) => ({}));

export default TypeEquipmentSection;
