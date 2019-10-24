import React, { Component } from 'react';
// node.js library that concatenates classes (strings)
import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
import { Line, Bar } from 'react-chartjs-2';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Table,
  Container,
  Row,
  Col
} from 'reactstrap';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from 'variables/charts.jsx';
import { connect } from 'react-redux';
import { dashboard } from '../../redux/actions/Index.jsx';
import Header from 'components/Headers/Header.jsx';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import Loader from '../common/Loader.jsx';
import { Link } from 'react-router-dom';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: 'data1'
    };
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
        Header: 'User Name',
        accessor: 'name',
        className: 'text-center'
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
        className: 'text-center'
      },
      {
        Header: 'Location',
        accessor: 'locationFullAddress',
        className: 'text-center'
      },
      {
        Header: 'Date',
        accessor: 'requestServiceDate',
        className: 'text-center'
      }
    ];
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === 'data1' ? 'data2' : 'data1'
    });
    let wow = () => {};
    wow.bind(this);
    setTimeout(() => wow(), 1000);
    // this.chartReference.update();
  };
  componentWillMount() {
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
    this.props.dashboard();
  }
  render() {
    const {
      dashboard = {
        report: {},
        vehicleScheduledForAWeek: []
      }
    } = this.props.Dashboard;
    console.error(dashboard);
    const MyLoader = () => <Loader loading={this.props.Dashboard.loading} />;
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="bg-white shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-light ls-1 mb-1">
                        Overview
                      </h6>
                      <h2 className=" mb-0">Sales value</h2>
                    </div>
                    <div className="col">
                      <Nav className="justify-content-end" pills>
                        <NavItem>
                          <NavLink
                            className={classnames('py-2 px-3', {
                              active: this.state.activeNav === 1
                            })}
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 1)}
                          >
                            <span className="d-none d-md-block">Month</span>
                            <span className="d-md-none">M</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames('py-2 px-3', {
                              active: this.state.activeNav === 2
                            })}
                            data-toggle="tab"
                            href="#pablo"
                            onClick={e => this.toggleNavs(e, 2)}
                          >
                            <span className="d-none d-md-block">Week</span>
                            <span className="d-md-none">W</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Line
                      data={chartExample1[this.state.chartExample1Data]}
                      options={chartExample1.options}
                      getDatasetAtEvent={e => console.log(e)}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Total Services</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">
                        Vehicles Service Scheduled For this Week
                      </h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <ReactTable
                  id="service_report"
                  LoadingComponent={MyLoader}
                  ref={r => (this.reactTable = r)}
                  data={dashboard.vehicleScheduledForAWeek}
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
                  showPagination={false}
                />
              </Card>
            </Col>
            <Col xl="4">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-0">Payment Pending</h3>
                    </div>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        See all
                      </Button>
                    </div>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">VEHICLE ID</th>
                      <th scope="col">SERVICE ID</th>
                      <th scope="col">AMOUNT</th>
                      <th scope="col">PAYMENT DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">0001</th>
                      <td>0001</td>
                      <td>$ 5.2</td>
                      <td>12-10-2019</td>
                    </tr>
                    <tr>
                      <th scope="row">0001</th>
                      <td>0042</td>
                      <td>$ 25.2</td>
                      <td>20-10-2019</td>
                    </tr>
                    <tr>
                      <th scope="row">0001</th>
                      <td>0141</td>
                      <td>$ 45.2</td>
                      <td>30-10-2019</td>
                    </tr>
                    <tr>
                      <th scope="row">0001</th>
                      <td>0656</td>
                      <td>$ 15.2</td>
                      <td>31-10-2019</td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const getState = state => {
  return {
    loginData: state.authLogin,
    Dashboard: state.dashboard
  };
};
export default connect(
  getState,
  {
    dashboard
  }
)(Dashboard);
