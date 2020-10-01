import React from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const input = ({
  label,
  placeholder,
  idNumber,
  name,
  required,
  type,
  maxLength,
  ...otherProps
}) => {
  return (
    <div>
      <label htmlFor="basic-url">{label}</label>
      <InputGroup className="mb-3" {...otherProps}>
        <Form.Control
          id={`input${idNumber}`}
          aria-describedby="basic-addon3"
          placeholder={placeholder}
          name={name}
          required={required}
          type={type}
        />
      </InputGroup>
    </div>
  );
};

export default input;
