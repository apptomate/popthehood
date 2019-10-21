import React from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
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
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MapWrapper = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
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
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);

class vehicleServicepage extends React.Component {
  state = {
    defaultModal: false
  };
  toggleModal = state => {
    this.setState({
      [state]: !this.state[state]
    });
  };

  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className='mt--7'>
          <Row>
            <div className='col'>
              <Card className='shadow p-4'>
                <CardHeader className='border-0'>
                  <h3 style={{ float: 'left' }} className='mb-0'>
                    Vehicle Service
                  </h3>
                </CardHeader>
                <Row>
                  <Col sm='12' md={{ size: 6, offset: 3 }}>
                    <div className='ServiceReport-imgcard'>
                      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8SoNjCcvVLDyBoUHGFWiQx20kLkhsS8op9PZDVgNWYBsknI6c' />
                    </div>

                    <div className='licence-plate'>
                      <h4>
                        LICENCE PLATE NO : <span>AI 93958</span>
                      </h4>
                    </div>

                    <ListGroup flush>
                      <ListGroupItem>
                        <span>Model </span>
                        <h5>C-Class</h5>
                      </ListGroupItem>
                      <ListGroupItem>
                        <span>Make</span>
                        <h5>Mercedes-Benz</h5>
                      </ListGroupItem>
                      <ListGroupItem>
                        <span>Year </span>
                        <h5>2015</h5>
                      </ListGroupItem>
                      <ListGroupItem>
                        <span>Color </span>
                        <h5>
                          <h5 color='' className='badge-dot mr-4'>
                            <i className='bg-danger' />
                            Red
                          </h5>
                        </h5>
                      </ListGroupItem>
                    </ListGroup>
                    {/* User Name details */}
                    <div className='card-profile shadow card mt-4'>
                      <div className='pt-0 pt-md-4 card-body'>
                        <ul className='licence-plate-userDetails'>
                          <li>
                            <span> User Name</span> <h5>Jessica Jones</h5>
                          </li>

                          <li>
                            <span> Phone Number</span> <h5>0123456789</h5>
                          </li>
                          <li>
                            <span> E-mail id</span> <h5>example@gmail.com</h5>
                          </li>
                          <li>
                            <span> Remainder minutes</span>
                            <Button className='float-right btn btn-default btn-sm'>
                              30 minutes
                            </Button>
                          </li>
                          <li>
                            <span> Tearms & Condition</span>
                            <Button className='float-right btn btn-success btn-sm'>
                              Accepted
                            </Button>

                            <Button className='float-right btn btn-danger btn-sm'>
                              Not-Accepted
                            </Button>
                          </li>
                          <li>
                            <span>Location</span>
                            <MapWrapper
                              googleMapURL='https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE'
                              loadingElement={
                                <div style={{ height: '100%' }} />
                              }
                              containerElement={
                                <div
                                  style={{ height: '270px' }}
                                  className='map-canvas'
                                  id='map-canvas'
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
                    </div>
                  </Col>
                </Row>
                {/* Service Details */}
                <Card className='shadow mt-5' body>
                  <h3>Service Details</h3>

                  <Row>
                    <Col sm='12' md={{ size: 8, offset: 2 }}>
                      <Card className='shadow mt-3' body>
                        <Row className='Vehicle-Service-plantype'>
                          <Col sm='4'>
                            <Button className='btn btn-default btn-sm'>
                              Plan Type
                            </Button>
                          </Col>
                          <Col sm='6'>
                            <h5>Vehicle Service Plan Types</h5>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm='12' md={{ size: 8, offset: 2 }}>
                      <Card className='shadow mt-3' body>
                        <Row>
                          <Col sm='4'>
                            <Button className='btn btn-default btn-sm'>
                              Services
                            </Button>
                          </Col>
                          <Col sm='6'>
                            <ul className='Vehicle-Service-list'>
                              <li>Vehicle Service Name</li>
                              <li>Vehicle Service Name</li>
                              <li>Vehicle Service Name</li>
                              <li>Vehicle Service Name</li>
                              <li>Vehicle Service Name</li>
                              <li>Vehicle Service Name</li>
                            </ul>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Card>
                {/* Subscription Schedules */}
                <Card className='shadow mt-5' body>
                  <h3 className='mb-3'>Subscription Schedules</h3>
                  <Table className='align-items-center table-flush' responsive>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Service Date</th>
                        <th scope='col' style={{ textAlign: 'center' }}>
                          History
                        </th>
                        <th scope='col' style={{ textAlign: 'center' }}>
                          Status
                        </th>

                        <th scope='col' />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope='row'>20-10-2019</th>
                        <td style={{ textAlign: 'center' }}>
                          <Button
                            color='link'
                            onClick={() => this.toggleModal('defaultModal')}
                          >
                            History link
                          </Button>
                        </td>
                        <td style={{ textAlign: 'center' }}>Services Status</td>

                        <td className='text-right'>
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className='btn-icon-only text-light'
                              href='#pablo'
                              role='button'
                              size='sm'
                              color=''
                              onClick={e => e.preventDefault()}
                            >
                              <i className='fas fa-ellipsis-v' />
                            </DropdownToggle>
                            <DropdownMenu className='dropdown-menu-arrow' right>
                              <DropdownItem
                                href='#pablo'
                                onClick={e => e.preventDefault()}
                              >
                                <Button color='primary' size='sm' type='button'>
                                  <i className='fas fa-edit'></i> Edit
                                </Button>
                                <Button color='danger' size='sm' type='button'>
                                  <i className='fas fa-trash-alt'></i> Delete
                                </Button>
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
                {/* Payment History */}
                <Card className='shadow mt-5' body>
                  <h3 className='mb-3'>Payment History</h3>
                  <Table className='align-items-center table-flush' responsive>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Dummy</th>
                        <th scope='col'>Dummy</th>
                        <th scope='col'>Dummy</th>
                        <th scope='col'>Dummy</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope='row'>Dummy</th>
                        <td>Dummy</td>
                        <td>Dummy</td>
                        <td>Dummy</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </Card>
            </div>
          </Row>
          <Modal
            className='modal-dialog-centered'
            isOpen={this.state.defaultModal}
            toggle={() => this.toggleModal('defaultModal')}
          >
            <div className='modal-header'>
              <h4 className='modal-title' id='modal-title-default'>
                History
              </h4>
              <button
                aria-label='Close'
                className='close'
                data-dismiss='modal'
                type='button'
                onClick={() => this.toggleModal('defaultModal')}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Dummy</th>
                    <th scope='col'>Dummy</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope='row'>Dummy</th>
                    <td>Dummy</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className='modal-footer'>
              <Button
                className='ml-auto'
                color='link'
                data-dismiss='modal'
                type='button'
                onClick={() => this.toggleModal('defaultModal')}
              >
                Close
              </Button>
            </div>
          </Modal>
        </Container>
      </>
    );
  }
}

export default vehicleServicepage;
