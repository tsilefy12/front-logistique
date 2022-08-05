import React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useField } from "formik";

const OSTimePicker = ({
  name,
  label,
  value,
  onChange,
  ...otherProps
}: any) => {
  const [field, meta] = useField(name);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField fullWidth size="medium" {...params} />
        )}
      />
    </LocalizationProvider>
  );
};

export default OSTimePicker;
