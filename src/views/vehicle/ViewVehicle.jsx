import React, { Component, Fragment } from 'react';
import UserHeader from 'components/Headers/UserHeader.jsx';
import { Card, CardHeader, Container, Row, CardBody } from 'reactstrap';
import { vehiclesByVehicleID } from '../../redux/actions/Index.jsx';
import { connect } from 'react-redux';
class ViewVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = { vehicleId: '' };
  }
  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    this.setState({ vehicleId: params.id });
    this.props.vehiclesByVehicleID(params.id);
  }
  render() {
    let {
      address = 'N/A',
      color = 'N/A',
      createdDate = 'N/A',
      email = 'N/A',
      isDeleted = 'N/A',
      licensePlate = 'N/A',
      make = 'N/A',
      model = 'N/A',
      modifiedDate = 'N/A',
      name = 'N/A',
      nextService = 'N/A',
      phoneNumber = 'N/A',
      specialNotes = 'N/A',
      userId = 'N/A',
      vehicleId = 'N/A',
      vehicleImageURL = 'N/A',
      year = 'N/A'
    } = this.props.VehicleData || [];
    return (
      <Fragment>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Vehicle Details</h3>
                </CardHeader>
                <CardBody>
                  <h4>Vehicle ID:</h4>
                  <p> {vehicleId}</p>
                  <h4>Address:</h4>
                  <p>{address}</p>
                  <h4>Color:</h4>
                  <p> {color}</p>
                  <h4>createdDate:</h4>
                  <p> {createdDate}</p>
                  <h4>Email:</h4>
                  <p> {email}</p>
                  <h4>Licence Plate:</h4>
                  <p> {licensePlate}</p>
                  <h4>Make:</h4>
                  <p> {make}</p>
                  <h4>Model:</h4>
                  <p>{model}</p>
                  <h4>Modified Date:</h4>
                  <p> {modifiedDate}</p>
                  <h4>Name:</h4>
                  <p> {name}</p>
                  <h4>Next Service:</h4>
                  <p> {nextService}</p>
                  <h4>Phone No.</h4>
                  <p> {phoneNumber}</p>
                  <h4>Special Notes:</h4>
                  <p> {specialNotes}</p>
                  <h4>Year:</h4>
                  <p>{year}</p>
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>
      </Fragment>
    );
  }
}

const getState = state => {
  return {
    loginData: state.authLogin,
    VehicleData: state.vehicleByVehicleID
  };
};
export default connect(
  getState,
  {
    vehiclesByVehicleID
  }
)(ViewVehicle);
