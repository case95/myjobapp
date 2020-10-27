import React from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

import { Form, InputGroup } from "react-bootstrap";

import Container from "../../Container/Container";
import Button from "../../Button/Button";
import Input from "../../Input/Input";

import "./Homepage.css";

const Homepage = () => {
  const [Browse, setBrowse] = useState({});

  const { value, error } = Browse;

  const onChange = (e) => {
    setBrowse({
      ...Browse,
      value: e.target.value,
    });
  };

  const onSubmit = async () => {
    try {
    } catch (err) {
      console.log(err);
      setBrowse({
        ...Browse,
        error: "No matching results were found.",
      });
    }
  };

  return (
    <div className="heroImage d-flex">
      <Container
        styleNumber={0}
        title={
          <p className="m-0">
            Search among 1000+ workers <br />
            and services in your area, <br />
            they’re just one click from you!
          </p>
        }
        divider={true}
        redirect={
          <div>
            <Link to="/login" className="link">
              Login to your profile
            </Link>
            <p className="mb-0">or</p>
            <Link to="/register" className="link">
              Create a new account
            </Link>
          </div>
        }
        child={
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit(e);
            }}
          >
            <Input
              placeholder="Browse"
              type="string"
              value={value}
              name="Browse"
              idNumber={0}
              required={true}
              spacer={false}
              onChange={(e) => onChange(e)}
              prepend={true}
              child={
                <div>
                  <InputGroup.Append>
                    <Button
                      type={"submit"}
                      append={true}
                      style={{ height: "100%" }}
                      child={
                        <i className="fa fa-search" aria-hidden="true"></i>
                      }
                    ></Button>
                  </InputGroup.Append>
                  {error && <div className="text-danger mb-3">{error}</div>}
                </div>
              }
            ></Input>
          </Form>
        }
      ></Container>
    </div>
  );
};

export default Homepage;
