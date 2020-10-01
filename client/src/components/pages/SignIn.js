import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Input from "../Input/Input";

import AuthenticationServices from "../../services/AuthenticationServices";

const SignIn = () => {
  const [userData, setUserData] = useState({});

  const {
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
    error,
  } = userData;

  const history = useHistory();

  const redirect = () => {
    history.push("/home");
  };

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    try {
      if (password === repeatPassword) {
        AuthenticationServices.register({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }).then(redirect);
      } else {
        setUserData({
          ...userData,
          error: "Passwords don't match",
        });
      }
    } catch (err) {
      console.log(err);
      setUserData({
        ...userData,
        error: err.response.data.error,
      });
    }
  };

  return (
    <Container
      fluid
      className="mx-auto p-5"
      style={{ backgroundColor: "#ddd" }}
    >
      <Row>
        <Col>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
            }}
          >
            <Input
              label="Your name"
              placeholder="Insert your name"
              type="string"
              value={firstName}
              name="firstName"
              idNumber="0"
              onChange={(e) => onChange(e)}
              required={true}
              maxLength="5"
            ></Input>
            <Input
              label="Your last name"
              placeholder="Insert your last name"
              type="string"
              value={lastName}
              name="lastName"
              idNumber="1"
              onChange={(e) => onChange(e)}
              required={true}
            ></Input>
            <Input
              label="Your email"
              placeholder="Insert your email"
              type="email"
              value={email}
              name="email"
              idNumber="2"
              onChange={(e) => onChange(e)}
              required={true}
            ></Input>
            <Input
              label="Choose a password"
              placeholder="Insert a password"
              type="password"
              value={password}
              name="password"
              idNumber="3"
              onChange={(e) => onChange(e)}
              required={true}
            ></Input>
            <Input
              className="mb-0"
              label="Repeat password"
              placeholder="Repeat the password"
              type="password"
              name="repeatPassword"
              idNumber="4"
              onChange={(e) => onChange(e)}
              required={true}
            ></Input>

            <div className="mb-3 text-danger">{error}</div>

            <Button type="submit">Register</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;

/*<Input label="Your State" placeholder="Select your state" idNumber="4" ></Input>
<Input label="Local ZIP Code" placeholder="Insert ZIP code" idNumber="5" ></Input>
<Input label="Your Skillset (max. 5)" placeholder="Choose your skillset" idNumber="6" ></Input>

<Input label="Your Bio" placeholder="Write a short bio (max. 300)" idNumber="7" ></Input>*/
