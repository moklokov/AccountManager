import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import styles from "./styles.css";

const Header = ({ classes }) => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <h1 className={classes.grow}>Account Manager</h1>
      <Link to="/" className={classes.users}>
        List of users
      </Link>
      <Link to="/users/new">Add new user</Link>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
