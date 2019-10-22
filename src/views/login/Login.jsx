import React, { Fragment } from '../../../node_modules/react';

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col
} from '../../../node_modules/reactstrap';
import { connect } from 'react-redux';
import { authLogin } from '../../redux/actions/Index.jsx';
import swal from 'sweetalert2';
import validator from 'validator';
import { getAlertToast } from '../common/helpers/functions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false
    };
    this.onClickLogin = this.onClickLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidUpdate() {
    if (this.props.loginData.isLogin) {
      swal.fire(getAlertToast('success', 'Login Success'));
      this.props.history.push('/admin/index');
    }
  }
  onClickLogin() {
    const { email, password } = this.state;
    if (!email || !password) {
      swal.fire(getAlertToast('warning', 'Enter credentials'));
      return;
    }
    if (!validator.isEmail(email)) {
      swal.fire(getAlertToast('warning', 'Enter valid email'));
      return;
    }
    this.props.authLogin({ email, password });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let {
      loginData: { loading }
    } = this.props;
    let { email, password } = this.state;
    return (
      <Fragment>
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">Login</div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </FormGroup>
                {/* <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div> */}
                <div className="text-center">
                  <Button
                    className="my-4"
                    color="primary"
                    type="button"
                    onClick={this.onClickLogin}
                    disabled={loading}
                  >
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          {/* <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="Register.jsx"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row> */}
        </Col>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    loginData: state.authLogin
  };
};
export default connect(
  getState,
  {
    authLogin
  }
)(Login);
