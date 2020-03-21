import React from "react";
import PropTypes from "prop-types";
import { FormHelperText, FormControl as Control } from "@material-ui/core";

const FormControl = ({ error, children }) => (
  <Control fullWidth error={!!error}>
    {children}
    {error && <FormHelperText>{error}</FormHelperText>}
  </Control>
);

FormControl.propTypes = {
  error: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default FormControl;
