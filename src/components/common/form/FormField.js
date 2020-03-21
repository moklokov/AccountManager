import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

import FormControl from "./FormControl";

const FormField = ({
  type,
  name,
  value,
  label,
  error,
  multiline,
  rows,
  onChange
}) => (
  <FormControl error={error}>
    <TextField
      label={label}
      type={type || "text"}
      name={name}
      value={value}
      multiline={multiline}
      rows={rows}
      error={!!error}
      onChange={onChange}
    />
  </FormControl>
);

FormField.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  rows: PropTypes.number
};

export default FormField;
