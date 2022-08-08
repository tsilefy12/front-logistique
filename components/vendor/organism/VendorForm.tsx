import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Check from "@mui/icons-material/Check";
import Close from "@mui/icons-material/Close";
import { styled } from "@mui/material";
import { Form, Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import * as Yup from "yup";
import OSTextField from "../../shared/input copy/OSTextField";
import { createVendor, updateVendor } from "../../../redux/features/vendor";
import { cancelEdit } from "../../../redux/features/vendor/vendorSlice";

export default function VendorForm() {
	const route = useRouter();

	const dispatch = useAppDispatch();

	const { linkedEmployee } = useAppSelector((state) => state.auth);

	const { isEditing, vendor } = useAppSelector(
		(state) => state.vendor
	);

	const handleSubmit = async (values: any) => {
		try {
			if (isEditing) {
				await dispatch(
					updateVendor({
						id: vendor.id!,
						vendor: values,
					})
				);
			} else {
				await dispatch(createVendor(values));
			}
			route.push("/fournisseurs");
		} catch (error) {
			console.log("error", error);
		}
	};

	return (
		<Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
			<Formik
				enableReinitialize
				initialValues={
					isEditing
						? vendor
						: {
							name: isEditing ? vendor?.name : "",
							address: isEditing ? vendor?.address : "",
							phone: isEditing ? vendor?.address: "",
							email: isEditing ? vendor?.email : "",
							website: isEditing ? vendor?.website : "",
						}
				}
				validationSchema={Yup.object({
					name: Yup.string().required("Champ obligatoire"),
					address: Yup.string().required("Champ obligatoire"),
					phone: Yup.string().required("Champ obligatoire"),
					email: Yup.string().required("Champ obligatoire"),
					website: Yup.string().required("champ obligatoire"),
				})}
				onSubmit={(value: any, action: any) => {
					handleSubmit(value);
					action.resetForm();
				}}
			>
				{(formikProps) => {
					return (
						<Form>
							<NavigationContainer>
								<SectionNavigation>
									<Stack flexDirection={"row"}>
										<Link href="/">
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
											sx={{ marginInline: 2 }}
											type="submit"
										>
											Enregistrer
										</Button>

										<Button
											variant="text"
											color="warning"
											size="small"
											startIcon={<Close />}
											onClick={() => {
												formikProps.resetForm();
												dispatch(cancelEdit());
											}}
										>
											Annuler
										</Button>
									</Stack>
									<Typography variant="h4">
										{isEditing ? "Modifier" : "Ajouter"} Fournisseurs
									</Typography>
								</SectionNavigation>
								<Divider />
							</NavigationContainer>

							<FormContainer spacing={2}>
								<OSTextField
									id="outlined-basic"
									label="Nom"
									name="name"
								/>
								<OSTextField
									id="outlined-basic"
									label="Adresse"
									name="address"
								/>
								<OSTextField
									id="outlined-basic"
									label="Téléphone"
									name="phone"
								/>
								<OSTextField
									id="outlined-basic"
									label="Email"
									name="email"
								/>
								<OSTextField
									id="outlined-basic"
									label="Site web"
									name="website"
								/>
							</FormContainer>
						</Form>
					);
				}}
			</Formik>
		</Container>
	);
}

export const CustomStack = styled(Stack)(({ theme }) => ({
	[theme.breakpoints.down("sm")]: {
		flexWrap: "wrap",
	},
}));

const FormContainer = styled(Stack)(({ theme }) => ({
	padding: 30,
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
