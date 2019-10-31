import React from 'react';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
class Header extends React.Component {
  render() {
    const {
      dashboard = {
        report: {}
      }
    } = this.props.Dashboard;
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-md-8"
          style={{
            minHeight: '400px',
            backgroundImage:
              'url(' + require('assets/img/theme/header-index-cover.jpg') + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Reg Users
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {dashboard.report.users}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                            <i className="fas fa-user"></i>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Reg vehicles
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {dashboard.report.vehicles}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="fas fa-car"></i>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Due Services
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {' '}
                            {dashboard.report.services}
                          </span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                            <i className="fas fa-wrench"></i>
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Amount Received
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">253</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-dollar-sign" />
                          </div>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}
const getState = state => {
  return {
    loginData: state.authLogin,
    Dashboard: state.dashboard
  };
};
export default connect(
  getState,
  {}
)(Header);
