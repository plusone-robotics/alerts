import React, { Component } from "react";
import classNames from "classnames";

import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";

import { withStyles } from "@material-ui/core/styles";
import { styles } from "./alert.css.js";

export const AlertProvider = React.createContext();

class Alert extends Component {
  queue = [];

  handleAddAlert = alert => {
    this.queue.push({
      key: new Date().getTime(),
      variant: alert.variant,
      message: alert.message
    });
    if (this.state.open) {
      this.setState({
        open: false
      });
    } else {
      this.processQueue();
    }
  };

  state = {
    open: false,
    alert: {
      key: 0,
      message: "message",
      variant: "info"
    },
    addAlert: this.handleAddAlert
  };

  processQueue = () => {
    if (this.queue.length > 0) {
      this.setState({
        alert: this.queue.shift(),
        open: true
      });
    }
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({
      open: false
    });
  };

  handleExited = () => {
    this.processQueue();
  };

  variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon
  };

  render() {
    const { classes } = this.props;
    const Icon = this.variantIcon[this.state.alert.variant];
    return (
      <AlertProvider.Provider value={this.state}>
        {this.props.children}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          onExited={this.handleExited}
        >
          <SnackbarContent
            onClose={this.handleClose}
            className={classNames(
              classes[this.state.alert.variant],
              classNames
            )}
            message={
              <span id="client-snackbar" className={classes.message}>
                <Icon
                  className={classNames(classes.icon, classes.iconVariant)}
                />
                {this.state.alert.message}
              </span>
            }
            action={[
              <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={this.handleClose}
              >
                <CloseIcon className={classes.icon} />
              </IconButton>
            ]}
          />
        </Snackbar>
      </AlertProvider.Provider>
    );
  }
}

export default withStyles(styles)(Alert);
