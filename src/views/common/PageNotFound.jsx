import React, { Component, Fragment } from 'react';
import { Container, Row, Card, Alert } from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.jsx';
class PageNotFound extends Component {
  render() {
    return (
      <Fragment>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <Alert color="primary">
                  <p className="text-center"> 404 Page Not Found </p>
                </Alert>
              </Card>
            </div>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default PageNotFound;
