import {
  Button,
  Container,
  styled,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Check, Close } from "@mui/icons-material";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { createFournisseur } from "../../../redux/features/fournisseur";
import { updateFournisseur } from "../../../redux/features/fournisseur";
import useFetchFournisseur from "../hooks/useFetchFournisseur";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import OSTextField from "../../shared/input/OSTextField";
import { useRouter } from "next/router";
import { editFournisseur } from "../../../redux/features/fournisseur";

const FournisseurForm = () => {
  const { isEditing, fournisseur } = useAppSelector(
    (state) => state.fournisseur
  );
  const router = useRouter();
  const { id }: any = router.query;
  const dispatch = useAppDispatch();
  const fetchFurnisseurList = useFetchFournisseur();

  useEffect(() => {
    if (id) {
      dispatch(editFournisseur({ id }));
    }
  }, [id]);

  const handleSubmint = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateFournisseur({
            id: fournisseur.id!,
            fournisseur: values,
          })
        );
      } else {
        await dispatch(createFournisseur(values));
      }
      fetchFurnisseurList();
      router.push("/fournisseurs");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize
        initialValues={
          isEditing
            ? fournisseur
            : {
                name: "",
                address: "",
                email: "",
                phone: "",
                website: "",
              }
        }
        validationSchema={Yup.object({
          name: Yup.string().required("Champ obligatoire"),
        })}
        onSubmit={async (value: any, action) => {
          await handleSubmint(value);
          action.resetForm();
        }}
      >
        {(formikProps) => (
          <Form>
            <NavigationContainer>
              <SectionNavigation>
                <Stack flexDirection={"row"}>
                  <Link href="/fournisseurs">
                    <Button
                      color="info"
                      variant="text"
                      startIcon={<ArrowBack />}
                    >
                      Retour
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<Check />}
                    sx={{ marginInline: 3 }}
                    type="submit"
                  >
                    Enregistrer
                  </Button>
                  <Button
                    variant="text"
                    color="warning"
                    size="small"
                    startIcon={<Close />}
                    sx={{ marginInline: 3 }}
                    type="reset"
                  >
                    Annuler
                  </Button>
                </Stack>
                <Typography variant="h4">
                  Créer(modifier) fournisseur
                </Typography>
              </SectionNavigation>
              <Divider />
            </NavigationContainer>

            <FormContainer spacing={2}>
              <OSTextField label="Nom" name="name" />
              <OSTextField label="Adresse" name="address" />
              <OSTextField label="Téléphone" name="phone" />
              <OSTextField label="Email" name="email" />
              <OSTextField label="Site Web" name="website" />
            </FormContainer>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default FournisseurForm;

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));

const FormContainer = styled(Stack)(({ theme }) => ({
  padding: 30,
  // border: "1px solid #E0E0E0",
  borderRadius: 20,
  background: "#fff",
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
