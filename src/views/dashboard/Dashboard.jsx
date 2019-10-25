import React, { Component } from 'react';
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { dashboard } from '../../redux/actions/Index.jsx';
import Header from 'components/Headers/Header.jsx';
import 'react-table/react-table.css';
import GeneralServiceList from '../charts/GeneralServiceList.jsx';
import MonthlyReportList from '../charts/MonthlyReportList.jsx';
import ReportForWeek from '../grids/ReportForWeek.jsx';
import ReportForDay from '../grids/ReportForDay.jsx';
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: 1
    };
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index
    });
  };
  componentDidMount() {
    this.props.dashboard();
  }
  render() {
    const {
      dashboard = {
        report: {},
        vehicleScheduledForAWeek: [],
        monthlyreportList: [],
        vehicleScheduledListForADay: []
      }
    } = this.props.Dashboard;
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
                      <h2 className=" mb-0">Monthly Report</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <MonthlyReportList
                      monthlyReportList={dashboard.monthlyreportList}
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
                      <h2 className="mb-0">Service Status Report</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  {/* Chart */}
                  <div className="chart">
                    <GeneralServiceList
                      generalServiceList={dashboard.generalServiceList}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="mb-5 mb-xl-0" xl="6">
              <ReportForDay
                vehicleScheduledListForADay={
                  dashboard.vehicleScheduledListForADay
                }
              />
            </Col>
            <Col xl="6">
              <ReportForWeek
                vehicleScheduledForAWeek={dashboard.vehicleScheduledForAWeek}
              />
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
