import React, { Component, Fragment } from 'react';
// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  UncontrolledTooltip,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import Loader from '../common/Loader.jsx';
import swal from 'sweetalert2';
import { getConfirm, getAlertToast } from '../common/helpers/functions';
import {
  getAllVehicles,
  deleteVehicle,
  updateVehicle
} from '../../redux/actions/Index.jsx';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import { VehicleUpdateModal } from '../common/modal/VehicleUpdateModal';
import moment from 'moment';
const downFileName =
  'Vehicles List - ' + moment(new Date()).format('MM-DD-YYYY HH:mm:ss');
class ListVehicle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToDownload: [],
      editVehicleModal: false,
      user_vehicle_data: []
    };
    this.deleteVehicle = this.deleteVehicle.bind(this);
    this.editVehicle = this.editVehicle.bind(this);
    this.download = this.download.bind(this);
    this.editVehicleToggle = this.editVehicleToggle.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
    this.updateVehicle = this.updateVehicle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.columns = [
      {
        Header: 'License Plate',
        accessor: 'licensePlate',
        className: 'text-center',
        Cell: ({ row }) => {
          return (
            <div style={{ textAlign: 'left' }}>
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
        Cell: row => <div style={{ textAlign: 'left' }}>{row.value}</div>
      },
      {
        Header: 'Model',
        accessor: 'model',
        className: 'text-center',
        Cell: row => <div style={{ textAlign: 'left' }}>{row.value}</div>
      },
      {
        Header: 'User Name',
        accessor: 'name',
        className: 'text-center',
        Cell: row => <div style={{ textAlign: 'left' }}>{row.value}</div>
      },
      {
        Header: 'Location',
        accessor: 'address',
        className: 'text-center',
        Cell: ({ row }) => (
          <div style={{ textAlign: 'left' }}>
            <span id={'address_' + row['_original'].vehicleId}>
              {' '}
              {row['_original'].address}
            </span>
            <UncontrolledTooltip
              placement="top"
              target={'address_' + row['_original'].vehicleId}
            >
              {row['_original'].address}
            </UncontrolledTooltip>
          </div>
        )
      },
      {
        Header: 'Next Service',
        accessor: 'nextService',
        className: 'text-center',
        Cell: row => <div style={{ textAlign: 'left' }}>{moment(row.value).format('DD/MM/YYYY HH:MM:SS')}</div>
      },
      {
        Header: 'Actions',
        className: 'text-center',
        filterable: false,
        Cell: ({ row }) => (
          <Fragment>
            <Button
              className="action_btn"
              id="EditTooltip"
              size="sm"
              data-tip="Edit Vehicle"
              onClick={e => this.editVehicle(e, row)}
            >
              <i
                className="fas fa-user-edit"
                id={'edit-vehicle-id-' + row['_original'].vehicleId}
              />
            </Button>
            <UncontrolledTooltip
              placement="bottom"
              target={'edit-vehicle-id-' + row['_original'].vehicleId}
            >
              Edit Vehicle
            </UncontrolledTooltip>
            <Button
              color="danger"
              className="action_btn"
              id="DeleteToolTip"
              size="sm"
              onClick={e => this.deleteVehicle(e, row)}
            >
              <i
                className="fas fa-trash"
                id={'delete-vehicle-id-' + row['_original'].vehicleId}
              />
            </Button>
            <UncontrolledTooltip
              placement="bottom"
              target={'delete-vehicle-id-' + row['_original'].vehicleId}
            >
              Delete Vehicle
            </UncontrolledTooltip>
          </Fragment>
        )
      }
    ];
  }
  deleteVehicle(e, row) {
    e.preventDefault();
    let vehicle_id = row['_original'].vehicleId;
    swal
      .fire(getConfirm('warning', 'Are you sure you want to delete the issue?'))
      .then(result => {
        if (result.value) {
          this.props.deleteVehicle(vehicle_id, 'vehicle');
        }
      });
  }
  editVehicle(e, row) {
    this.setState(prevState => ({
      editVehicleModal: !prevState.editVehicleModal,
      user_vehicle_data: {
        vehicleId: parseInt(row['_original'].vehicleId),
        userId: parseInt(this.props.loginData.user.userId),
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
  }
  componentDidMount() {
    this.props.getAllVehicles();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.DeleteData.data !== this.props.DeleteData.data &&
      this.props.DeleteData.data === 'Deleted Successfully'
    ) {
      swal.fire(getAlertToast('success', 'Deleted Successfully!'));
    }
    if (
      prevProps.UpdateData.data !== this.props.UpdateData.data &&
      this.props.UpdateData.data.vehicleId > 0
    ) {
      swal.fire(getAlertToast('success', this.props.UpdateData.data.message));
    }
  }
  download() {
    const currentRecords = this.reactTable.getResolvedState().sortedData;
    var data_to_download = [];
    for (var index = 0; index < currentRecords.length; index++) {
      let record_to_download = {};
      for (var colIndex = 0; colIndex < this.columns.length - 1; colIndex++) {
        record_to_download[this.columns[colIndex].Header] = String(
          currentRecords[index][this.columns[colIndex].accessor]
        ).replace(',', '');
      }
      data_to_download.push(record_to_download);
    }
    this.setState({ dataToDownload: data_to_download }, () => {
      this.csvLink.link.click();
    });
  }

  downloadPdf() {
    const currentRecords = this.reactTable.getResolvedState().sortedData;
    var data_array = [];
    for (var index = 0; index < currentRecords.length - 1; index++) {
      let record_to_download = {};
      for (var colIndex = 0; colIndex < this.columns.length; colIndex++) {
        record_to_download[this.columns[colIndex].Header] = String(
          currentRecords[index][this.columns[colIndex].accessor]
        ).replace(',', '');
      }
      data_array.push(record_to_download);
    }
    var doc = new jsPDF('P', 'px', 'a4');
    doc.autoTable({
      body: data_array,
      columns: [
        { header: 'License Plate', dataKey: 'License Plate' },
        { header: 'Make', dataKey: 'Make' },
        { header: 'Model', dataKey: 'Model' },
        { header: 'User Name', dataKey: 'User Name' },
        { header: 'Location', dataKey: 'Location' },
        { header: 'Next Service', dataKey: 'Next Service' }
      ],
      columnStyles: {
        0: { cellWidth: 70 },
        1: { cellWidth: 70 },
        2: { cellWidth: 70 },
        3: { cellWidth: 70 },
        4: { cellWidth: 70 },
        5: { cellWidth: 70 }
      },
      margin: {
        top: 8,
        right: 8,
        bottom: 8,
        left: 8
      },
      rowPageBreak: 'avoid',
      theme: 'grid'
    });
    doc.save(downFileName + '.pdf');
  }
  onChange(e) {
    let { name, value } = e.target;
    this.setState({
      user_vehicle_data: { ...this.state.user_vehicle_data, [name]: value }
    });
  }
  // Edit Vehicle Modal Toggle
  editVehicleToggle() {
    this.setState(prevState => ({
      editVehicleModal: !prevState.editVehicleModal,
      user_vehicle_data: [],
      file: ''
    }));
  }
  //Update User Vehicle
  updateVehicle() {
    let data = {
      ...this.state.user_vehicle_data
    };
    this.props.updateVehicle(data, 'vehicle');
    this.setState({
      user_vehicle_data: [],
      editVehicleModal: false
    });
  }
  render() {
    const { Vehicles = [] } = this.props;
    const MyLoader = () => <Loader loading={Vehicles.loading} />;
    return (
      <Fragment>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row>
                    <Col>
                      <h3 className="mb-0">List Of Vehicle</h3>
                    </Col>
                    <Col>
                      <span style={{ float: 'right', paddingTop: '0.5rem' }}>
                        <Button
                          color="primary"
                          size="sm"
                          onClick={this.download}
                          id="down_csv"
                        >
                          <i className="fas fa-file-download"></i> CSV
                        </Button>
                        <CSVLink
                          data={this.state.dataToDownload}
                          filename={downFileName + '.csv'}
                          className="hidden"
                          ref={r => (this.csvLink = r)}
                          target="_blank"
                        />
                        <UncontrolledTooltip
                          placement="top"
                          target={'down_csv'}
                        >
                          Download as CSV
                        </UncontrolledTooltip>
                        <Button
                          color="info"
                          size="sm"
                          id="down_pdf"
                          onClick={this.downloadPdf}
                        >
                          <i className="fas fa-file-download"></i> PDF
                        </Button>
                        <UncontrolledTooltip
                          placement="top"
                          target={'down_pdf'}
                        >
                          Download as PDF
                        </UncontrolledTooltip>
                      </span>
                    </Col>
                  </Row>
                </CardHeader>
                <ReactTable
                  id="check_issues"
                  LoadingComponent={MyLoader}
                  ref={r => (this.reactTable = r)}
                  data={Vehicles.allVehicles}
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
                />
              </Card>
            </div>
          </Row>
        </Container>
        {/* Update Vehicle Modal */}
        <VehicleUpdateModal
          modal_toggle={this.state.editVehicleModal}
          modal_toggle_func={this.editVehicleToggle}
          updateUserVehicleDetails={this.updateVehicle}
          state_data={this.state}
          onChange_func={this.onChange}
        />
        {/* Update Vehicle Modal */}
      </Fragment>
    );
  }
}
const getState = state => {
  return {
    loginData: state.authLogin,
    Vehicles: state.getAllVehicles,
    DeleteData: state.deleteVehicle,
    UpdateData: state.updateVehicle
  };
};
export default connect(
  getState,
  {
    getAllVehicles,
    deleteVehicle,
    updateVehicle
  }
)(ListVehicle);
