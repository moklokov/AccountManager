import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class ConfirmDialog extends Component {
  state = { isOpen: false };

  handleToggle = () =>
    this.setState(state => ({
      isOpen: !state.isOpen
    }));

  handleConfirm = () => {
    this.props.onConfirm();
    this.handleToggle();
  };

  render() {
    const { isOpen } = this.state;
    const { title, message, children } = this.props;
    return (
      <>
        {!!children ? children(this.handleToggle) : undefined}
        <Dialog
          open={isOpen}
          onClose={this.handleToggle}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggle}>Cancel</Button>
            <Button
              onClick={this.handleConfirm}
              color="primary"
              variant="contained"
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  onConfirm: PropTypes.func
};

export default ConfirmDialog;
