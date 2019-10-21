import React, { Component, Fragment } from 'react';
import {
  Card,
  CardHeader,
  Container,
  Row,
  Button,
  UncontrolledTooltip
} from 'reactstrap';
import { connect } from 'react-redux';
import { getAllServices } from '../../redux/actions/Index.jsx';
import Loader from '../common/Loader.jsx';
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import { Link } from 'react-router-dom';
class ListService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.columns = [
      {
        Header: 'Service ID',
        accessor: 'availableServiceID',
        className: 'text-center'
        // Cell: ({ row }) => {
        //   return (
        //     <Link
        //       to={{
        //         pathname: 'viewvehicle/' + row['_original'].vehicleId
        //       }}
        //     >
        //       {row['_original'].vehicleId}
        //     </Link>
        //   );
        // }
      },
      {
        Header: 'Service Name',
        accessor: 'serviceName',
        className: 'text-center'
      },
      {
        Header: 'Description',
        accessor: 'description',
        className: 'text-center'
      }
    ];
  }
  componentDidMount() {
    this.props.getAllServices();
  }
  render() {
    const { Services = [] } = this.props;
    const MyLoader = () => <Loader loading={Services.loading} />;
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
                </CardHeader>
                <ReactTable
                  id="check_issues"
                  LoadingComponent={MyLoader}
                  ref={r => (this.reactTable = r)}
                  data={Services.allServices}
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
    Services: state.getAllServices
  };
};
export default connect(
  getState,
  {
    getAllServices
  }
)(ListService);
