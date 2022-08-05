import React from "react";
import { useField, useFormikContext } from "formik";
import {
  Checkbox,
  Switch,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  FormHelperText,
} from "@mui/material";

const OSCheckbox = ({ name, label, isSwith, legend, ...otherProps }: any) => {
  const { setFieldValue } = useFormikContext();

  const [field, meta] = useField(name);

  const handleChange = (event: any) => {
    const { checked } = event.target;
    setFieldValue(name, checked);
  };

  const config = {
    ...field,
    ...otherProps,
    onChange: handleChange,
  };

  const configFormControl = {} as any;
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <>
      <FormControl {...configFormControl}>
        <FormLabel component="legend">{legend}</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              isSwith ? <Switch {...config} /> : <Checkbox {...config} />
            }
            label={label}
          />
        </FormGroup>
      </FormControl>
      <FormHelperText color="error">{meta.error}</FormHelperText>
    </>
  );
};

export default OSCheckbox;
