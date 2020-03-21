import "typeface-roboto";
import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

import Header from "./components/common/header";
import Home from "./components/pages/home";
import Edit from "./components/pages/edit";
import Create from "./components/pages/create";
import Show from "./components/pages/show";
import styles from "./App.css";

function App({ classes }) {
  return (
    <div>
      <CssBaseline />
      <Header />
      <Grid container item className={classes.container}>
        <Grid item xs={12}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users/:id/edit" component={Edit} />
            <Route path="/users/new" component={Create} />
            <Route path="/users/:id" component={Show} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
