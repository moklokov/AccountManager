import React, { Component } from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import ConfirmDialog from "../../../common/confirmDialog";

class User extends Component {
  handleRemove = () => this.props.onRemove(this.props.id);

  render() {
    const {
      id,
      firstname,
      lastname,
      company,
      contacts,
      updatedAt,
      classes
    } = this.props;

    return (
      <TableRow className={classes.row} key={id}>
        <TableCell>
          {firstname} {lastname}
        </TableCell>
        <TableCell>{company}</TableCell>
        <TableCell>{contacts}</TableCell>
        <TableCell>{updatedAt.toISOString().slice(0, 10)}</TableCell>
        <TableCell>
          <a href={`/users/${id}/edit`} className={classes.edit}>
            edit
          </a>
          <ConfirmDialog
            title="Deleting user"
            message="Do you sure to want delete user?"
            onConfirm={this.handleRemove}
          >
            {openDialog => (
              <a href="#" className={classes.remove} onClick={openDialog}>
                delete
              </a>
            )}
          </ConfirmDialog>
        </TableCell>
      </TableRow>
    );
  }
}

User.propTypes = {
  id: PropTypes.number.isRequired,
  firstname: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
  contacts: PropTypes.string.isRequired,
  updatedAt: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default User;
