import React from "react";
import PropTypes from "prop-types";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

const User = ({
  id,
  firstname,
  lastname,
  company,
  contacts,
  updatedAt,
  classes
}) => (
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
      <a href="#" className={classes.remove}>
        delete
      </a>
    </TableCell>
  </TableRow>
);

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
