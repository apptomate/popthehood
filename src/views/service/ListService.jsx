import React, { Component, Fragment } from 'react';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  UncontrolledTooltip,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import {
  getAllServices,
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
        Header: 'Notes',
        accessor: 'notes',
        className: 'text-center'
      },
      {
        Header: 'Is Available',
        accessor: 'isAvailable',
        className: 'text-center'
      }
    ];
  }
  componentDidMount() {
    this.props.getAllServices();
    this.props.getAllServicePlans();
  }
  onChange(e) {
    let { name, value } = e.target;
    this.props.getServicePriceByID(parseInt(value));
    this.setState({ initialFilter: false, [name]: value });
  }
  render() {
    const { Services = [], servicePlans = [], ServicesByID = [] } = this.props;
    const { ServicePlan } = this.state;
    const MyLoader = () => <Loader loading={Services.loading} />;
    const Plans =
      servicePlans.allServicePlans &&
      servicePlans.allServicePlans.map((type, key) => (
        <option value={type.servicePlanID} key={type.servicePlanID}>
          {type.planType}
        </option>
      ));
    let reports = this.state.initialFilter
      ? Services.allServices
      : ServicesByID.allServices;
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
                      <Label for="exampleSelect">Select</Label>
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
                      filename={'Vehicles List' + '.csv'}
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
                  data={reports}
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
    Services: state.getAllServices,
    servicePlans: state.getAllServicePlans,
    ServicesByID: getServicePriceByID
  };
};
export default connect(
  getState,
  {
    getAllServices,
    getAllServicePlans,
    getServicePriceByID
  }
)(ListService);
