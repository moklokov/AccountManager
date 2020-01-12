import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";

import styles from "./styles.css";
import Header from "./Header";
import User from "./User";

const Users = ({ items, classes, onRemove }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <Header />
      <TableBody>
        {items.map(user => (
          <User
            {...user}
            contacts={user.phone || user.email}
            onRemove={onRemove}
            key={user.id}
            classes={classes}
          />
        ))}
      </TableBody>
    </Table>
  </Paper>
);

Users.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      updatedAt: PropTypes.object.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string
    })
  ).isRequired,
  onRemove: PropTypes.func.isRequired
};

export default withStyles(styles)(Users);
