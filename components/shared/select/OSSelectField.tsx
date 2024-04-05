import {
  Box,
  FormControlLabel,
  Menu,
  MenuItem,
  Switch,
  TextField,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import OSTextField from "../input copy/OSTextField";

const OSSelectField = ({
  name,
  valueKey,
  dataKey,
  separator,
  options,
  ...otherProps
}: {
  name: string;
  valueKey: string;
  dataKey: string | string[];
  separator?: string;
  options: any[];
  [key: string]: any;
}) => {
  const { setFieldValue } = useFormikContext();
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilterdData] = useState<any[]>(options);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [field, meta] = useField(name);

  const initialValue = () => {
    if (typeof dataKey === "string") {
      const result = options.find((o) => o[valueKey] === field.value);
      if (result) {
        return result[dataKey];
      }
      return "";
    }
    let value = "";
    dataKey.forEach((k, i) => {
      const result = options.find((o) => o[valueKey] === field.value);
      if (result) {
        if (i === 0) {
          value += result[k];
        } else {
          value += " " + result[k];
        }
      }
    });
    return value;
  };

  const [valueInput, setValueInput] = useState<string>(
    field.value && options.length !== 0 ? initialValue() : ""
  );
  const handleChange = (label: string, value: string) => {
    setValueInput(label);
    setFieldValue(name, value);
    setAnchor(null);
  };

  const [anchor, setAnchor] = useState<any>(null);

  const configSelect: any = {
    ...field,
    ...otherProps,
    variant: "outlined",
    fullWidth: true,
  };

  useEffect(() => {
    setValueInput(initialValue());
  }, [field.value]);

  useEffect(() => {
    setFilterdData(options);
  }, [options]);

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helperText = meta.error;
  }
  const selectOptions = () => {
    if (Array.isArray(dataKey)) {
      return filteredData.map((option: any, index) => {
        const labelArray = dataKey.map((key: string) => option[key]);
        const label = labelArray.join(separator);
        return (
          <MenuItem
            key={index}
            onClick={() => handleChange(label, option[valueKey])}
          >
            {label}
          </MenuItem>
        );
      });
    }
    return filteredData.map((option: any, index) => {
      const label = option[dataKey];
      return (
        <MenuItem
          key={index}
          onClick={() => handleChange(label, option[valueKey])}
          value={option[valueKey]}
        >
          {label}
        </MenuItem>
      );
    });
  };
  useEffect(() => {
    if (search.length === 0) {
      setFilterdData(options);
      return;
    }
    setFilterdData((prev: any[]) => {
      if (Array.isArray(dataKey)) {
        return options.filter((option: any) => {
          const labelArray = dataKey.map((key: string) => option[key]);
          const label = labelArray.join(separator);
          return label.toLowerCase().includes(search.toLowerCase());
        });
      }
      return options.filter((option: any) => {
        const label = option[dataKey];
        return label.toLowerCase().includes(search.toLowerCase());
      });
    });
  }, [search]);

  return (
    <>
      <TextField
        {...configSelect}
        onClick={(e) => setAnchor(e.target)}
        value={valueInput}
      />
      <Menu
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => {
          setAnchor(null);
        }}
        PaperProps={{
          sx: {
            width: "80%",
          },
        }}
      >
        {activeSearch && (
          <Box sx={{ padding: 2 }}>
            <TextField
              name="searchSelect"
              value={search}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
              }}
              label="Recherche"
              variant="outlined"
              fullWidth
            />
          </Box>
        )}
        <Box sx={{ paddingLeft: 1 }}>
          <FormControlLabel
            control={
              <Switch
                value={activeSearch}
                onChange={(e, v) => setActiveSearch(v)}
              />
            }
            label="Filtrer"
          />
        </Box>

        {selectOptions()}
      </Menu>
    </>
  );
};

// component default props
OSSelectField.defaultProps = {
  separator: " ",
};

export default OSSelectField;