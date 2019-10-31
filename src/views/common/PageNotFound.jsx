import React, { Component, Fragment } from 'react';
import { Card, Container, Row } from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.jsx';

class PageNotFound extends Component {
  render() {
    return (
      <Fragment>
        <UserHeader />
        <Container className="mt--7">
          <Row>
            <div className="col">
              <Card className="shadow p-4">
                <div id="notfound">
                  <div className="notfound">
                    <div className="notfound-404">
                      <h3>Oops! Page not found</h3>
                      <h1>
                        <span>4</span>
                        <span>0</span>
                        <span>4</span>
                      </h1>
                    </div>
                    <h2>
                      we are sorry, but the page you requested was not found
                    </h2>
                  </div>
                </div>
              </Card>
            </div>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

export default PageNotFound;
