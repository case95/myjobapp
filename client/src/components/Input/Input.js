import React from "react";
import PropTypes from "prop-types";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import "./Input.css";

const input = ({
  child,
  label,
  labelClassName,
  placeholder,
  idNumber,
  name,
  required,
  type,
  maxLength,
  spacer,
  append,
  prepend,
  className,
  select,
  options,
  ...otherProps
}) => {
  return (
    <div>
      <InputGroup className={spacer && "mb-3"} >
        {/*if append = true className will have a myButtonAppend */}
        {/*if prepend = true className will have a myButtonPrepend */}
        {label && <Form.Label className={labelClassName}>{label}</Form.Label>}
        <Form.Control
          className={`myInput
          ${prepend ? `myInputPrepend` : ``}
          ${append ? `myInputAppend` : ``} ${className}`}
          id={`input${idNumber}`}
          aria-describedby="basic-addon3"
          placeholder={placeholder}
          name={name}
          required={required}
          type={type}
          as = {select ? "select" : "input"}
          {...otherProps}>
          
            {select && options}
          
          </Form.Control>
        
        {!select && child}
      </InputGroup>
    </div>
  );
};

input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  idNumber: PropTypes.number,
  name: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  maxLength: PropTypes.number,
  spacer: PropTypes.bool,
  append: PropTypes.bool,
  prepend: PropTypes.bool,
};

input.defaultProps = {
  maxLength: 30,
  spacer: true,
  prepend: false,
  append: false,
};

export default input;
