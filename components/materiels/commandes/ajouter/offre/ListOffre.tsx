import * as React from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { Box, Grid, TextField, styled } from "@mui/material";
import Commande from "./form/Commande";
// import TableOffre from "./table/ListOffre";
import FormulaireOffre from "./form/Formulaire";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { getOrderEquipment } from "../../../../../redux/features/orderEquipment";
import ListOffre from "./table/ListOffre";
import useFetchOfferOrderListe from "./table/hooks/useFetchOfferOrder";
import {
  createSelectOfferOrder,
  updateSelectOfferOrder,
} from "../../../../../redux/features/selectOfferOrder";
import { Form, Formik } from "formik";
import { cancelEdit } from "../../../../../redux/features/selectOfferOrder/selectOfferOrderSlice";
import * as Yup from "yup";

const ListFormCommandeOffre = () => {
  const router = useRouter();
  const { id }: any = router.query;

  const dispatch = useAppDispatch();
  const { selectOfferOrder, isEditing } = useAppSelector(
    (state) => state.selectOfferOrder
  );
  const { offerOrderListe, offerOrder } = useAppSelector(
    (state) => state.offerOrder
  );
  const fetchOfferOderList = useFetchOfferOrderListe();
  React.useEffect(() => {
    fetchOfferOderList();
  }, []);

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateSelectOfferOrder({
            id: selectOfferOrder.id!,
            selectOfferOrder: values,
          })
        );
      } else {
        await dispatch(createSelectOfferOrder(values));
      }
      router.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <Formik
        enableReinitialize
        initialValues={{
          argument: isEditing ? selectOfferOrder.argument : "",
          offerOrderId: isEditing ? selectOfferOrder.offerOrderId : "",
        }}
        validationSchema={Yup.object({
          offerOrderId: Yup.string().required("Champs obligatoire"),
        })}
        onSubmit={(value: any, action: any) => {
          handleSubmit(value);
          action.resetForm();
        }}
      >
        {(formikProps) => {
          return (
            <Form>
              {/* <> */}
              {/* <Container maxWidth="xl"> */}
              <NavigationContainer>
                <SectionNavigation>
                  <Stack flexDirection={"row"}>
                    <Link href="/materiels/commande">
                      <Button
                        color="info"
                        variant="text"
                        startIcon={<ArrowBack />}
                        onClick={() => {
                          formikProps.resetForm();
                          dispatch(cancelEdit());
                        }}
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
                      onClick={() => {
                        formikProps.resetForm();
                        dispatch(cancelEdit());
                      }}
                    >
                      Annuler
                    </Button>
                  </Stack>
                  <Typography variant="h4">Gerer offres</Typography>
                </SectionNavigation>
                <Divider />
              </NavigationContainer>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
              >
                <Commande />
                <FormulaireOffre formikProps={formikProps} />
              </Stack>
            </Form>
          );
        }}
      </Formik>
      <Box>
        <ListOffre />;
      </Box>
    </Container>
    // </>
  );
};

export default ListFormCommandeOffre;

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
const FormContainer = styled(Stack)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  padding: 30,
  borderRadius: 20,
  background: "#fff",
}));
