import React, { Component, Fragment } from 'react';
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
import { getServiceReport } from '../../redux/actions/Index.jsx';
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import Loader from '../common/Loader.jsx';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import {
  getAlertToast,
  dateFormat,
  dateTimeFormat
} from '../common/helpers/functions.jsx';
import { FormGroup } from 'reactstrap';
const downFileName = 'ServiceReport-' + dateTimeFormat(new Date());
class ServiceReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToDownload: [],
      startDate: '',
      endDate: '',
      filter: false
    };
    this.download = this.download.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
    this.onClickFilter = this.onClickFilter.bind(this);
    this.sdateChange = this.sdateChange.bind(this);
    this.edateChange = this.edateChange.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.columns = [
      {
        Header: 'License Plate',
        accessor: 'licensePlate',
        className: 'text-left',
        Cell: ({ row }) => {
          return (
            <Link
              to={{
                pathname:
                  'vehicle-service-details/' + row['_original'].vehicleId
              }}
            >
              {row['_original'].licensePlate}
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
        Header: 'User Name',
        accessor: 'name',
        className: 'text-left'
      },
      {
        Header: 'Status',
        accessor: 'status',
        className: 'text-left'
      },
      {
        Header: 'Plan Type',
        accessor: 'planType',
        className: 'text-left',
        Cell: ({ row }) => (
          <Fragment>
            <span id={'planType_' + row['_original'].licensePlate}>
              {' '}
              {row['_original'].planType}
            </span>
            <UncontrolledTooltip
              placement="top"
              target={'planType_' + row['_original'].licensePlate}
            >
              {row['_original'].planType}
            </UncontrolledTooltip>
          </Fragment>
        )
      },
      {
        Header: 'Due Amount',
        accessor: 'due',
        className: 'text-center'
      },
      {
        Header: 'Paid Amount',
        accessor: 'paid',
        className: 'text-center'
      },
      {
        Header: 'Service Date',
        accessor: 'requestedServiceDate',
        className: 'text-left',
        Cell: row => {
          return dateFormat(row.value);
        }
      }
    ];
  }
  componentDidMount() {
    this.props.getServiceReport();
  }
  download() {
    const currentRecords = this.reactTable.getResolvedState().sortedData;
    var data_to_download = [];
    for (var index = 0; index < currentRecords.length; index++) {
      let record_to_download = {};
      for (var colIndex = 0; colIndex < this.columns.length; colIndex++) {
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
    for (var index = 0; index < currentRecords.length; index++) {
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
        { header: 'Status', dataKey: 'Status' },
        { header: 'Plan Type', dataKey: 'Plan Type' },
        { header: 'Due Amount', dataKey: 'Due Amount' },
        { header: 'Paid Amount', dataKey: 'Paid Amount' }
      ],
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 50 },
        2: { cellWidth: 50 },
        3: { cellWidth: 50 },
        4: { cellWidth: 60 },
        5: { cellWidth: 50 },
        6: { cellWidth: 50 }
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
  onClickFilter() {
    let { startDate, endDate } = this.state;
    let { services } = this.props.Services;
    let data,
      filter = true;
    if (startDate && endDate) {
      data = services.filter(
        service =>
          new Date(service.requestedServiceDate) >= new Date(startDate) &&
          new Date(service.requestedServiceDate) <= new Date(endDate)
      );
    } else if (startDate) {
      data = services.filter(
        service => new Date(service.requestedServiceDate) >= new Date(startDate)
      );
    } else if (endDate) {
      data = services.filter(
        service => new Date(service.requestedServiceDate) <= new Date(endDate)
      );
    } else {
      filter = false;
      Swal.fire(getAlertToast('warning', 'Please Select One of the Filter!'));
    }

    this.setState({ filter: filter, filterData: data });
  }
  sdateChange(date) {
    this.setState({
      startDate: date
    });
  }
  edateChange(date) {
    this.setState({
      endDate: date
    });
  }
  resetFilter(e) {
    e.preventDefault();
    this.setState({
      endDate: '',
      startDate: '',
      filter: false
    });
  }
  render() {
    const { Services = [] } = this.props;
    let { filter, startDate, endDate, dataToDownload, filterData } = this.state;
    const MyLoader = () => <Loader loading={Services.loading} />;
    let data;
    if (filter) {
      data = filterData;
    } else {
      data = Services.services;
    }
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
                      <h3 className="mb-0">Service Report</h3>
                    </Col>
                    <Col>
                      <span
                        style={{
                          float: 'right',
                          paddingTop: '0.5rem'
                        }}
                      >
                        <Button
                          color="primary"
                          size="sm"
                          onClick={this.download}
                          id="down_csv"
                        >
                          <i className="fas fa-file-download"></i> CSV
                        </Button>
                        <CSVLink
                          data={dataToDownload}
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
                  <Row>
                    <Col sm="2"></Col>
                    <Col sm="3">
                      <FormGroup>
                        <DatePicker
                          selected={startDate}
                          onChange={this.sdateChange}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select Start Date"
                          className="form-control"
                          width="100%"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="3">
                      <FormGroup>
                        <DatePicker
                          selected={endDate}
                          onChange={this.edateChange}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Select End Date"
                          className="form-control"
                          width="100%"
                        />
                      </FormGroup>
                    </Col>
                    <Col sm="4" style={{ marginTop: '10px' }}>
                      <Button
                        color="primary"
                        id="FilterTooltip"
                        size="sm"
                        onClick={this.onClickFilter}
                      >
                        <i className="fas fa-filter"></i>
                      </Button>
                      <UncontrolledTooltip
                        placement={'top'}
                        target={'FilterTooltip'}
                      >
                        Filter
                      </UncontrolledTooltip>

                      <Button
                        color="primary"
                        size="sm"
                        onClick={this.resetFilter}
                        id="reset_tool"
                      >
                        <i className="fas fa-history"></i>
                      </Button>
                      <UncontrolledTooltip
                        placement={'top'}
                        target={'reset_tool'}
                      >
                        Reset
                      </UncontrolledTooltip>
                    </Col>
                  </Row>
                </CardHeader>
                <ReactTable
                  id="service_report"
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
                />
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
    Services: state.serviceReport
  };
};
export default connect(
  getState,
  {
    getServiceReport
  }
)(ServiceReport);
