import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { useField } from "formik";

type OSTextFieldProps = TextFieldProps & {
  name: string;
  textarea?: boolean;
};

const OSTextFieldArea: React.FC<OSTextFieldProps> = ({
  name,
  textarea,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configTextField: TextFieldProps = {
    fullWidth: true,
    variant: "outlined",
    multiline: textarea,
    rows: textarea ? 4 : undefined,
    ...field,
    ...otherProps,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return <TextField {...configTextField} />;
};

export default OSTextFieldArea;
