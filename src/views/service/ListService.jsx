import React, { Component, Fragment } from 'react';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  UncontrolledTooltip,
  FormGroup,
  Input
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
        className: 'text-center'
      },
      {
        Header: 'Description',
        accessor: 'description',
        className: 'text-center'
      },
      {
        Header: 'Price',
        accessor: 'price',
        className: 'text-center'
      },
      {
        Header: 'Is Available',
        accessor: 'isAvailable',
        className: 'text-center',
        Cell: ({ row }) => (
          <Fragment>
            <h3>
              <i
                className={
                  row['_original'].isAvailable
                    ? 'far fa-check-circle'
                    : 'far fa-times-circle'
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
        { header: 'Prize', dataKey: 'Prize' },
        { header: 'Is Available', dataKey: 'Is Available' }
      ],
      columnStyles: {
        0: { cellWidth: 90 },
        1: { cellWidth: 200 },
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
    doc.save('Vehicles List' + '.pdf');
  }
  render() {
    const { servicePlans = [], ServicesByID = [] } = this.props;
    const { ServicePlan = 2 } = this.state;
    const MyLoader = () => <Loader loading={ServicesByID.loading} />;
    const Plans =
      servicePlans.allServicePlans &&
      servicePlans.allServicePlans.map((type, key) => (
        <option value={type.servicePlanID} key={type.servicePlanID}>
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
                  <h3 className="mb-0">List Of Available Services</h3>
                  <span style={{ float: 'right', paddingTop: '0.5rem' }}>
                    <FormGroup>
                      <Input
                        type="select"
                        name="ServicePlan"
                        id="exampleSelect"
                        value={ServicePlan}
                        onChange={this.onChange}
                      >
                        <option disabled value="">
                          Select an Service Plan
                        </option>
                        {Plans}
                      </Input>
                    </FormGroup>
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
                      filename={'Service List' + '.csv'}
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
                  </span>
                </CardHeader>
                <ReactTable
                  id="check_issues"
                  LoadingComponent={MyLoader}
                  ref={r => (this.reactTable = r)}
                  data={ServicesByID.allServices}
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
