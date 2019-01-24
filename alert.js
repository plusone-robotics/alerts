"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.AlertProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Snackbar = _interopRequireDefault(require("@material-ui/core/Snackbar"));

var _SnackbarContent = _interopRequireDefault(require("@material-ui/core/SnackbarContent"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _CheckCircle = _interopRequireDefault(require("@material-ui/icons/CheckCircle"));

var _Error = _interopRequireDefault(require("@material-ui/icons/Error"));

var _Warning = _interopRequireDefault(require("@material-ui/icons/Warning"));

var _Info = _interopRequireDefault(require("@material-ui/icons/Info"));

var _Close = _interopRequireDefault(require("@material-ui/icons/Close"));

var _styles = require("@material-ui/core/styles");

var _green = _interopRequireDefault(require("@material-ui/core/colors/green"));

var _amber = _interopRequireDefault(require("@material-ui/core/colors/amber"));

var _blue = _interopRequireDefault(require("@material-ui/core/colors/blue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var cssStyles = function cssStyles(theme) {
  return {
    success: {
      backgroundColor: _green.default[600]
    },
    error: {
      backgroundColor: theme.palette.error.dark
    },
    info: {
      backgroundColor: _blue.default[700]
    },
    warning: {
      backgroundColor: _amber.default[700]
    },
    icon: {
      fontSize: 20
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit
    },
    message: {
      display: "flex",
      alignItems: "center"
    },
    margin: {
      margin: theme.spacing.unit
    }
  };
};

var AlertProvider = _react.default.createContext();

exports.AlertProvider = AlertProvider;

var Alert =
/*#__PURE__*/
function (_Component) {
  _inherits(Alert, _Component);

  function Alert() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Alert);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Alert)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "queue", []);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleAddAlert", function (alert) {
      _this.queue.push({
        key: new Date().getTime(),
        variant: alert.variant,
        message: alert.message
      });

      if (_this.state.open) {
        _this.setState({
          open: false
        });
      } else {
        _this.processQueue();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      open: false,
      alert: {
        key: 0,
        message: "message",
        variant: "info"
      },
      addAlert: _this.handleAddAlert
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "processQueue", function () {
      if (_this.queue.length > 0) {
        _this.setState({
          alert: _this.queue.shift(),
          open: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleClose", function (event, reason) {
      if (reason === "clickaway") {
        return;
      }

      _this.setState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleExited", function () {
      _this.processQueue();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "variantIcon", {
      success: _CheckCircle.default,
      warning: _Warning.default,
      error: _Error.default,
      info: _Info.default
    });

    return _this;
  }

  _createClass(Alert, [{
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      var Icon = this.variantIcon[this.state.alert.variant];
      return _react.default.createElement(AlertProvider.Provider, {
        value: this.state
      }, this.props.children, _react.default.createElement(_Snackbar.default, {
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left"
        },
        open: this.state.open,
        autoHideDuration: 6000,
        onClose: this.handleClose,
        onExited: this.handleExited
      }, _react.default.createElement(_SnackbarContent.default, {
        onClose: this.handleClose,
        className: (0, _classnames.default)(classes[this.state.alert.variant], _classnames.default),
        message: _react.default.createElement("span", {
          id: "client-snackbar",
          className: classes.message
        }, _react.default.createElement(Icon, {
          className: (0, _classnames.default)(classes.icon, classes.iconVariant)
        }), this.state.alert.message),
        action: [_react.default.createElement(_IconButton.default, {
          key: "close",
          "aria-label": "Close",
          color: "inherit",
          className: classes.close,
          onClick: this.handleClose
        }, _react.default.createElement(_Close.default, {
          className: classes.icon
        }))]
      })));
    }
  }]);

  return Alert;
}(_react.Component);

var _default = (0, _styles.withStyles)(cssStyles)(Alert);

exports.default = _default;

