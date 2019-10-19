import React from 'react';

// reactstrap components
import {
  Card,
  CardHeader,
  Container,
  Row,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table
} from 'reactstrap';
import { connect } from 'react-redux';
import { getAllVehicles } from '../../redux/actions/Index.jsx';
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';
import 'react-table/react-table.css';
import ReactTable from 'react-table';
import Loader from '../common/Loader.js';

class ListVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      count: 10
    };
    this.onClickPagination = this.onClickPagination.bind(this);
    this.columns = [
      {
        Header: 'Location',
        accessor: 'locationName',
        className: 'text-center'
      },
      {
        Header: 'Appliance Item',
        accessor: 'applianceItem',
        className: 'text-center'
      },
      {
        Header: 'Appliance Model',
        accessor: 'applianceModel',
        className: 'text-center'
      },
      {
        Header: 'Appliance Make',
        accessor: 'applianceMake',
        className: 'text-center'
      },
      {
        Header: 'Product Count',
        accessor: 'productCount',
        className: 'text-center'
      }
    ];
  }
  onClickPagination(e) {
    let offset = e.currentTarget.dataset.offset;
    this.props.getAllVehicles(this.state.count, offset);
  }
  componentDidMount() {
    this.props.getAllVehicles(this.state.count, this.state.offset);
  }
  render() {
    const { Vehicles = [] } = this.props;
    const MyLoader = () => <Loader loading={this.state.loading} />;
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">List Of Vehicle</h3>
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
      </>
    );
  }
}
const getState = state => {
  return {
    loginData: state.authLogin,
    Vehicles: state.getAllVehicles
  };
};
export default connect(
  getState,
  {
    getAllVehicles
  }
)(ListVehicle);
