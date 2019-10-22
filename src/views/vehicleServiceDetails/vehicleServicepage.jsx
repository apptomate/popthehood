import React, { Component } from 'react';
import 'react-table/react-table.css';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { connect } from 'react-redux';
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
  Modal
} from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.jsx';
import { vehicleServiceDetails } from '../../redux/actions/Index';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { lat_lng_value } from '../common/helpers/Variables';
import { preventDefaultFn } from '../common/helpers/functions';

const MapWrapper = withScriptjs(
  withGoogleMap(() => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={lat_lng_value}
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
      editSheduleModal: false,
      requestedServiceDate: ''
    };
    this.editShedule = this.editShedule.bind(this);
    this.formDataChange = this.formDataChange.bind(this);
  }
  //Form Data Change
  formDataChange(e) {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  }
  //Edit Schedule Modal
  editShedule() {
    this.setState(prevState => ({
      editSheduleModal: !prevState.editSheduleModal
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

  render() {
    const vehicle_ser_data =
      this.props.vehicleServiceDetailsResponse.data || [];
    const vehicleInfo = vehicle_ser_data.vehicleInfo || [];
    const paymentinfo = vehicle_ser_data.paymentinfo || [];
    const planInfo = vehicle_ser_data.planInfo || [];
    const serviceList = vehicle_ser_data.serviceList || [];
    const userInfo = vehicle_ser_data.userInfo || [];
    // const {
    //   data: {
    //     paymentinfo: {
    //       due: payment_det_due = null,
    //       paid: payment_det_paid = null,
    //       paymentDate: payment_det_paymentDate = '',
    //       paymentDetailId: payment_det_paymentDetailId = null,
    //       paymentStatus: payment_det_paymentStatus = '',
    //       paymentType: payment_det_paymentType = '',
    //       promocode_ReducedAmount: payment_det_promocode_ReducedAmount = '',
    //       totalAmount: payment_det_totalAmount = null
    //     },
    //     planInfo: {
    //       planType: plan_det_planType = '',
    //       serviceDescription: plan_det_serviceDescription = ''
    //     },
    //     serviceList = [],
    //     userInfo: {
    //       email: user_det_email = '',
    //       locationFullAddress: user_det_locationFullAddress = '',
    //       locationID: user_det_locationID = null,
    //       locationLatitude: user_det_locationLatitude = null,
    //       locationLongitude: user_det_locationLongitude = null,
    //       name: user_det_name = '',
    //       phoneNumber: user_det_phoneNumber = '',
    //       userId: user_det_userId = null
    //     },
    //     vehicleInfo: {
    //       vehicleId: vehicle_det_vehicleId = null,
    //       userId: vehicle_det_userId = null,
    //       make: vehicle_det_make = '',
    //       model: vehicle_det_model = '',
    //       year: vehicle_det_year = null,
    //       color: vehicle_det_color = '',
    //       imageType: vehicle_det_imageType = null,
    //       licensePlate: vehicle_det_licensePlate = '',
    //       specialNotes: vehicle_det_specialNotes = null,
    //       vehicleImage: vehicle_det_vehicleImage = null,
    //       vehicleImageURL: vehicle_det_vehicleImageURL = ''
    //     }
    //   }
    // } = this.props.vehicleServiceDetailsResponse;

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
      'SERVICE NAME',
      'STATUS',
      'AMOUNT'
    ];

    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7">
          <Row>
            <div className="col">
              <Card className="shadow p-4">
                <Row>
                  <Col>
                    <Row>
                      <Col md="4" className="item-middle">
                        <div className="ServiceReport-imgcard">
                          <img src={vehicleInfo.vehicleImageURL} />
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
                                <span> User Name</span> <h5>{userInfo.name}</h5>
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
                                30 minutes
                              </Button>
                            </li>
                            <li>
                              <span> Tearms & Condition</span>
                              <Button className="float-right btn btn-success btn-sm">
                                Accepted
                              </Button>{' '}
                              <Button className="float-right btn btn-danger btn-sm">
                                Not-Accepted
                              </Button>
                            </li>
                            <li className="mb-1">
                              <span>Location</span>
                              <MapWrapper
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
                            <Button className="btn btn-default btn-sm">
                              Plan Type
                            </Button>
                          </Col>
                          <Col sm="10">
                            <h5>{planInfo.planType}</h5>
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
                            <Button className="btn btn-default btn-sm mb-1">
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
                                <tr>
                                  <th scope="row">Lorem</th>
                                  <td>{planInfo.serviceDescription}</td>
                                </tr>
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
                  <Table className="align-items-center table-flush" responsive>
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
                      {serviceList.map((data, index) => (
                        <tr key={index}>
                          <td scope="row">{data.requestedServiceDate}</td>
                          <td>{data.serviceName}</td>
                          <td>{data.status}</td>
                          <td>{data.serviceAmount}</td>
                          <td className="text-right">
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
                                    onClick={this.editShedule}
                                  >
                                    <i className="fas fa-edit"></i> Edit
                                  </Button>
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
                {/* Payment History */}
                <Card className="shadow mt-5" body>
                  <h3 className="mb-3">Payment History</h3>
                  <Table className="align-items-center table-flush" responsive>
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
                <center>
                  <Button className="mt-4" color="info" type="button">
                    <i className="fas fa-file-pdf"></i> PDF Download
                  </Button>
                </center>
              </Card>
            </div>
          </Row>
          <Modal
            className="modal-dialog-centered"
            isOpen={this.state.editSheduleModal}
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
              <AvForm onValidSubmit={this.updateVehicleServideDetails}>
                <AvField
                  name="requestedServiceDate"
                  label="Requested Service Date"
                  type="date"
                  required
                  onChange={this.formDataChange}
                  className="blue_lable"
                  value={this.state.requestedServiceDate}
                  selected={this.state.requestedServiceDate}
                  placeholder="Requested Service Date"
                />
                <center>
                  <Button color="success">Update</Button>
                </center>
              </AvForm>
              <center>
                <hr />
                <Button color="success">Complete Schedule </Button>
              </center>
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
    vehicleServiceDetailsResponse: state.vehicleServiceDetails
  };
};
export default connect(
  getState,
  {
    vehicleServiceDetails
  }
)(vehicleServicepage);
