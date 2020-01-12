import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { withStyles } from "@material-ui/core/styles";

const CustomTableCell = withStyles(theme => {
  return {
    head: {
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.common.white
    }
  };
})(TableCell);

const Header = () => (
  <TableHead>
    <TableRow>
      <CustomTableCell>Name</CustomTableCell>
      <CustomTableCell>Company</CustomTableCell>
      <CustomTableCell>Contacts</CustomTableCell>
      <CustomTableCell colSpan="2">Last update</CustomTableCell>
    </TableRow>
  </TableHead>
);

export default Header;
