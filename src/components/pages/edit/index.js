import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles.css";
import Form from "../../common/form/index";
import updateUserService from "../../../services/update_user_service";
import loadUserService from "../../../services/load_user_service";

class Edit extends Component {
  componentDidMount() {
    this.props.loadUser(this.props.id);
  }

  render() {
    const { validErrors, user, classes } = this.props;

    return (
      <>
        <h2 className={classes.title}>Update user</h2>

        {user && (
          <Form
            fields={user}
            errors={validErrors}
            onSubmit={this.handleUpdateUser}
            onCancel={this.handleCancel}
          />
        )}
      </>
    );
  }

  handleUpdateUser = async attrs => {
    const { user, validErrors } = this.props;
    await this.props.updateUser(user.id, attrs);
    if (Object.values(validErrors).length === 0) {
      this.props.history.push("/");
    }
  };

  handleCancel = _ => this.props.history.push("/");
}

Edit.propTypes = {
  validErrors: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    updatedAt: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired,
    skills: PropTypes.array.isRequired,
    language: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    info: PropTypes.string,
    company: PropTypes.string.isRequired,
    birthdate: PropTypes.object.isRequired
  }),
  classes: PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    validErrors: state.validErrors,
    id: props.match.params.id,
    user: state.items[props.match.params.id]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (userId, attrs) => dispatch(updateUserService(userId, attrs)),
    loadUser: userId => dispatch(loadUserService(userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Edit));
