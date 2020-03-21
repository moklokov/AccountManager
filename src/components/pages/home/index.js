import React, { Component } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";

import styles from "./styles.css";
import Users from "./users";
import removeUserService from "../../../services/remove_user_service";
import loadUsersService from "../../../services/load_users_service";

class Home extends Component {
  componentDidMount() {
    this.props.loadUsers();
  }

  render() {
    const { classes, users, handleRemove } = this.props;
    return (
      <>
        <Typography variant="h2" align="center" className={classes.header}>
          List of users
        </Typography>
        <Users items={users} onRemove={handleRemove} />
      </>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.arrayOf(
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
  handleRemove: PropTypes.func.isRequired,
  loadUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { users: Object.values(state.items) };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUsers: () => dispatch(loadUsersService()),
    handleRemove: id => dispatch(removeUserService(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home));
