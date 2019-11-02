import React, { Component, Fragment } from 'react';
import moment from 'moment';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  UncontrolledTooltip,
  Col,
  Form
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
  dateTimeFormat,
  dateFormat
} from '../common/helpers/functions.jsx';
import { FormGroup } from 'reactstrap';
const downFileName =
  'ServiceReport-' + dateTimeFormat(new Date(), 'DD/MM/YYYY HH:MM:SS');
class ServiceReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataToDownload: [],
      startDate: '',
      endDate: '',
      filter: false,
      filterFromPrevious: false
    };
    this.download = this.download.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
    this.onClickFilter = this.onClickFilter.bind(this);
    this.sdateChange = this.sdateChange.bind(this);
    this.edateChange = this.edateChange.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.columns = [
      {
        Header: 'Serial No',
        className: 'text-center',
        Cell: row => {
          return <div>{row.index + 1}</div>;
        }
      },
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
        Header: 'User Name',
        accessor: 'name',
        className: 'text-left'
      },
      {
        Header: 'Status',
        accessor: 'status',
        className: 'text-left',
        filterMethod: (filter, row) => {
          if (filter.value === 'all') return true;
          if (filter.value === 'completed') {
            return row[filter.id] === 'Completed';
          } else if (filter.value === 'ondue') {
            return row[filter.id] === 'On Due';
          } else {
            return row[filter.id] === 'UpComing';
          }
        },
        Filter: ({ filter, onChange }) => (
          <select
            name="statusFilter"
            onChange={event => onChange(event.target.value)}
            style={{ width: '100%' }}
            value={
              this.state.filterFromPrevious
                ? 'ondue'
                : filter
                  ? filter.value
                  : 'all'
            }
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="ondue">On Due</option>
            <option value="upcoming">UpComing</option>
          </select>
        )
      },
      {
        Header: 'Plan Type',
        accessor: 'planType',
        className: 'text-left',
        Cell: ({ row }) => (
          <Fragment>
            <span id={'planType_' + row['_index']}>
              {' '}
              {row['_original'].planType}
            </span>
            <UncontrolledTooltip
              placement="top"
              target={'planType_' + row['_index']}
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
        Cell: ({ row }) => (
          <Fragment>
            {row['_original'].status === 'Completed'
              ? moment(
                row['_original'].serviceOutDate,
                'DD/MM/YYYY HH:mm:ss'
              ).format('DD/MM/YYYY')
              : moment(
                row['_original'].requestedServiceDate,
                'DD/MM/YYYY HH:mm:ss'
              ).format('DD/MM/YYYY')}
          </Fragment>
        )
      }
    ];
  }
  componentDidMount() {
    this.props.getServiceReport();
    let { services = [] } = this.props.Services;
    if (this.props.location && this.props.location.state) {
      let { isFilter, filterBy } = this.props.location.state;
      let data = [],
        filter = false;
      if (isFilter && filterBy === 'ON_DUE') {
        filter = true;
        data = services.filter(service => service.status === 'On Due');
      }
      this.setState({
        filterData: data,
        filterFromPrevious: filter
      });
      this.props.history.replace({ state: {} });
    }
  }
  download() {
    const currentRecords = this.reactTable.getResolvedState().sortedData;
    var data_to_download = [];
    for (var index = 0; index < currentRecords.length; index++) {
      let record_to_download = {};
      for (var colIndex = 0; colIndex < this.columns.length; colIndex++) {
        if (colIndex === 0) {
          record_to_download['Serial No'] = String(index + 1).replace(',', '');
        } else {
          record_to_download[this.columns[colIndex].Header] = String(
            currentRecords[index][this.columns[colIndex].accessor]
          ).replace(',', '');
        }
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
        if (colIndex === 0) {
          record_to_download['Serial No'] = String(index + 1).replace(',', '');
        } else {
          record_to_download[this.columns[colIndex].Header] = String(
            currentRecords[index][this.columns[colIndex].accessor]
          ).replace(',', '');
        }
      }
      data_array.push(record_to_download);
    }
    var doc = new jsPDF('P', 'px', 'a4');
    doc.autoTable({
      body: data_array,
      columns: [
        { header: 'Serial No', dataKey: 'Serial No' },
        { header: 'Licence Plate', dataKey: 'Licence Plate' },
        { header: 'Make', dataKey: 'Make' },
        { header: 'Model', dataKey: 'Model' },
        { header: 'User Name', dataKey: 'User Name' },
        { header: 'Status', dataKey: 'Status' },
        { header: 'Plan Type', dataKey: 'Plan Type' },
        { header: 'Due Amount', dataKey: 'Due Amount' },
        { header: 'Paid Amount', dataKey: 'Paid Amount' }
      ],
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 45 },
        2: { cellWidth: 45 },
        3: { cellWidth: 45 },
        4: { cellWidth: 45 },
        5: { cellWidth: 60 },
        6: { cellWidth: 45 },
        7: { cellWidth: 45 }
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
      dateToCheck,
      filter = true;
    if (startDate && endDate) {
      console.log('s & e');
      startDate = moment(startDate).format('DD/MM/YYYY');
      endDate = moment(endDate).format('DD/MM/YYYY');
      data = services.filter(service => {
        dateToCheck =
          service.status === 'Completed'
            ? service.serviceOutDate
            : service.requestedServiceDate;
        dateToCheck = moment(
          dateToCheck.split(' ')[0],
          'DD/MM/YYYY HH:mm:ss'
        ).format('DD/MM/YYYY');
        return dateToCheck >= startDate && dateToCheck <= endDate;
      });
    } else if (startDate) {
      startDate = moment(startDate).format('DD/MM/YYYY');

      data = services.filter(service => {
        dateToCheck =
          service.status === 'Completed'
            ? service.serviceOutDate
            : service.requestedServiceDate;
        dateToCheck = moment(
          dateToCheck.split(' ')[0],
          'DD/MM/YYYY HH:mm:ss'
        ).format('DD/MM/YYYY');

        console.log('s:', moment(dateToCheck).isAfter(startDate, 'year'));
        return moment(dateToCheck).isAfter(startDate, 'day') ? dateToCheck : '';
        //return dateToCheck >= startDate;
      });
    } else if (endDate) {
      endDate = moment(endDate).format('DD/MM/YYYY');
      data = services.filter(service => {
        dateToCheck =
          service.status === 'Completed'
            ? service.serviceOutDate
            : service.requestedServiceDate;
        dateToCheck = moment(
          dateToCheck.split(' ')[0],
          'DD/MM/YYYY HH:mm:ss'
        ).format('DD/MM/YYYY');
        console.log('e:', new Date(dateToCheck) - new Date(endDate));
        return new Date(dateToCheck) - new Date(endDate) < 0;
      });
    } else {
      filter = false;
      Swal.fire(getAlertToast('warning', 'Please Select One of the Filter!'));
    }
    console.log('Data:/', data);
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
    let {
      filter,
      startDate,
      endDate,
      dataToDownload,
      filterData,
      filterFromPrevious
    } = this.state;
    const MyLoader = () => <Loader loading={Services.loading} />;
    let data;
    if (filter || filterFromPrevious) {
      data = filterData || [];
    } else if (Services.services) {
      data = Services.services;
    } else {
      data = [];
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
                      {data.length > 0 ? (
                        <span
                          style={{
                            float: 'right',
                            paddingTop: '0.5rem',
                            marginLeft: '1rem',
                            marginBottom: '1rem'
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
                      ) : (
                        ''
                      )}
                    </Col>
                  </Row>
                  <div>
                    <Form className="myform" inline>
                      <FormGroup>
                        <DatePicker
                          selected={startDate}
                          onChange={this.sdateChange}
                          dateFormat="dd-MM-yyyy"
                          placeholderText="Select Start Date"
                          className="form-control mb-2"
                          width="100%"
                        />
                      </FormGroup>

                      <FormGroup>
                        <DatePicker
                          selected={endDate}
                          onChange={this.edateChange}
                          dateFormat="dd-MM-yyyy"
                          placeholderText="Select End Date"
                          className="form-control mb-2"
                          width="100%"
                        />
                      </FormGroup>

                      <Button
                        color="info"
                        id="FilterTooltip"
                        className="mb-2"
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
                        color="warning"
                        onClick={this.resetFilter}
                        className="mb-2"
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
                    </Form>
                  </div>
                </CardHeader>

                <ReactTable
                  id="service_report"
                  LoadingComponent={MyLoader}
                  ref={r => (this.reactTable = r)}
                  data={data}
                  columns={this.columns}
                  defaultPageSize={10}
                  pageSizeOptions={[5, 10, 15, 20]}
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
