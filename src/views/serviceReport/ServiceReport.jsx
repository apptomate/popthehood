import React, { Component, Fragment } from 'react';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  UncontrolledTooltip,
  Label,
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
        className: 'text-center',
        Cell: ({ row }) => {
          return (
            <Link
              to={
                {
                  //   pathname: 'viewvehicle/' + row['_original'].licensePlate
                }
              }
            >
              {row['_original'].licensePlate}
            </Link>
          );
        }
      },
      {
        Header: 'Make',
        accessor: 'make',
        className: 'text-center'
      },
      {
        Header: 'Model',
        accessor: 'model',
        className: 'text-center'
      },
      {
        Header: 'User Name',
        accessor: 'name',
        className: 'text-center'
      },
      {
        Header: 'Status',
        accessor: 'status',
        className: 'text-center'
      },
      {
        Header: 'Plan Type',
        accessor: 'planType',
        className: 'text-center'
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
    doc.save('Service Report' + '.pdf');
  }
  onClickFilter(e) {
    console.error(this.state.startDate, this.state.endDate);
    this.setState({ filter: true });
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
    const MyLoader = () => <Loader loading={Services.loading} />;
    let data,
      current_date = '';
    if (this.state.filter) {
      data = Services.services.filter(
        service => service.requestedServiceDate > current_date
      );
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
                    <Col md="5">
                      <h3 className="mb-0">Service Report</h3>
                    </Col>
                    <Col md="4">
                      <Label for="startdate">Start Date</Label>
                      <DatePicker
                        selected={this.state.startDate}
                        onChange={this.sdateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select Start Date"
                      />
                      <Label for="endtdate">End Date</Label>
                      <DatePicker
                        selected={this.state.endDate}
                        onChange={this.edateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Select End Date"
                      />
                      <div className="flex" style={{ marginTop: '32px' }}>
                        <Button
                          color="primary"
                          id="FilterTooltip"
                          onClick={this.onClickFilter}
                        >
                          {' '}
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
                          style={{ marginLeft: '10px' }}
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
                      </div>
                    </Col>
                    <Col md="3">
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
                        filename={'Service Report' + '.csv'}
                        className="hidden"
                        ref={r => (this.csvLink = r)}
                        target="_blank"
                      />
                      <UncontrolledTooltip placement="top" target={'down_csv'}>
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
                      <UncontrolledTooltip placement="top" target={'down_pdf'}>
                        Download as PDF
                      </UncontrolledTooltip>
                    </Col>
                  </Row>
                </CardHeader>
                <ReactTable
                  id="check_issues"
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
