import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";

import * as Yup from "yup";

import {
  createBonCommandeExterne,
  editBonCommandeExterne,
  updateBonCommandeExterne,
} from "../../../../redux/features/bon_commande_externe/bonCommandeExterneSlice";
import { createArticleCommandeExterne } from "../../../../redux/features/bon_commande_externe/articleBCESlice";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import FormBCE from "./FormBCE";
import { styled } from "@mui/material";
import { createFile } from "../../../../redux/features/file/fileSlice";

export default function BonCommandeExterneForm() {
  const dispatch = useAppDispatch();
  const route = useRouter();
  const { id }: any = route.query;
  const [valuesArticle, setValuesArticle] = useState<any[]>([]);

  const { isEditing, bonCommandeExterne } = useAppSelector(
    (state) => state.bonCommendeExterne
  );

  const handleSubmit = async (values: any) => {
    try {
      if (isEditing) {
        await dispatch(
          updateBonCommandeExterne({
            id: bonCommandeExterne.id!,
            bonCommandeExterne: values,
          })
        );
      } else {
        if (values.pieceJointe && values.pieceJointe.name !== null) {
          const formData = new FormData();
          formData.append("file", values.pieceJointe);
          const { images } = await dispatch(createFile(formData)).unwrap();
          values.pieceJointe = images[0].url;
        }
        const newDataBCE = {
          ref: values.ref,
          dateCommande: new Date(values.dateCommande),
          objet: values.objet,
          demandeur: values.demandeur,
          grant: values.grant,
          ligneBudgetaire: values.ligneBudgetaire,
          beneficiaire: values.beneficiaire,
          type: values.type,
          modePaiement: values.modePaiement,
          //   conditionLivraison: values.conditionLivraison,
          pieceJointe: values.pieceJointe,
        };

        const response = await dispatch(createBonCommandeExterne(newDataBCE));
        if (valuesArticle.length > 0) {
          valuesArticle.forEach((element: any, index: any) => {
            const newData = {
              designation: element.designation,
              caracteristik: element.caracteristique,
              fournisseurId: element.fournisseurId,
              quantite: element.quantite,
              pu: element.pu,
              valueArticle: element.valeur,
              bonDeCommandeExterneId: response.payload.id,
            };
            dispatch(createArticleCommandeExterne(newData));
          });
        }
      }
      route.push("/materiels/bon_commande_externe/");
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleFech = async (id: any) => {
    try {
      const Val = await dispatch(
        editBonCommandeExterne({
          id,
          args: {
            include: {
              articleCommandeBce: true,
            },
          },
        })
      );
      setValuesArticle((prev: any[]) => {
        console.log(prev);
        prev = Val.payload.articleCommandeBce;
        return prev;
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (id) {
      handleFech(id);
    }
  }, [id]);
  return (
    <>
      <Container maxWidth="xl" sx={{ paddingBottom: 8 }}>
        <Formik
          enableReinitialize={isEditing ? true : false}
          initialValues={{
            ref: isEditing ? bonCommandeExterne.ref : "",
            dateCommande: isEditing
              ? bonCommandeExterne.dateCommande
              : new Date(),
            ligneBudgetaire: isEditing ? bonCommandeExterne.ligneBudgetaire : 0,
            grant: isEditing ? bonCommandeExterne.grant : 0,
            fournisseurId: "",
            objet: isEditing ? bonCommandeExterne.objet : "",
            beneficiaire: isEditing ? bonCommandeExterne.beneficiaire : "",
            demandeur: isEditing ? bonCommandeExterne.demandeur : "",
            modePaiement: isEditing ? bonCommandeExterne.modePaiement : "",
            // conditionLivraison: isEditing
            //   ? bonCommandeExterne.conditionLivraison
            //   : "",
            pieceJointe: isEditing ? bonCommandeExterne.pieceJointe : "",
            type: isEditing ? bonCommandeExterne.type : "",
            designation: "",
            caracteristique: "",
            pu: 0,
            quantite: 0,
          }}
          // validationSchema={Yup.object({
          //   ref: Yup.string().required("Champ obligatoire"),
          //   objet: Yup.string().required("Champ obligatoire"),
          // })}
          onSubmit={(value: any, action: any) => {
            handleSubmit(value);
            action.resetForm();
          }}
        >
          {(formikProps) => (
            <FormBCE
              formikProps={formikProps}
              valuesArticle={valuesArticle}
              setValuesArticle={setValuesArticle}
            />
          )}
        </Formik>
      </Container>
    </>
  );
}

export const CustomStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
  },
}));
