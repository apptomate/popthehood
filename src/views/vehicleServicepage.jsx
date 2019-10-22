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
                <Row>
                  <Col>
                    <Row>
                      <Col md='4' className='item-middle'>
                        <div className='ServiceReport-imgcard'>
                          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8SoNjCcvVLDyBoUHGFWiQx20kLkhsS8op9PZDVgNWYBsknI6c' />
                        </div>
                      </Col>
                      <Col md='8' className=''>
                        <div className='licence-plate'>
                          <h4>
                            LICENCE PLATE NO : <span>AI 93958</span>
                          </h4>
                        </div>
                        <div className='card-profile shadow card mt-4'>
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
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md='6'>
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
                                <span> E-mail id</span>{' '}
                                <h5>example@gmail.com</h5>
                              </li>
                              <li>
                                <span> E-mail id</span>{' '}
                                <h5>example@gmail.com</h5>
                              </li>
                              <li className='mb-1'>
                                <span> E-mail id</span>{' '}
                                <h5>example@gmail.com</h5>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col md='6'>
                        <div className='card-profile shadow card mt-4 p-3'>
                          <ul className='licence-plate-userDetails'>
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
                            <li className='mb-1'>
                              <span>Location</span>
                              <MapWrapper
                                googleMapURL='https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE'
                                loadingElement={
                                  <div style={{ height: '100%' }} />
                                }
                                containerElement={
                                  <div
                                    style={{ height: '149px' }}
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
                      </Col>
                    </Row>
                    <Row>
                      <Col></Col>
                    </Row>
                  </Col>
                </Row>
                {/* Service Details */}
                <Card className='shadow mt-5' body>
                  <h3>Service Details</h3>

                  <Row>
                    <Col>
                      <Card className='shadow mt-3' body>
                        <Row className='Vehicle-Service-plantype'>
                          <Col sm='2'>
                            <Button className='btn btn-default btn-sm'>
                              Plan Type
                            </Button>
                          </Col>
                          <Col sm='10'>
                            <h5>Vehicle Service Plan Types</h5>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Card className='shadow mt-3' body>
                        <Row>
                          <Col>
                            <Button className='btn btn-default btn-sm mb-1'>
                              Services
                            </Button>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Table
                              className='align-items-center table-flush'
                              responsive
                            >
                              <thead className='thead-light'>
                                <tr>
                                  <th scope='col'>Serives</th>
                                  <th scope='col'>Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th scope='row'>Lorem</th>
                                  <td>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                  </td>
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
                <center>
                  <Button className='mt-4' color='info' type='button'>
                    <i className='fas fa-file-pdf'></i> PDF Download
                  </Button>
                </center>
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
