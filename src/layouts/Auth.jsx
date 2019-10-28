import React from 'react';
import { Route, Switch } from 'react-router-dom';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';

// core components
import AuthNavbar from 'components/Navbars/AuthNavbar.jsx';
import { connect } from 'react-redux';
import routes from 'routes.js';
import logo from '../assets/img/brand/popthehood-logo.png';
class Auth extends React.Component {
  componentDidMount() {
    document.body.classList.add('bg-default');
  }
  componentWillUnmount() {
    document.body.classList.remove('bg-default');
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  render() {
    if (this.props.loginData.isLogin) {
      this.props.history.push('/admin/index');
    }
    return (
      <>
        <div
          className="main-content"
          style={{
            minHeight: '100vh',
            backgroundImage:
              'url(' + require('assets/img/theme/header-index-cover.jpg') + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <AuthNavbar />
          <div className="header py-6">
            <Container>
              <div className="header-body text-center mb-7">
                <Row className="justify-content-center">
                  <Col lg="5" md="6">
                    <h1 className="text-white">
                      <img
                        alt="logo"
                        className="navbar-brand-img w-75"
                        src={logo}
                      />
                    </h1>
                  </Col>
                </Row>
              </div>
            </Container>
            <div className="separator separator-bottom separator-skew zindex-100">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-default"
                  points="2560 0 2560 100 0 100"
                />
              </svg> */}
            </div>
          </div>
          {/* Page content */}
          <Container className="mt--8 pb-5">
            <Row className="justify-content-center">
              <Switch>{this.getRoutes(routes)}</Switch>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}
const getState = state => {
  return {
    loginData: state.authLogin
  };
};
export default connect(getState)(Auth);
