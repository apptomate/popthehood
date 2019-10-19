/* eslint-disable indent */
import React, { Fragment } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Badge,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    UncontrolledTooltip,
    UncontrolledCollapse
} from 'reactstrap';
export function CustomExtendsTable(props) {
    const extends_table_columns = props.extends_table_columns;
    const extends_table_data = props.extends_table_data;
    const table_columns = props.table_columns;
    const table_data = props.table_data;
    return (
        <Fragment>
            <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                    <tr>
                        {extends_table_columns.map((ext_column, index) => (
                            <th key={index} scope='col'>
                                {ext_column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {extends_table_data.map(data => (
                        <Fragment key={data.userId}>
                            <tr>
                                {data.role !== 'Admin' ? (
                                    <th
                                        scope='row'
                                        id={'toggler_' + data.userId}
                                        className='cursor'
                                    >
                                        <Badge
                                            color='success'
                                            style={{ marginRight: '1rem' }}
                                            data-user_id={data.userId}
                                            onClick={props.userVechileFun}
                                        >
                                            <span className='fas fa-plus'></span>
                                        </Badge>
                                        {data.name}
                                    </th>
                                ) : (
                                    <th>{data.name}</th>
                                )}
                                <td>{data.role}</td>
                                <td>{data.phoneNumber}</td>
                                <td>{data.email}</td>
                                <td>{data.sourceofReg}</td>
                                <td>{data.createdDate}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <h3>
                                        <i
                                            className={
                                                data.isEmailVerified
                                                    ? 'far fa-check-circle'
                                                    : 'far fa-times-circle'
                                            }
                                        />
                                    </h3>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <h3>
                                        <i
                                            className={
                                                data.isPhoneNumVerified
                                                    ? 'far fa-check-circle'
                                                    : 'far fa-times-circle'
                                            }
                                        />
                                    </h3>
                                </td>
                                <td style={{ textAlign: 'center' }}>
                                    <h3>
                                        <i
                                            className={
                                                data.isPromoCodeApplicable
                                                    ? 'far fa-check-circle'
                                                    : 'far fa-times-circle'
                                            }
                                        />
                                    </h3>
                                </td>
                                <td className='text-right'>
                                    <UncontrolledDropdown>
                                        <DropdownToggle
                                            className='btn-icon-only text-light'
                                            href='#pablo'
                                            role='button'
                                            size='sm'
                                            color=''
                                            onClick={e => e.preventDefault()}
                                        >
                                            <i className='fas fa-ellipsis-v' />
                                        </DropdownToggle>
                                        <DropdownMenu
                                            className='dropdown-menu-arrow'
                                            right
                                        >
                                            <DropdownItem
                                                href='#pablo'
                                                onClick={e =>
                                                    e.preventDefault()
                                                }
                                            >
                                                Action
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </td>
                            </tr>
                            {data.role !== 'Admin' ? (
                                <UncontrolledCollapse
                                    toggler={'#toggler_' + data.userId}
                                >
                                    <Card className='shadow'>
                                        <CardHeader className='border-0'>
                                            <Row className='align-items-center'>
                                                <div className='col'>
                                                    <h3 className='mb-0'>
                                                        List Of Vehicles
                                                    </h3>
                                                </div>
                                            </Row>
                                        </CardHeader>
                                        <Table
                                            className='align-items-center table-flush'
                                            responsive
                                        >
                                            <thead className='thead-light'>
                                                {table_columns.map(
                                                    (column, index) => (
                                                        <th
                                                            key={index}
                                                            scope='col'
                                                        >
                                                            {column}
                                                        </th>
                                                    )
                                                )}
                                            </thead>
                                            <tbody>
                                                {!table_data ? (
                                                    <tr>
                                                        <td>No Record Found</td>
                                                    </tr>
                                                ) : (
                                                    <Fragment>
                                                        {table_data.map(
                                                            data => (
                                                                <tr
                                                                    key={
                                                                        data.vehicleId
                                                                    }
                                                                >
                                                                    <th scope='row'>
                                                                        {
                                                                            data.make
                                                                        }
                                                                    </th>
                                                                    <td>
                                                                        {
                                                                            data.model
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            data.year
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            data.color
                                                                        }{' '}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            data.licensePlate
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </Fragment>
                                                )}
                                            </tbody>
                                        </Table>
                                    </Card>
                                </UncontrolledCollapse>
                            ) : (
                                ''
                            )}
                        </Fragment>
                    ))}
                </tbody>
            </Table>
        </Fragment>
    );
}
