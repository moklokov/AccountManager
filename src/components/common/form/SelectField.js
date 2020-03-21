import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import FormControl from "./FormControl";

export default ({
  label,
  emptyValue,
  options,
  error,
  multiple,
  value,
  name,
  onChange
}) => (
  <FormControl error={error}>
    <InputLabel>{label}</InputLabel>
    <Select
      name={name}
      multiple={multiple}
      value={value}
      onChange={onChange}
      error={!!error}
    >
      <MenuItem value="">
        <em>{emptyValue}</em>
      </MenuItem>
      {options.map(({ value, label }, index) => (
        <MenuItem key={index} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
