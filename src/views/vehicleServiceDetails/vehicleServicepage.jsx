import React, { Component } from 'react';
import 'react-table/react-table.css';
import { AvForm } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import * as Datetime from 'react-datetime';
// reactstrap components
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Modal,
  Spinner
} from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.jsx';
import {
  vehicleServiceDetails,
  updateVehicleService
} from '../../redux/actions/Index';
import { preventDefaultFn, dateTimeFormat } from '../common/helpers/functions';
import PdfContainer from '../common/pdfContainer/PdfContainer';
import Doc from '../../assets/js/DocService';
import imageNotAvailable from '../../assets/img/icons/common/vehicle_not_available.png';
import GoogleMapReact from 'google-map-react';
import MyGreatPlace from '../map/place';
import PropTypes from 'prop-types';
const pointerStyle = { cursor: 'text' };

class vehicleServicepage extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    greatPlaceCoords: PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      vehicleId: null,
      editScheduleModal: false,
      requestedServiceDate: '',
      status: '',
      servicePlanID: null,
      scheduleID: null,
      actualServiceDate: '',
      serviceOutDate: ''
    };
    this.editShedule = this.editShedule.bind(this);
    this.formDataChange = this.formDataChange.bind(this);
    this.updateVehicleServideDetails = this.updateVehicleServideDetails.bind(
      this
    );
    this.handleInput = this.handleInput.bind(this);
  }
  handleInput = event => {
    const formattedDate = dateTimeFormat(event._d);
    this.setState({ requestedServiceDate: formattedDate });
  };
  //Update Schedule
  updateVehicleServideDetails(update_type) {
    const {
      scheduleID,
      serviceID,
      requestedServiceDate,
      actualServiceDate,
      serviceOutDate,
      status,
      vehicleId
    } = this.state;
    const reload_data = {
      VehicleId: parseInt(vehicleId)
    };

    var data = {
      scheduleID: parseInt(scheduleID),
      serviceID: parseInt(serviceID),
      requestedServiceDate: requestedServiceDate,
      actualServiceDate: actualServiceDate,
      serviceOutDate: serviceOutDate,
      status: update_type === 'update_status' ? 'Completed' : status
    };
    this.props.updateVehicleService(data, reload_data);
  }
  //Form Data Change
  formDataChange(e) {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }
  //Edit Schedule Modal
  editShedule(e) {
    var {
      schedule_id = '',
      requested_service_date = '',
      status = ''
    } = e.currentTarget.dataset;
    this.setState(prevState => ({
      editScheduleModal: !prevState.editScheduleModal,
      scheduleID: schedule_id,
      requestedServiceDate: dateTimeFormat(requested_service_date),
      status: status
    }));
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.setState({ vehicleId: params.id });
    const data = {
      VehicleId: parseInt(params.id)
    };
    this.props.vehicleServiceDetails(data);
  }

  exportPDFWithComponent = () => {
    this.pdfExportComponent.save();
  };

  createPdf = html => Doc.createPdf(html);
  render() {
    const {
      updateVehicleServiceResponse: {
        data: update_response = [],
        loading: update_loading = ''
      }
    } = this.props;

    const { editScheduleModal, requestedServiceDate, status } = this.state;
    const vehicle_ser_data =
      this.props.vehicleServiceDetailsResponse.data || [];
    const vehicleInfo = vehicle_ser_data.vehicleInfo || [];
    const paymentinfo = vehicle_ser_data.paymentinfo || [];
    const planInfoList = vehicle_ser_data.planInfoList || [];
    const serviceList = vehicle_ser_data.serviceList || [];
    const userInfo = vehicle_ser_data.userInfo || [];
    const lat = parseFloat(userInfo.locationLatitude) || '';
    const lng = parseFloat(userInfo.locationLongitude) || '';
    const serv_det = serviceList
      .filter((serv_lst, index) => !index)
      .map(list => list);

    const payment_tbl_column = [
      'Date',
      'Type',
      'Status',
      'Total Amount',
      'Discount',
      'Paid',
      'Due'
    ];
    const serv_list_column = [
      'SERVICE DATE',
      'SERVICE ITEMS',
      'STATUS',
      'COMMENTS'
    ];

    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7">
          <Row>
            <div className="col">
              <Card className="shadow p-4">
                <PdfContainer createPdf={this.createPdf}>
                  <Row>
                    <Col>
                      <Row>
                        <Col md="4" className="item-middle">
                          <div className="ServiceReport-imgcard">
                            <img
                              src={
                                vehicleInfo.vehicleImageURL || imageNotAvailable
                              }
                              // crossOrigin="anonymous"
                            />
                          </div>
                        </Col>
                        <Col md="8" className="">
                          <div className="licence-plate">
                            <h4>
                              LICENCE PLATE NO :{' '}
                              <span>{vehicleInfo.licensePlate}</span>
                            </h4>
                          </div>
                          <div className="card-profile shadow card mt-4">
                            <ListGroup flush>
                              <ListGroupItem>
                                <span>Model </span>
                                <span className="licenceplate-pdf-right-value">
                                  {vehicleInfo.model}
                                </span>
                              </ListGroupItem>
                              <ListGroupItem>
                                <span>Make</span>
                                <span className="licenceplate-pdf-right-value">
                                  {vehicleInfo.make}
                                </span>
                              </ListGroupItem>
                              <ListGroupItem>
                                <span>Year </span>
                                <span className="licenceplate-pdf-right-value">
                                  {vehicleInfo.year}
                                </span>
                              </ListGroupItem>
                              <ListGroupItem>
                                <span>Color </span>
                                <span className="licenceplate-pdf-right-value">
                                  {vehicleInfo.color}
                                </span>
                              </ListGroupItem>
                            </ListGroup>
                          </div>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="6">
                          {/* User Name details */}
                          <div className="card-profile shadow card mt-4">
                            <div className="pt-0 pt-md-4 card-body">
                              <ul className="licence-plate-userDetails">
                                <li>
                                  <span> User Name</span>{' '}
                                  <h5>{userInfo.name}</h5>
                                </li>

                                <li>
                                  <span> Phone Number</span>{' '}
                                  <h5>{userInfo.phoneNumber}</h5>
                                </li>
                                <li>
                                  <span> E-mail</span> <h5>{userInfo.email}</h5>
                                </li>
                                <li>
                                  <span> Address</span>{' '}
                                  <h5>{userInfo.locationFullAddress}</h5>
                                </li>
                                <li>
                                  <span> IsEmailVerified</span>{' '}
                                  <h5>
                                    {userInfo.isEmailVerified === true
                                      ? 'true'
                                      : 'false'}
                                  </h5>
                                </li>
                                <li>
                                  <span> IsPhoneNumVerified</span>{' '}
                                  <h5>
                                    {userInfo.isPhoneNumVerified === true
                                      ? 'true'
                                      : 'false'}
                                  </h5>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Col>
                        <Col md="6">
                          <div className="card-profile shadow card mt-4 p-3">
                            <ul className="licence-plate-userDetails">
                              <li>
                                <span> Remainder minutes</span>
                                <Button className="float-right btn btn-default btn-sm">
                                  {!serv_det.remainderMinutes
                                    ? '0'
                                    : serv_det.remainderMinutes}{' '}
                                  minutes
                                </Button>
                              </li>
                              <li>
                                <span> Terms & Conditions</span>
                                <Button
                                  className={
                                    serv_det.isTeamsandConditionsAccepted
                                      ? 'float-right btn btn-success btn-sm'
                                      : 'float-right btn btn-danger btn-sm'
                                  }
                                >
                                  {serv_det.isTeamsandConditionsAccepted
                                    ? 'Accepted'
                                    : 'Not-Accepted'}
                                </Button>
                              </li>
                              <li className="mb-1">
                                <span>Location</span>
                                <div
                                  style={{
                                    minHeight: '227px',
                                    maxHeight: '227px',
                                    height: '227px',
                                    width: '100%'
                                  }}
                                >
                                  {lat && lng ? (
                                    <GoogleMapReact
                                      bootstrapURLKeys={{
                                        key:
                                          'AIzaSyCJiuQH8jfY9rJ_HVvXBnQfhIvQe3N9KpY'
                                      }}
                                      center={{
                                        lat: lat,
                                        lng: lng
                                      }}
                                      zoom={10}
                                    >
                                      <MyGreatPlace
                                        lat={lat}
                                        lng={lng}
                                        text={'A'}
                                      />
                                    </GoogleMapReact>
                                  ) : (
                                    <div>No location Found!</div>
                                  )}
                                </div>
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col></Col>
                      </Row>
                    </Col>
                  </Row>
                  {/* Service Details */}
                  <Card className="shadow mt-5" body>
                    <h3>Service Details</h3>

                    <Row>
                      <Col>
                        <Card className="shadow mt-3" body>
                          <Row className="Vehicle-Service-plantype">
                            <Col sm="2">
                              <Button
                                className="btn btn-default btn-sm "
                                style={pointerStyle}
                              >
                                Plan Type
                              </Button>
                            </Col>
                            <Col sm="10">
                              <h5>
                                {planInfoList
                                  .filter((plan_value, index) => !index)
                                  .map(plan => plan.planType)}
                              </h5>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Card className="shadow mt-3" body>
                          <Row>
                            <Col>
                              <Button
                                className="btn btn-default btn-sm mb-1"
                                style={pointerStyle}
                              >
                                Services
                              </Button>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Table
                                className="align-items-center table-flush"
                                responsive
                              >
                                <thead className="thead-light">
                                  <tr>
                                    <th scope="col">Serives</th>
                                    <th scope="col">Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {planInfoList.map((plan_data, index) => (
                                    <tr key={index}>
                                      <td>{plan_data.serviceNameList}</td>
                                      <td>{plan_data.serviceDescription}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </Col>
                          </Row>
                        </Card>
                      </Col>
                    </Row>
                  </Card>
                  {/* Subscription Schedules */}
                  <Card className="shadow mt-5" body>
                    <h3 className="mb-3">Subscription Schedules</h3>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          {serv_list_column.map((column_head, index) => (
                            <th key={index} scope="col">
                              {column_head}
                            </th>
                          ))}
                          <th scope="col" />
                        </tr>
                      </thead>
                      <tbody>
                        {update_loading ? (
                          <center>
                            <Spinner size="sm" color="primary" />
                          </center>
                        ) : (
                          ''
                        )}
                        {serviceList.map((data, index) => (
                          <tr key={index}>
                            <td scope="row">{data.requestedServiceDate}</td>
                            <td>{data.serviceName}</td>
                            <td>{data.status}</td>
                            <td>{data.serviceAmount}</td>
                            <td className="text-right">
                              {data.status !== 'Completed' ? (
                                <UncontrolledDropdown>
                                  <DropdownToggle
                                    className="btn-icon-only text-light"
                                    href="#pablo"
                                    role="button"
                                    size="sm"
                                    color=""
                                    onClick={preventDefaultFn}
                                  >
                                    <i className="fas fa-ellipsis-v" />
                                  </DropdownToggle>
                                  <DropdownMenu
                                    className="dropdown-menu-arrow"
                                    right
                                  >
                                    <DropdownItem
                                      href="#pablo"
                                      onClick={preventDefaultFn}
                                    >
                                      <Button
                                        color="primary"
                                        size="sm"
                                        type="button"
                                        data-service_id={data.serviceID}
                                        data-schedule_id={data.scheduleID}
                                        data-requested_service_date={
                                          data.requestedServiceDate
                                        }
                                        data-actual_service_date={
                                          data.actualServiceDate
                                        }
                                        data-service_out_date={
                                          data.serviceOutDate
                                        }
                                        data-status={data.status}
                                        onClick={this.editShedule}
                                      >
                                        <i className="fas fa-edit"></i> Edit
                                      </Button>
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              ) : (
                                ''
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card>
                  {/* Payment History */}
                  <Card className="shadow mt-5" body>
                    <h3 className="mb-3">Payment History</h3>
                    <Table
                      className="align-items-center table-flush"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          {payment_tbl_column.map((column, index) => (
                            <th key={index} scope="col">
                              {column}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">{paymentinfo.paymentDate}</th>
                          <td>{paymentinfo.paymentType}</td>
                          <td>{paymentinfo.paymentStatus}</td>
                          <td>{paymentinfo.totalAmount}</td>
                          <td>{paymentinfo.promocode_ReducedAmount}</td>
                          <td>{paymentinfo.paid}</td>
                          <td>{paymentinfo.due}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </PdfContainer>
              </Card>
            </div>
          </Row>
          <Modal
            className="modal-dialog-centered"
            isOpen={editScheduleModal}
            toggle={this.editShedule}
          >
            <div className="modal-header">
              <h4 className="modal-title" id="modal-title-default">
                Update Schedule
              </h4>
              <button
                aria-label="Close"
                className="close"
                data-dismiss="modal"
                type="button"
                onClick={this.editShedule}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className="modal-body">
              <AvForm
                onValidSubmit={() =>
                  this.updateVehicleServideDetails('update_date')
                }
              >
                <label>Requested Service Date</label>
                <Datetime
                  dateFormat="YYYY/MM/DD"
                  timeFormat="HH:MM:SS"
                  name="requestedServiceDate"
                  onChange={this.handleInput}
                  value={requestedServiceDate}
                  required
                />
                <br />
                <center>
                  <Button color="success">Update</Button>
                </center>
              </AvForm>
              {status !== 'On Due' ? (
                <center>
                  <hr />
                  <Button
                    color="success"
                    onClick={() =>
                      this.updateVehicleServideDetails('update_status')
                    }
                  >
                    Complete Schedule{' '}
                  </Button>
                </center>
              ) : (
                ''
              )}
            </div>
            <div className="modal-footer"></div>
          </Modal>
        </Container>
      </>
    );
  }
}
const getState = state => {
  return {
    vehicleServiceDetailsResponse: state.vehicleServiceDetails,
    updateVehicleServiceResponse: state.updateVehicleService
  };
};
export default connect(
  getState,
  {
    vehicleServiceDetails,
    updateVehicleService
  }
)(vehicleServicepage);
