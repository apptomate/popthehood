import React, { Fragment } from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import swal from 'sweetalert2';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
import { getAlertToast } from '../common/helpers/functions';
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup
} from 'reactstrap';
import {
  getAllUsers,
  getUserVehicleDetails,
  updateUser,
  deleteUser,
  updateVehicle,
  deleteVehicle
} from '../../redux/actions/Index';
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';
import { connect } from 'react-redux';
import Loader from '../common/Loader';
import { Label } from 'reactstrap';
import { VehicleUpdateModal } from '../common/modal/VehicleUpdateModal';
import { leftAllignStyle } from '../common/helpers/Variables';
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      editVehicleModal: false,
      user_data: {},
      user_vehicle_data: {}
    };
    this.reactTable = React.createRef();
    this.userVechileFun = this.userVechileFun.bind(this);
    this.editUser = this.editUser.bind(this);
    this.onChange = this.onChange.bind(this);
    this.editToggle = this.editToggle.bind(this);
    this.updateUserDetails = this.updateUserDetails.bind(this);
    this.deleteUserDetail = this.deleteUserDetail.bind(this);
    this.onCheck = this.onCheck.bind(this);
    this.editVehicleToggle = this.editVehicleToggle.bind(this);
    this.editUserVehicle = this.editUserVehicle.bind(this);
    this.updateUserVehicleDetails = this.updateUserVehicleDetails.bind(this);
    this.deleteUserVehicleDetail = this.deleteUserVehicleDetail.bind(this);
    this.onChangeVehicleEdit = this.onChangeVehicleEdit.bind(this);
    this.columns = [
      {
        expander: true,
        width: 65,
        Expander: ({ isExpanded, row }) => (
          <Fragment>
            {row['_original'].role !== 'Admin' &&
            row['_original'].vehicleCount ? (
                <Fragment>
                  {isExpanded ? (
                    <i className="fas fa-caret-down" />
                  ) : (
                    <i
                      className="fas fa-caret-right"
                      data-user_id={row['_original'].userId}
                      onClick={this.userVechileFun}
                    />
                  )}
                </Fragment>
              ) : (
                ''
              )}
          </Fragment>
        ),
        style: {
          cursor: 'pointer',
          fontSize: 25,
          padding: '0',
          textAlign: 'center',
          userSelect: 'none'
        }
      },
      {
        Header: 'Name',
        accessor: 'name',
        className: 'text-center',
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Email',
        accessor: 'email',
        className: 'text-center',
        width: 250,
        Cell: ({ row }) => (
          <div style={leftAllignStyle}>
            <span id={'email_' + row['_original'].userId}>
              {' '}
              {row['_original'].email}
            </span>
            <UncontrolledTooltip
              placement="top"
              target={'email_' + row['_original'].userId}
            >
              {row['_original'].email}
            </UncontrolledTooltip>
          </div>
        )
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
        className: 'text-center',
        width: 150,
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Vehicle Count',
        accessor: 'vehicleCount',
        className: 'text-center',
        width: 180
      },
      {
        Header: 'Source Reg',
        accessor: 'sourceofReg',
        className: 'text-center',
        width: 150,
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Email Verified',
        accessor: 'isEmailVerified',
        className: 'text-center',
        Cell: ({ row }) => (
          <Fragment>
            <i
              className={
                row['_original'].isEmailVerified
                  ? 'far fa-check-circle color-success'
                  : 'far fa-times-circle color-danger'
              }
            />
          </Fragment>
        )
      },
      {
        Header: 'Phone Number Verified',
        accessor: 'isPhoneNumVerified',
        className: 'text-center',
        Cell: ({ row }) => (
          <Fragment>
            <i
              className={
                row['_original'].isPhoneNumVerified
                  ? 'far fa-check-circle color-success'
                  : 'far fa-times-circle color-danger'
              }
            />
          </Fragment>
        )
      },
      {
        Header: 'Actions',
        filterable: false,
        className: 'text-center',
        width: 130,
        Cell: ({ row }) => (
          <Fragment>
            <Button
              user_id={row['_original'].userId}
              className="action_btn"
              id="EditTooltip"
              onClick={e => this.editUser(e, row)}
              size="sm"
            >
              <i
                className="fas fa-pencil-alt edit_i"
                id={'edit-user-id-' + row['_original'].userId}
              />
            </Button>
            <UncontrolledTooltip
              placement="bottom"
              target={'edit-user-id-' + row['_original'].userId}
            >
              Edit User
            </UncontrolledTooltip>
            <Button
              color="danger"
              data-user_id={row['_original'].userId}
              className="action_btn"
              id="DeleteTooltip"
              onClick={this.deleteUserDetail}
              size="sm"
            >
              <i
                className="fas fas fa-trash edit_i"
                id={'delete-user-id-' + row['_original'].userId}
              />
            </Button>
            <UncontrolledTooltip
              placement="bottom"
              target={'delete-user-id-' + row['_original'].userId}
            >
              Delete User
            </UncontrolledTooltip>
          </Fragment>
        )
      }
    ];

    this.vehicle_columns = [
      {
        Header: 'License Plate',
        accessor: 'licensePlate',
        className: 'text-center',
        Cell: ({ row }) => {
          return (
            <div style={leftAllignStyle}>
              <Link
                to={{
                  pathname:
                    'vehicle-service-details/' + row['_original'].vehicleId
                }}
              >
                {row['_original'].licensePlate}
              </Link>
            </div>
          );
        }
      },
      {
        Header: 'Make',
        accessor: 'make',
        className: 'text-center',
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Model',
        accessor: 'model',
        className: 'text-center',
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Year',
        accessor: 'year',
        className: 'text-center',
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Color',
        accessor: 'color',
        className: 'text-center',
        Cell: row => <div style={leftAllignStyle}>{row.value}</div>
      },
      {
        Header: 'Actions',
        filterable: false,
        className: 'text-center',
        Cell: ({ row }) => (
          <Fragment>
            <Button
              user_id={row['_original'].vehicleId}
              className="action_btn"
              id="EditTooltip"
              size="sm"
              onClick={e => this.editUserVehicle(e, row)}
            >
              <i
                className="fas fa-pencil-alt edit_i"
                id={'edit-user_vehicle-id-' + row['_original'].vehicleId}
              />
            </Button>
            <UncontrolledTooltip
              placement="bottom"
              target={'edit-user_vehicle-id-' + row['_original'].vehicleId}
            >
              Edit Vehicle
            </UncontrolledTooltip>
            <Button
              data-user_vehicle_id={row['_original'].vehicleId}
              className="action_btn"
              color="danger"
              size="sm"
              id="DeleteTooltip"
              onClick={this.deleteUserVehicleDetail}
            >
              <i
                className="fas fas fa-trash edit_i"
                id={'delete-user_vehicle-id-' + row['_original'].vehicleId}
              />
            </Button>
            <UncontrolledTooltip
              placement="bottom"
              target={'delete-user_vehicle-id-' + row['_original'].vehicleId}
            >
              Delete Vehicle
            </UncontrolledTooltip>
          </Fragment>
        )
      }
    ];
  }
  //User's Vehicle List
  userVechileFun(e) {
    var user_id = parseInt(e.currentTarget.dataset.user_id);
    var data = { UserId: user_id };
    this.props.getUserVehicleDetails(data);
    this.setState(() => ({
      user_data: { ...this.state.user_data, userId: user_id }
    }));
  }
  //Edit User
  editUser = (e, row) => {
    this.setState(prevState => ({
      editModal: !prevState.editModal,
      user_data: {
        userId: parseInt(row['_original'].userId),
        name: row['_original'].name,
        phoneNumber: row['_original'].phoneNumber,
        email: row['_original'].email,
        password: row['_original'].password,
        sourceofReg: row['_original'].sourceofReg,
        isEmailVerified: row['_original'].isEmailVerified,
        isPhoneNumVerified: row['_original'].isPhoneNumVerified,
        isPromoCodeApplicable: row['_original'].isPromoCodeApplicable,
        createdDate: row['_original'].createdDate,
        vehicleCount: parseInt(row['_original'].vehicleCount)
      }
    }));
  };
  //Edit User Vehicle
  editUserVehicle = (e, row) => {
    this.setState(prevState => ({
      editVehicleModal: !prevState.editVehicleModal,
      user_vehicle_data: {
        vehicleId: parseInt(row['_original'].vehicleId),
        userId: parseInt(this.state.user_data.userId),
        make: row['_original'].make,
        model: row['_original'].model,
        year: parseInt(row['_original'].year),
        color: row['_original'].color,
        licensePlate: row['_original'].licensePlate,
        specialNotes: row['_original'].specialNotes,
        imageType: '',
        vehicleImage: '',
        vehicleImageURL: ''
      },
      storedImageURL: row['_original'].vehicleImageURL
    }));
  };
  //Onchange
  onChange(e) {
    let { name, value } = e.target;
    this.setState(() => ({
      user_data: { ...this.state.user_data, [name]: value }
    }));
  }
  //Onchange Vehicle Form Fields
  onChangeVehicleEdit(e) {
    let { name, value } = e.target;
    this.setState(() => ({
      user_vehicle_data: {
        ...this.state.user_vehicle_data,
        [name]: value
      }
    }));
  }
  // Edit User Modal Toggle
  editToggle() {
    this.setState(prevState => ({
      editModal: !prevState.editModal,
      user_data: []
    }));
  }
  // Edit Vehicle Modal Toggle
  editVehicleToggle() {
    this.setState(prevState => ({
      editVehicleModal: !prevState.editVehicleModal,
      user_vehicle_data: [],
      file: ''
    }));
  }
  //Change Checkbox
  onCheck(e) {
    let { name, value } = e.target;
    const { user_data } = this.state;
    this.setState(() => ({
      user_data: {
        ...user_data,
        [name]: value === 'true' ? false : true
      }
    }));
  }
  //Update User
  updateUserDetails() {
    let data = {
      ...this.state.user_data
    };
    this.props.updateUser(data);
    this.setState(() => ({
      user_data: [],
      editModal: false
    }));
  }
  //Update User Vehicle
  updateUserVehicleDetails() {
    let data = {
      ...this.state.user_vehicle_data
    };
    this.props.updateVehicle(data, 'user');
    this.setState(() => ({
      user_vehicle_data: [],
      editVehicleModal: false
    }));
  }
  //Delete User
  deleteUserDetail(e) {
    let user_id = parseInt(e.currentTarget.dataset.user_id);
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to delete this user?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      })
      .then(result => {
        if (result.value) {
          this.props.deleteUser(user_id);
        }
      });
  }
  //Delete User Vehicle
  deleteUserVehicleDetail(e) {
    let vehicle_id = parseInt(e.currentTarget.dataset.user_vehicle_id);
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to delete this vehicle?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      })
      .then(result => {
        if (result.value) {
          this.props.deleteVehicle(vehicle_id, 'user');
        }
      });
  }
  componentDidMount() {
    this.props.getAllUsers();
  }
  
  render() {
    const {
      user_data: {
        name = '',
        phoneNumber = '',
        email = '',
        password = '',
        sourceofReg = '',
        isEmailVerified = '',
        isPhoneNumVerified = ''
      }
    } = this.state;
    const {
      getAllUsersResponse: { data = [], loading = '' },
      getUserVehicleDetailsResponse: {
        data: vehicle_data = [],
        loading: loadingVehicle = ''
      }
    } = this.props;

    const MyLoader = () => <Loader loading={loading} />;
    const MyLoaderVehicle = () => <Loader loading={loadingVehicle} />;
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Users List</h3>
                </CardHeader>
                <ReactTable
                  id="users_table"
                  LoadingComponent={MyLoader}
                  ref={r => (this.reactTable = r)}
                  data={data}
                  columns={this.columns}
                  defaultPageSize={10}
                  pageSizeOptions={[10, 20]}
                  noDataText="No Record Found.."
                  filterable
                  HeaderClassName="text-bold"
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id])
                      .toLowerCase()
                      .includes(filter.value.toLowerCase())
                  }
                  onFilteredChange={this.filterData}
                  className="-striped -highlight"
                  SubComponent={() => {
                    return (
                      <div style={{ padding: '20px' }}>
                        <center>
                          {' '}
                          <h3>User's Registered Vehicles</h3>{' '}
                        </center>
                        <ReactTable
                          id="users_vehicle_table"
                          LoadingComponent={MyLoaderVehicle}
                          ref={r => (this.reactTableVehicle = r)}
                          data={vehicle_data}
                          columns={this.vehicle_columns}
                          defaultPageSize={3}
                          pageSizeOptions={[3, 6, 9]}
                          noDataText="No Record Found.."
                          filterable
                          HeaderClassName="text-bold"
                          defaultFilterMethod={(filter, row) =>
                            String(row[filter.id])
                              .toLowerCase()
                              .includes(filter.value.toLowerCase())
                          }
                        />
                      </div>
                    );
                  }}
                />
              </Card>
            </div>
          </Row>
          {/* //Edit Model */}
          <Modal
            isOpen={this.state.editModal}
            toggle={this.editToggle}
            className={this.props.className}
            centered={true}
          >
            <AvForm onValidSubmit={this.updateUserDetails}>
              <ModalHeader toggle={this.editToggle}> Update User</ModalHeader>
              <ModalBody className="cus_model1">
                <AvField
                  name="name"
                  label="Name"
                  placeholder="Name"
                  id="username"
                  value={name}
                  required
                  onChange={this.onChange}
                  className="blue_label"
                />
                <AvField
                  name="phoneNumber"
                  label="Phone Number"
                  type="tel"
                  placeholder="Phone Number"
                  id="phoneNumber"
                  value={phoneNumber}
                  required
                  onChange={this.onChange}
                  className="blue_label"
                />
                <AvField
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  required
                  onChange={this.onChange}
                  className="blue_label"
                  disabled
                />
                <AvField
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  id="password"
                  disabled
                  value={password}
                  required
                  onChange={this.onChange}
                  className="blue_label"
                />
                <AvField
                  name="sourceofReg"
                  label="Source of Reg"
                  disabled
                  placeholder="Source of Reg"
                  id="sourceofReg"
                  value={sourceofReg}
                  required
                  onChange={this.onChange}
                  className="blue_label"
                />
                <Label>Email Verified</Label>
                <br />
                <label className="custom-toggle">
                  <input
                    defaultChecked={isEmailVerified}
                    value={isEmailVerified}
                    type="checkbox"
                    disabled
                    name="isEmailVerified"
                    onChange={this.onCheck}
                  />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
                <span className="clearfix" />
                <Label>Phone Number Verified</Label>
                <br />
                <label className="custom-toggle">
                  <input
                    defaultChecked={isPhoneNumVerified}
                    value={isPhoneNumVerified}
                    type="checkbox"
                    name="isPhoneNumVerified"
                    onChange={this.onCheck}
                    disabled
                  />
                  <span className="custom-toggle-slider rounded-circle" />
                </label>
              </ModalBody>
              <ModalFooter>
                <FormGroup>
                  <center>
                    <Button color="success">Update</Button>
                  </center>
                </FormGroup>
              </ModalFooter>
            </AvForm>
          </Modal>
          {/* Update Vehicle Modal */}
          <VehicleUpdateModal
            modal_toggle={this.state.editVehicleModal}
            modal_toggle_func={this.editVehicleToggle}
            updateUserVehicleDetails={this.updateUserVehicleDetails}
            state_data={this.state}
            onChange_func={this.onChangeVehicleEdit}
          />
          {/* Update Vehicle Modal */}
        </Container>
      </>
    );
  }
}
const getState = state => {
  return {
    getAllUsersResponse: state.getAllUsers,
    getUserVehicleDetailsResponse: state.getUserVehicleDetails,
    updateVehicleResponse: state.updateVehicle,
    deleteVehicleResponse: state.deleteVehicle
  };
};
export default connect(
  getState,
  {
    getAllUsers,
    getUserVehicleDetails,
    updateUser,
    deleteUser,
    updateVehicle,
    deleteVehicle
  }
)(Users);
