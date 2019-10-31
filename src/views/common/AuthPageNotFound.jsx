import React, { Component, Fragment } from 'react';
import { Card, Alert, Col, CardBody } from 'reactstrap';

class AuthPageNotFound extends Component {
  render() {
    return (
      <Fragment>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Alert color="primary">
                <p className="text-center"> 404 Page Not Found </p>
              </Alert>
            </CardBody>
          </Card>
        </Col>
      </Fragment>
    );
  }
}

export default AuthPageNotFound;
