import "date-fns";
import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";

import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { withStyles, Button, Grid } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import FormField from "./FormField";
import SelectField from "./SelectField";
import FormControl from "./FormControl";

const styles = {
  actions: {
    textAlign: "right",
    padding: "15px 0",
    "& > *": {
      marginLeft: "15px"
    }
  }
};

const languages = [
  { value: 1, label: "Ukrainian" },
  { value: 2, label: "English" },
  { value: 3, label: "Russian" }
];

const skills = [
  { value: 1, label: "HTML" },
  { value: 2, label: "CSS" },
  { value: 3, label: "JavaScript" },
  { value: 4, label: "React" },
  { value: 5, label: "Angular" },
  { value: 6, label: "NodeJS" },
  { value: 7, label: "Python" },
  { value: 8, label: "PHP" },
  { value: 9, label: "Rails" },
  { value: 10, label: "SQL" },
  { value: 11, label: "Git" }
];

const genders = [
  { value: "male", label: "male" },
  { value: "female", label: "female" }
];

const Form = ({ classes, fields, errors, onSubmit, onCancel }) => (
  <Formik initialValues={fields} onSubmit={onSubmit}>
    {({ values, handleChange, handleSubmit, setFieldValue }) => (
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormField
              label="Username"
              name="username"
              value={values.username}
              error={errors.username}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Email"
              type="email"
              name="email"
              value={values.email}
              error={errors.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Password"
              type="password"
              name="password"
              value={values.password}
              error={errors.repeatPassword}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Repeat password"
              type="password"
              name="repeatPassword"
              value={values.repeatPassword}
              error={errors.repeatPassword}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="First name"
              name="firstname"
              value={values.firstname}
              error={errors.firstname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Last name"
              name="lastname"
              value={values.lastname}
              error={errors.lastname}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectField
              error={errors.gender}
              label="Gender"
              emptyValue="None"
              name="gender"
              options={genders}
              value={values.gender}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectField
              error={errors.language}
              label="Language"
              emptyValue="Select"
              name="language"
              options={languages}
              value={values.language}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <SelectField
              multiple
              error={errors.skills}
              label="Skills"
              name="skills"
              emptyValue="Select"
              options={skills}
              value={values.skills}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Company"
              value={values.company}
              error={errors.company}
              name="company"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl error={errors.birthdate}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  name="birthdate"
                  label="Date birthday"
                  value={values.birthdate}
                  onChange={date => setFieldValue("birthdate", date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormField
              label="Info"
              multiline
              rows={2}
              name="info"
              value={values.info}
              error={errors.info}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <div className={classes.actions}>
          <Button
            variant="contained"
            startIcon={<CancelIcon />}
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            color="primary"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </form>
    )}
  </Formik>
);

Form.propTypes = {
  fields: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default withStyles(styles)(Form);
