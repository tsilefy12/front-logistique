import React from "react";
import TextField from "@mui/material/TextField";
import { useField, useFormikContext } from "formik";
import Autocomplete from "@mui/material/Autocomplete";

const OSAutocomplete = ({ name, data, ...otherProps }: any) => {
  const [field, meta] = useField(name);

  const { setFieldValue } = useFormikContext();

  const handleChange = (event: any, value: any) => {
    setFieldValue(name, value);
  };

  const configTextField = {
    fullWidth: true,
    variant: "outlined",
    ...field,
    ...otherProps,
    onChange: handleChange,
    value: field.value?.id,
  };

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <Autocomplete
      disablePortal
      id={"combo-box" + name}
      disableClearable={false}
      options={data}
      onChange={handleChange}
      getOptionLabel={(option: any) => option.label}
      renderInput={(params) => <TextField {...configTextField} {...params} />}
    />
  );
};

export default OSAutocomplete;
