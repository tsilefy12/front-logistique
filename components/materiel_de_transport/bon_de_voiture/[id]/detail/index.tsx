import {
  Button,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
  Divider,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  FormControl,
  TableFooter,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import Moment from "react-moment";
//   import {
//     useAppDispatch,
//     useAppSelector,
//   } from "../../../../hooks/reduxHooks";
import { useRouter } from "next/router";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../../hooks/reduxHooks";
import { getCarVoucher } from "../../../../../redux/features/car-voucher";
import { format } from "date-fns";
import { getActivity } from "../../../../../redux/features/activity/activitySlice";
import { ActivityItem } from "../../../../../redux/features/activity/activity.interface";
import formatMontant from "../../../../../hooks/format";

const DetailBonDeVoiture = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { id }: any = router.query;
  const { activitys } = useAppSelector((state) => state.activity);

  const getDetailCarVoucher = () => {
    const args: any = {
      include: {
        carVoucher: true,
      },
    };
    dispatch(getActivity({ id, args }));
  };

  const [total, setTotal] = useState(0);

  useEffect(() => {
    getDetailCarVoucher();
    let calcul = 0;
    activitys.forEach((element: any) => {
      calcul += element.montants;
      setTotal(calcul);
    });
  }, [id, activitys]);

  return (
    <Container maxWidth="xl" sx={{ pb: 5 }}>
      <NavigationContainer>
        <SectionNavigation
          direction="row"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Link href="/materiel_de_transport/bon_de_voiture">
            <Button color="info" variant="text" startIcon={<ArrowBackIcon />}>
              Retour
            </Button>
          </Link>
          <Typography variant="h4" color="GrayText">
            Détails d'entretien
          </Typography>
        </SectionNavigation>
        <Divider />
      </NavigationContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Activité</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>PU</TableCell>
            <TableCell>Montant</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activitys.map((row: ActivityItem | any, index: any) => (
            <TableRow key={index}>
              <TableCell>{row.activite}</TableCell>
              <TableCell>{row.nombre}</TableCell>
              <TableCell>{formatMontant(row.pu)}</TableCell>
              <TableCell>{formatMontant(row.montants)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {activitys.length != 0 ? (
            <TableRow>
              <TableCell
                colSpan={4}
                sx={{ textAlign: "center", fontSize: "1.1em", color: "black" }}
              >
                Total : {formatMontant(total)}
              </TableCell>
            </TableRow>
          ) : (
            <TableCell
              colSpan={4}
              sx={{ textAlign: "center", fontSize: "1.3em" }}
            >
              Aucune activitée
            </TableCell>
          )}
        </TableFooter>
      </Table>
    </Container>
  );
};

export default DetailBonDeVoiture;

export const InfoItems = styled(Stack)(({ theme }) => ({}));

const DetailsContainer = styled("div")(({ theme }) => ({
  padding: 30,
  border: "1px solid #E0E0E0",
  borderRadius: 20,
  background: "#fff",
}));

const NavigationContainer = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  marginBottom: theme.spacing(2),
  flex: 1,
  width: "100%",
}));

export const SectionNavigation = styled(Stack)(({ theme }) => ({}));
