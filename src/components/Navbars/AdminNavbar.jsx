import React from 'react';
import { connect } from 'react-redux';
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media
} from 'reactstrap';
import img from '../../assets/img/icons/common/avatar2.jpg';
class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onClickLogout = this.onClickLogout.bind(this);
  }
  onClickLogout() {
    localStorage.clear();
    window.location.href = '/auth/login';
  }
  render() {
    const { user = {} } = this.props.loginData;
    const { name = '' } = user;
    return (
      <>
        <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
          <Container fluid>
            <div className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block">
              {this.props.brandText}
            </div>
            <Nav className="align-items-center d-none d-md-flex" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle className="pr-0" nav>
                  <Media className="align-items-center">
                    <span className="avatar avatar-sm rounded-circle">
                      <img alt="..." src={img} />
                    </span>
                    <Media className="ml-2 d-none d-lg-block">
                      <span className="mb-0 text-sm font-weight-bold">
                        {name || ''}
                      </span>
                    </Media>
                  </Media>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem href="#pablo" onClick={this.onClickLogout}>
                    <i className="ni ni-button-power" />
                    <span>Logout</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
      </>
    );
  }
}

const getState = state => {
  return {
    loginData: state.authLogin || []
  };
};
export default connect(getState)(AdminNavbar);
