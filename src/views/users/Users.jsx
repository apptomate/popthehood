/* eslint-disable indent */
import React from 'react';
// reactstrap components
import {
    Card,
    CardHeader,
    Container,
    Row,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import { getAllUsers, getUserVehicleDetails } from '../../redux/actions/Index';
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';
import { connect } from 'react-redux';
import { CustomExtendsTable } from '../common/tables/CustomExtendsTable';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.userVechileFun = this.userVechileFun.bind(this);
    }
    userVechileFun(e) {
        var user_id = parseInt(e.currentTarget.dataset.user_id);
        var data = {
            UserId: user_id
        };
        this.props.getUserVehicleDetails(data);
    }
    componentDidMount() {
        this.props.getAllUsers();
    }
    render() {
        const extends_table_columns = [
            'NAME',
            'ROLE',
            'PHONE NUMBER',
            'EMAIL',
            'SOURCED REG',
            'CREATED DATE',
            'EMAIL VERIFIED',
            'PHONE NUMBER VERIFIED',
            'PROMO CODE APPLICABLE',
            'ACTIONS'
        ];
        const table_columns = [
            'Make',
            'Model',
            'Year',
            'Color',
            'Licence Plate'
        ];
        const users_data = this.props.getAllUsersResponse.data;
        const table_data = this.props.getUserVehicleDetailsResponse.data;
        return (
            <>
                <UserHeader />
                {/* Page content */}
                <Container className='mt--7' fluid>
                    <Row>
                        <div className='col'>
                            <Card className='shadow'>
                                <CardHeader className='border-0'>
                                    <h3 className='mb-0'>Users List</h3>
                                </CardHeader>
                                {users_data ? (
                                    <CustomExtendsTable
                                        extends_table_columns={
                                            extends_table_columns
                                        }
                                        extends_table_data={users_data}
                                        userVechileFun={this.userVechileFun}
                                        table_columns={table_columns}
                                        table_data={table_data}
                                    />
                                ) : (
                                    ''
                                )}

                                <CardFooter className='py-4'>
                                    <nav aria-label='...'>
                                        <Pagination
                                            className='pagination justify-content-end mb-0'
                                            listClassName='justify-content-end mb-0'
                                        >
                                            <PaginationItem className='disabled'>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={e =>
                                                        e.preventDefault()
                                                    }
                                                    tabIndex='-1'
                                                >
                                                    <i className='fas fa-angle-left' />
                                                    <span className='sr-only'>
                                                        Previous
                                                    </span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className='active'>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={e =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={e =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    2{' '}
                                                    <span className='sr-only'>
                                                        (current)
                                                    </span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={e =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink
                                                    href='#pablo'
                                                    onClick={e =>
                                                        e.preventDefault()
                                                    }
                                                >
                                                    <i className='fas fa-angle-right' />
                                                    <span className='sr-only'>
                                                        Next
                                                    </span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter>
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
        getAllUsersResponse: state.getAllUsers,
        getUserVehicleDetailsResponse: state.getUserVehicleDetails
    };
};
export default connect(
    getState,
    {
        getAllUsers,
        getUserVehicleDetails
    }
)(Users);
