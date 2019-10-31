import React, { Component, Fragment } from 'react';
import 'react-table/react-table.css';
import { AvForm } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
import * as Datetime from 'react-datetime';
// import 'react-datetime/css/react-datetime.css';
// reactstrap components
import {
  Collapse,
  UncontrolledTooltip,
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
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { lat_lng_value } from '../common/helpers/Variables';
import { preventDefaultFn, dateTimeFormat } from '../common/helpers/functions';
import PdfContainer from '../common/pdfContainer/PdfContainer';
import Doc from '../../assets/js/DocService';
import imageNotAvailable from '../../assets/img/icons/common/vehicle_not_available.png';
import swal from 'sweetalert2';
import moment from 'moment';
const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={props.lng_lat_value}
      defaultOptions={{
        scrollwheel: false,
        styles: [
          {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#444444' }]
          },
          {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [{ color: '#f2f2f2' }]
          },
          {
            featureType: 'poi',
            elementType: 'all',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'road',
            elementType: 'all',
            stylers: [{ saturation: -100 }, { lightness: 45 }]
          },
          {
            featureType: 'road.highway',
            elementType: 'all',
            stylers: [{ visibility: 'simplified' }]
          },
          {
            featureType: 'road.arterial',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'all',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'water',
            elementType: 'all',
            stylers: [{ color: '#5e72e4' }, { visibility: 'on' }]
          }
        ]
      }}
    >
      <Marker position={lat_lng_value} />
    </GoogleMap>
  ))
);

class vehicleServicepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleId: null,
      editScheduleModal: false,
      requestedServiceDate: '',
      status: '',
      servicePlanID: null,
      scheduleID: null,
      comments: '',
      serviceOutDate: '',
      collapse: false
    };
    this.editShedule = this.editShedule.bind(this);
    this.formDataChange = this.formDataChange.bind(this);
    this.updateVehicleServiceDetails = this.updateVehicleServiceDetails.bind(
      this
    );
    this.handleInput = this.handleInput.bind(this);
    this.handleInputOutService = this.handleInputOutService.bind(this);
    this.completeSchedule = this.completeSchedule.bind(this);
  }
  completeSchedule() {
    this.setState(prevState => ({
      collapse: !prevState.collapse
    }));
  }
  handleInput = event => {
    this.setState({ requestedServiceDate: event._d });
  };
  handleInputOutService = event => {
    this.setState({ serviceOutDate: event._d });
  };
  //Update Schedule
  updateVehicleServiceDetails(update_type) {
    let storePermission = false;
    let setAlert = false;
    let reqType = '';
    let {
      scheduleID,
      requestedServiceDate,
      comments,
      serviceOutDate,
      status,
      vehicleId
    } = this.state;
    if (update_type === 'update_status') {
      if (serviceOutDate) {
        setAlert = false;
        storePermission = true;
      } else {
        setAlert = true;
        reqType = 'Service Out Date Required';
        storePermission = false;
      }
    } else {
      if (requestedServiceDate) {
        setAlert = false;
        storePermission = true;
      } else {
        setAlert = true;
        reqType = 'Requested Service Date Required';
        storePermission = false;
      }
    }
    if (setAlert) {
      swal.fire({
        text: reqType,
        type: 'warning',
        confirmButtonColor: '#3085d6'
      });
    }
    if (storePermission) {
      const reload_data = {
        VehicleId: parseInt(vehicleId)
      };
      var data = {
        scheduleID: parseInt(scheduleID),
        requestedServiceDate: moment(
          requestedServiceDate,
          'DD/MM/YYYY HH:mm:ss'
        ).format('YYYY/MM/DD HH:mm:ss'),
        comments: comments,
        serviceOutDate: serviceOutDate
          ? moment(serviceOutDate, 'DD/MM/YYYY HH:mm:ss').format(
            'YYYY/MM/DD HH:mm:ss'
          )
          : '',
        status: update_type === 'update_status' ? 'Completed' : status
      };

      this.props.updateVehicleService(data, reload_data);
      this.setState({
        editScheduleModal: false
      });
    }
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
      service_out_date = '',
      status = '',
      comments = ''
    } = e.currentTarget.dataset;
    this.setState(prevState => ({
      editScheduleModal: !prevState.editScheduleModal,
      scheduleID: parseInt(schedule_id),
      requestedServiceDate: requested_service_date,
      serviceOutDate: service_out_date,
      comments: comments,
      status: status,
      collapse: false
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

    const {
      editScheduleModal,
      requestedServiceDate,
      status,
      serviceOutDate,
      collapse
    } = this.state;
    const vehicle_ser_data =
      this.props.vehicleServiceDetailsResponse.data || [];
    const vehicleInfo = vehicle_ser_data.vehicleInfo || [];
    const paymentinfo = vehicle_ser_data.paymentinfo || [];
    const planInfoList = vehicle_ser_data.planInfoList || [];
    const serviceList = vehicle_ser_data.serviceList || [];
    const userInfo = vehicle_ser_data.userInfo || [];
    const lng_lat_value = {
      lat: userInfo.locationLatitude,
      lng: userInfo.locationLongitude
    };
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
                                <h5>{vehicleInfo.model}</h5>
                              </ListGroupItem>
                              <ListGroupItem>
                                <span>Make</span>
                                <h5>{vehicleInfo.make}</h5>
                              </ListGroupItem>
                              <ListGroupItem>
                                <span>Year </span>
                                <h5>{vehicleInfo.year}</h5>
                              </ListGroupItem>
                              <ListGroupItem>
                                <span>Color </span>
                                <h5>
                                  <h5 color="" className="badge-dot mr-4">
                                    {vehicleInfo.color}
                                  </h5>
                                </h5>
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
                                <MapWrapper
                                  lng_lat_value={lng_lat_value}
                                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"
                                  loadingElement={
                                    <div style={{ height: '100%' }} />
                                  }
                                  containerElement={
                                    <div
                                      style={{ height: '149px' }}
                                      className="map-canvas"
                                      id="map-canvas"
                                    />
                                  }
                                  mapElement={
                                    <div
                                      style={{
                                        height: '100%',
                                        borderRadius: 'inherit'
                                      }}
                                    />
                                  }
                                />
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
                              <Button className="btn btn-default btn-sm pointerStyle ">
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
                              <Button className="btn btn-default btn-sm mb-1 pointerStyle">
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
                                      <td>
                                      <Fragment>
                                  <span id={'desc_' + index}>
                                    {plan_data.serviceDescription}
                                  </span>
                                  <UncontrolledTooltip
                                    placement="left"
                                    target={'desc_' + index}
                                  >
                                    {plan_data.serviceDescription}
                                  </UncontrolledTooltip>
                                </Fragment>
                              
                                      </td>
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
                        {serviceList.map((data, index) => {
                          return (
                            <tr key={index}>
                              <td scope="row">{data.requestedServiceDate}</td>
                              <td>
                                <Fragment>
                                  <span id={'schedule_' + data.scheduleID}>
                                    {data.serviceName}
                                  </span>
                                  <UncontrolledTooltip
                                    placement="left"
                                    target={'schedule_' + data.scheduleID}
                                  >
                                    {data.serviceName}
                                  </UncontrolledTooltip>
                                </Fragment>
                              </td>
                              <td>{data.status}</td>
                              <td>
                                <Fragment>
                                  <span id={'comments_' + data.scheduleID}>
                                    {data.comments}
                                  </span>
                                  <UncontrolledTooltip
                                    placement="left"
                                    target={'comments_' + data.scheduleID}
                                  >
                                    {data.comments}
                                  </UncontrolledTooltip>
                                </Fragment>
                              </td>
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
                                          data-schedule_id={data.scheduleID}
                                          data-requested_service_date={
                                            data.requestedServiceDate
                                          }
                                          data-comments={data.comments}
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
                          );
                        })}
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
                  this.updateVehicleServiceDetails('update_date')
                }
              >
                <Row>
                  <Col md={9}>
                    <label>Requested Service Date</label>
                    <Datetime
                      name="requestedServiceDate"
                      onChange={this.handleInput}
                      dateFormat="DD/MM/YYYY"
                      timeFormat="HH:mm:ss"
                      value={requestedServiceDate}
                      required
                    />
                  </Col>
                  <Col md={3} className="updateScheduleSubmit">
                    <Button color="success">Update</Button>
                  </Col>
                </Row>
              </AvForm>

              <Fragment>
                <center>
                  <hr />
                  <Button color="primary" onClick={this.completeSchedule}>
                    Complete Schedule{' '}
                  </Button>
                  <br />
                </center>
                <Collapse isOpen={collapse}>
                  <Row>
                    <Col md={9}>
                      <label>Service Out Date</label>
                      <Datetime
                        name="serviceOutDate"
                        dateFormat="DD/MM/YYYY"
                        timeFormat="HH:mm:ss"
                        onChange={this.handleInputOutService}
                        value={serviceOutDate}
                        required
                      />
                    </Col>
                    <Col md={3} className="updateScheduleSubmit">
                      <Button
                        color="success"
                        onClick={() =>
                          this.updateVehicleServiceDetails('update_status')
                        }
                      >
                        Submit{' '}
                      </Button>
                    </Col>
                  </Row>
                </Collapse>
              </Fragment>
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
