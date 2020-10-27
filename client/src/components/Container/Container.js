import React from "react";
import { Row, Col } from "react-bootstrap";

import PropTypes from "prop-types";

import "./Container.css";

const Container = ({
  styleNumber,
  child,
  title,
  divider,
  redirect,
  className,
}) => {
  const styles = ["containerV1", "containerV2"];

  return (
    <div
      className={`${styles[styleNumber]} ${className} myContainer align-self-center`}
    >
      {title && (
        <Row className="containerTitle">
          <Col className="p-0">{title}</Col>
        </Row>
      )}
      {child}
      {divider && <div className="divider"></div>}
      {redirect && (
        <Row className="redirect">
          <Col className="p-0">{redirect}</Col>
        </Row>
      )}
    </div>
  );
};

Container.propTypes = {
  styleNumber: PropTypes.number,
  child: PropTypes.node,
  title: PropTypes.node,
  divider: PropTypes.bool,
  redirect: PropTypes.node,
};
Container.defaultTypes = {
  styleNumber: 0,
  child: null,
  title: null,
  divider: false,
  redirect: null,
};

export default Container;
