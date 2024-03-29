import React, { Fragment } from 'react';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import swal from 'sweetalert2';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
// reactstrap components
import {
  Col,
  Progress,
  Alert,
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
  deleteVehicle,
  getAllMakes,
  getModelByMake
} from '../../redux/actions/Index';
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';
import { connect } from 'react-redux';
import Loader from '../common/Loader';
import { Label } from 'reactstrap';
import { VehicleUpdateModal } from '../common/modal/VehicleUpdateModal';
import { staticYearArray } from '../common/helpers/functions.jsx';
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editModal: false,
      editVehicleModal: false,
      user_data: {},
      user_vehicle_data: {},
      expanded: {}
    };
    this.reactTable = React.createRef();
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
    this.reset_expand_row = this.reset_expand_row.bind(this);
    this.columns = [
      {
        Header: 'Name',
        accessor: 'name',
        className: 'text-left'
      },
      {
        Header: 'Email',
        accessor: 'email',
        className: 'text-left',
        width: 250,
        Cell: ({ row }) => (
          <Fragment>
            <span id={'email_' + row['_index']}> {row['_original'].email}</span>
            <UncontrolledTooltip
              placement='top'
              target={'email_' + row['_index']}
            >
              {row['_original'].email}
            </UncontrolledTooltip>
          </Fragment>
        )
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
        className: 'text-left',
        width: 150
      },
      {
        Header: 'Vehicle Count',
        accessor: 'vehicleCount',
        className: 'text-center',
        width: 180
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
              data-user_id={row['_original'].userId}
              className='action_btn'
              id='EditTooltip'
              onClick={e => this.editUser(e, row)}
              size='sm'
            >
              <i
                className='fas fa-pencil-alt edit_i'
                id={'edit-user-id-' + row['_index']}
              />
            </Button>
            <UncontrolledTooltip
              placement='top'
              target={'edit-user-id-' + row['_index']}
            >
              Edit User
            </UncontrolledTooltip>
            <Button
              color='danger'
              data-user_id={row['_original'].userId}
              className='action_btn'
              id='DeleteTooltip'
              onClick={this.deleteUserDetail}
              size='sm'
            >
              <i
                className='fas fas fa-trash edit_i'
                id={'delete-user-id-' + row['_index']}
              />
            </Button>
            <UncontrolledTooltip
              placement='top'
              target={'delete-user-id-' + row['_index']}
            >
              Delete User
            </UncontrolledTooltip>
          </Fragment>
        )
      }
    ];

    this.vehicle_columns = [
      {
        Header: 'Licence Plate',
        accessor: 'licencePlate',
        className: 'text-left',
        Cell: ({ row }) => {
          return (
            <Link
              to={{
                pathname:
                  'vehicle-service-details/' + row['_original'].vehicleId
              }}
            >
              <i
                className={
                  row['_original'].isServiceScheduled
                    ? 'far fa-calendar-check color-success licence-icon-padding'
                    : 'far fa-calendar-times color-danger licence-icon-padding'
                }
              ></i>{' '}
              {row['_original'].licencePlate}
            </Link>
          );
        }
      },
      {
        Header: 'Make',
        accessor: 'make',
        className: 'text-left'
      },
      {
        Header: 'Model',
        accessor: 'model',
        className: 'text-left'
      },
      {
        Header: 'Year',
        accessor: 'year',
        className: 'text-left',
        filterMethod: (filter, row) =>
          parseInt(filter.value) !== 0
            ? row[filter.id] === parseInt(filter.value)
            : true,
        Filter: ({ filter, onChange }) => (
          <select
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={filter ? filter.value : 0}
          >
            <option value='0'>All Years</option>
            {staticYearArray().map((array_value, key) => (
              <option value={array_value} key={key}>
                {array_value}
              </option>
            ))}
          </select>
        )
      },
      {
        Header: 'Color',
        accessor: 'color',
        className: 'text-left'
      },
      {
        Header: 'Actions',
        filterable: false,
        className: 'text-center',
        Cell: ({ row }) => (
          <Fragment>
            <Button
              user_id={row['_original'].vehicleId}
              className='action_btn'
              id='EditTooltip'
              size='sm'
              onClick={e => this.editUserVehicle(e, row)}
            >
              <i
                className='fas fa-pencil-alt'
                id={'edit-user_vehicle-id-' + row['_index']}
              />
            </Button>
            <UncontrolledTooltip
              placement='top'
              target={'edit-user_vehicle-id-' + row['_index']}
            >
              Edit Vehicle
            </UncontrolledTooltip>
            <Button
              data-user_vehicle_id={row['_original'].vehicleId}
              data-user_id={row['_original'].userId}
              className='action_btn'
              color='danger'
              size='sm'
              id='DeleteTooltip'
              onClick={this.deleteUserVehicleDetail}
            >
              <i
                className='fas fas fa-trash'
                id={'delete-user_vehicle-id-' + row['_index']}
              />
            </Button>
            <UncontrolledTooltip
              placement='top'
              target={'delete-user_vehicle-id-' + row['_index']}
            >
              Delete Vehicle
            </UncontrolledTooltip>
          </Fragment>
        )
      }
    ];
  }

  reset_expand_row() {
    this.setState({ expanded: {} });
  }

  //User's Vehicle List
  expand_row(row) {
    const { expanded, user_data } = this.state;
    var expanded_row = { ...expanded };
    var user_id = parseInt(row['original'].userId);
    Object.keys(expanded_row).forEach(key => {
      expanded_row[key] = row.nestingPath === key ? true : false;
    });
    expanded_row[row.nestingPath] = !expanded_row[row.nestingPath];
    if (expanded_row[row.nestingPath]) {
      var data = { UserId: user_id };
      this.props.getUserVehicleDetails(data);
    }
    if (expanded[row.nestingPath]) {
      expanded_row[row.nestingPath] = false;
    }
    this.setState(() => ({
      user_data: { ...user_data, userId: user_id },
      expanded: expanded_row
    }));
  }

  //Edit User
  editUser = (e, row) => {
    e.stopPropagation();
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
    let {
      vehicleId,
      make,
      model,
      year,
      color,
      licencePlate,
      specialNotes,
      vehicleImageURL,
      makeId
    } = row['_original'];
    this.props.getModelByMake(parseInt(makeId));
    this.setState(prevState => ({
      editVehicleModal: !prevState.editVehicleModal,
      user_vehicle_data: {
        vehicleId: parseInt(vehicleId),
        userId: parseInt(this.state.user_data.userId),
        make,
        model,
        year: parseInt(year),
        color,
        licencePlate,
        specialNotes,
        imageType: '',
        vehicleImage: '',
        vehicleImageURL: ''
      },
      storedImageURL: vehicleImageURL
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
    if (name === 'make') {
      let valueToApi = null;
      if (value) {
        let { selectedIndex } = e.target;
        valueToApi = e.target.options[selectedIndex].getAttribute(
          'value_to_api'
        );
      }
      this.props.getModelByMake(valueToApi);
    }
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
      editModal: false,
      expanded: {}
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
    e.stopPropagation();
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
          this.reset_expand_row();
        }
      });
  }
  //Delete User Vehicle
  deleteUserVehicleDetail(e) {
    let vehicle_id = parseInt(e.currentTarget.dataset.user_vehicle_id);
    let user_id = parseInt(e.currentTarget.dataset.user_id);
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
          this.props.deleteVehicle(vehicle_id, 'user', user_id);
        }
      });
  }
  componentDidMount() {
    this.props.getAllUsers();
    this.props.getAllMakes();
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
      },
      expanded,
      editModal,
      editVehicleModal
    } = this.state;
    const {
      getAllUsersResponse: { data = [], loading = '' },
      getUserVehicleDetailsResponse: {
        data: vehicle_data = [],
        loading: loadingVehicle = ''
      },
      Makes = [],
      ModelByMake = []
    } = this.props;

    const MyLoader = () => <Loader loading={loading} />;
    const MyLoaderVehicle = () => <Loader loading={loadingVehicle} />;
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className='mt--7' fluid>
          <Row>
            <div className='col'>
              <Card className='shadow'>
                <CardHeader className='border-0'>
                  <h3 className='mb-0'>Users</h3>
                </CardHeader>
                <ReactTable
                  expanded={expanded}
                  onPageChange={this.reset_expand_row}
                  onPageSizeChange={this.reset_expand_row}
                  onSortedChange={this.reset_expand_row}
                  onFilteredChange={this.reset_expand_row}
                  getTdProps={(state, rowInfo) => {
                    if (rowInfo === undefined) {
                      return {};
                    }
                    return {
                      'data-qnt': rowInfo.original.vehicleCount,
                      onClick: () => {
                        this.expand_row(rowInfo);
                      }
                    };
                  }}
                  id='users_table'
                  LoadingComponent={MyLoader}
                  ref={r => (this.reactTable = r)}
                  data={data}
                  columns={this.columns}
                  defaultPageSize={10}
                  pageSizeOptions={[5, 10, 15, 20]}
                  noDataText='No Record Found..'
                  filterable
                  HeaderClassName='text-bold'
                  defaultFilterMethod={(filter, row) =>
                    String(row[filter.id])
                      .toLowerCase()
                      .includes(filter.value.toLowerCase())
                  }
                  className='-striped -highlight'
                  SubComponent={() => {
                    return (
                      <div style={{ padding: '20px' }} key={shortid.generate()}>
                        {loadingVehicle ? (
                          <Row>
                            <Col md={5} />
                            <Col md={2}>
                              <center>
                                <Progress animated value={100}>
                                  Loading
                                </Progress>
                              </center>
                            </Col>
                          </Row>
                        ) : (
                          <Fragment>
                            {parseInt(vehicle_data.length) ? (
                              <Fragment>
                                <center>
                                  {' '}
                                  <h3>User&apos;s Registered Vehicles</h3>{' '}
                                </center>
                                <ReactTable
                                  id='users_vehicle_table'
                                  LoadingComponent={MyLoaderVehicle}
                                  ref={r => (this.reactTableVehicle = r)}
                                  data={vehicle_data}
                                  columns={this.vehicle_columns}
                                  pageSize={vehicle_data.length}
                                  showPagination={false}
                                  noDataText='No Record Found..'
                                  filterable
                                  HeaderClassName='text-bold'
                                  defaultFilterMethod={(filter, row) =>
                                    String(row[filter.id])
                                      .toLowerCase()
                                      .includes(filter.value.toLowerCase())
                                  }
                                />
                              </Fragment>
                            ) : (
                              <Alert color='warning'>
                                <center>No vehicle found</center>
                              </Alert>
                            )}
                          </Fragment>
                        )}
                      </div>
                    );
                  }}
                />
              </Card>
            </div>
          </Row>
          {/* //Edit Model */}
          <Modal
            isOpen={editModal}
            toggle={this.editToggle}
            className={this.props.className}
            centered={true}
            backdrop={false}
          >
            <AvForm onValidSubmit={this.updateUserDetails}>
              <ModalHeader toggle={this.editToggle}> Update User</ModalHeader>
              <ModalBody className='cus_model1'>
                <AvField
                  name='name'
                  label='Name'
                  placeholder='Name'
                  id='username'
                  value={name}
                  required
                  onChange={this.onChange}
                  className='blue_label'
                />
                <AvField
                  name='phoneNumber'
                  label='Phone Number'
                  placeholder='Phone Number'
                  id='phoneNumber'
                  value={phoneNumber}
                  onChange={this.onChange}
                  className='blue_label'
                  validate={{
                    required: {
                      value: true,
                      errorMessage: 'This field is required'
                    },
                    pattern: {
                      value: '^[0-9]+$',
                      errorMessage: 'Enter valid phone number'
                    }
                  }}
                />
                <AvField
                  name='email'
                  type='email'
                  label='Email'
                  placeholder='Email'
                  id='email'
                  value={email}
                  required
                  onChange={this.onChange}
                  className='blue_label'
                  disabled
                />
                <AvField
                  name='password'
                  type='password'
                  label='Password'
                  placeholder='Password'
                  id='password'
                  disabled
                  value={password}
                  required
                  onChange={this.onChange}
                  className='blue_label'
                />
                <AvField
                  name='sourceofReg'
                  label='Source of Reg'
                  disabled
                  placeholder='Source of Reg'
                  id='sourceofReg'
                  value={sourceofReg}
                  required
                  onChange={this.onChange}
                  className='blue_label'
                />
                <Label>Email Verified</Label>
                <br />
                <label className='custom-toggle'>
                  <input
                    defaultChecked={isEmailVerified}
                    value={isEmailVerified}
                    type='checkbox'
                    disabled
                    name='isEmailVerified'
                    onChange={this.onCheck}
                  />
                  <span className='custom-toggle-slider rounded-circle' />
                </label>
                <span className='clearfix' />
                <Label>Phone Number Verified</Label>
                <br />
                <label className='custom-toggle'>
                  <input
                    defaultChecked={isPhoneNumVerified}
                    value={isPhoneNumVerified}
                    type='checkbox'
                    name='isPhoneNumVerified'
                    onChange={this.onCheck}
                    disabled
                  />
                  <span className='custom-toggle-slider rounded-circle' />
                </label>
              </ModalBody>
              <ModalFooter>
                <FormGroup>
                  <center>
                    <Button color='success'>Update</Button>
                  </center>
                </FormGroup>
              </ModalFooter>
            </AvForm>
          </Modal>
          {/* Update Vehicle Modal */}
          {editVehicleModal && (
            <VehicleUpdateModal
              model_by_make={ModelByMake}
              makes_list={Makes}
              modal_toggle={editVehicleModal}
              modal_toggle_func={this.editVehicleToggle}
              updateUserVehicleDetails={this.updateUserVehicleDetails}
              state_data={this.state}
              onChange_func={this.onChangeVehicleEdit}
            />
          )}
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
    deleteVehicleResponse: state.deleteVehicle,
    ModelByMake: state.getModelByMake.data,
    Makes: state.getAllMakes.data
  };
};
export default connect(getState, {
  getAllUsers,
  getUserVehicleDetails,
  updateUser,
  deleteUser,
  updateVehicle,
  getAllMakes,
  deleteVehicle,
  getModelByMake
})(Users);
