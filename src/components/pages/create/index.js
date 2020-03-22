import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles.css";
import Form from "../../common/form/index";
import createUserService from "../../../services/create_user_service";

class Create extends Component {
  render() {
    const { validErrors, classes } = this.props;
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return (
      <>
        <h2 className={classes.title}>Create user</h2>
        <Form
          fields={{
            username: "",
            firstname: "",
            lastname: "",
            password: "",
            repeatPassword: "",
            skills: [],
            language: "",
            gender: "",
            info: "",
            company: "",
            email: "",
            birthdate: date
          }}
          errors={validErrors}
          onSubmit={this.handleCreateUser}
          onCancel={this.handleCancel}
        />
      </>
    );
  }

  handleCreateUser = async attrs => {
    await this.props.createUser(attrs);
    if (Object.values(this.props.validErrors).length === 0) {
      this.props.history.push("/");
    }
  };

  handleCancel = _ => this.props.history.push("/");
}

Create.propTypes = {
  validErrors: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { validErrors: state.validErrors };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: attrs => dispatch(createUserService(attrs))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Create));
