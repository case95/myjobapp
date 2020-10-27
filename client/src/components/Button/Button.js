import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

import "./Button.css";

const MyButton = ({ type, child, onClick, append, prepend, className }) => {
  /*if append = true className will have a myButtonAppend */
  /*if prepend = true className will have a myButtonPrepend */
  return (
    <Button
      type={type}
      onClick={onClick}
      className={`myButton
      ${prepend ? `myButtonPrepend` : ``}
      ${append ? `myButtonAppend` : ``} ${className}`}
    >
      {child}
    </Button>
  );
};

MyButton.propTypes = {
  child: PropTypes.node,
  type: PropTypes.string,
  styleNumber: PropTypes.number,
  onClick: PropTypes.func,
  append: PropTypes.bool,
  prepend: PropTypes.bool,
};

MyButton.defaultProps = {
  styleNumber: 0,
  type: "submit",
  child: "Submit",
  prepend: false,
  append: false,
};
export default MyButton;
