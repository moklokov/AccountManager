import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";

import Form from "../../common/form/index";
import createUserService from "../../../services/create_user_service";

class Create extends Component {
  render() {
    const { validErrors } = this.props;
    let date = new Date();
    date.setFullYear(date.getFullYear() - 18);
    return (
      <>
        <Typography align="center">
          <h2 className="text">Create user</h2>
        </Typography>
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
  validErrors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { validErrors: state.validErrors };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: attrs => dispatch(createUserService(attrs))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
