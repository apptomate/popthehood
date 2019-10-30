import React, { Component, Fragment } from 'react';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  UncontrolledTooltip,
  FormGroup,
  Input,
  Col
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  //getAllServices,
  getAllServicePlans,
  getServicePriceByID
} from '../../redux/actions/Index.jsx';
import Loader from '../common/Loader.jsx';
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CSVLink } from 'react-csv';
import { dateTimeFormat } from '../common/helpers/functions.jsx';
const downFileName = 'ServiceList-' + dateTimeFormat(new Date());
class ListService extends Component {
  constructor(props) {
    super(props);
    this.state = { dataToDownload: [], initialFilter: true };
    this.onChange = this.onChange.bind(this);
    this.download = this.download.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
    this.columns = [
      {
        Header: 'Service Name',
        accessor: 'serviceName',
        className: 'text-left',
        width: 350,
        Cell: ({ row }) => (
          <Fragment>
            <span id={'serviceName_' + row['_original'].availableServiceID}>
              {' '}
              {row['_original'].serviceName}
            </span>
            <UncontrolledTooltip
              placement="top"
              target={'serviceName_' + row['_original'].availableServiceID}
            >
              {row['_original'].serviceName}
            </UncontrolledTooltip>
          </Fragment>
        )
      },
      {
        Header: 'Description',
        accessor: 'description',
        className: 'text-left',
        Cell: ({ row }) => (
          <Fragment>
            <span id={'description_' + row['_original'].availableServiceID}>
              {row['_original'].description}
            </span>
            <UncontrolledTooltip
              placement="left"
              target={'description_' + row['_original'].availableServiceID}
            >
              {row['_original'].description}
            </UncontrolledTooltip>
          </Fragment>
        )
      },
      {
        Header: 'Price',
        accessor: 'price',
        className: 'text-right',
        width: 100
      },
      {
        Header: 'Is Available',
        accessor: 'isAvailable',
        className: 'text-center',
        width: 150,
        Cell: ({ row }) => (
          <Fragment>
            <h3>
              <i
                className={
                  row['_original'].isAvailable
                    ? 'far fa-check-circle color-success'
                    : 'far fa-times-circle color-danger'
                }
              />
            </h3>
          </Fragment>
        )
      }
    ];
  }
  componentDidMount() {
    this.props.getServicePriceByID(2);
    this.props.getAllServicePlans();
  }
  onChange(e) {
    let { name, value } = e.target;
    this.props.getServicePriceByID(parseInt(value));
    this.setState({ [name]: value });
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
        { header: 'Service Name', dataKey: 'Service Name' },
        { header: 'Description', dataKey: 'Description' },
        { header: 'Price', dataKey: 'Price' },
        { header: 'Is Available', dataKey: 'Is Available' }
      ],
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 220 },
        2: { cellWidth: 50 },
        4: { cellWidth: 50 }
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
  render() {
    const { servicePlans = [], ServicesByID = [] } = this.props;
    const { ServicePlan = 2 } = this.state;
    const MyLoader = () => <Loader loading={ServicesByID.loading} />;
    const Plans =
      servicePlans.allServicePlans &&
      servicePlans.allServicePlans.map(type => (
        <option value={type.servicePlanID} key={type.servicePlanID} data-dropText={type.planType}>
          {type.planType}
        </option>
      ));
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
                    <Col sm>
                      <h3 className="mb-0">List Of Available Services</h3>
                    </Col>
                    <Col sm>
                      <FormGroup style={{ float: 'left', width: '60%' }}>
                        <Input
                          type="select"
                          name="ServicePlan"
                          id="exampleSelect"
                          value={ServicePlan}
                          onChange={this.onChange}
                        >
                          {Plans}
                        </Input>
                      </FormGroup>

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
                  data={ServicesByID.allServices}
                  columns={this.columns}
                  defaultPageSize={25}
                  pageSizeOptions={[5, 10, 15, 20, 25]}
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
    // Services: state.getAllServices,
    servicePlans: state.getAllServicePlans,
    ServicesByID: state.getServicePriceByID
  };
};
export default connect(
  getState,
  {
    //  getAllServices,
    getAllServicePlans,
    getServicePriceByID
  }
)(ListService);
