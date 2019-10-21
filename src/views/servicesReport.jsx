import React from 'react';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  Container,
  Row,
  Badge,
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
// core components
import UserHeader from 'components/Headers/UserHeader.jsx';

class servicesReport extends React.Component {
  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className='mt--7' fluid>
          <Row>
            <div className='col'>
              <Card className='shadow'>
                <CardHeader className='border-0'>
                  <h3 style={{ float: 'left' }} className='mb-0'>
                    Service Report
                  </h3>
                  <span style={{ float: 'right', paddingTop: '0.5rem' }}>
                    <Button color='primary' size='sm'>
                      <i className='fas fa-file-download'></i> CSV
                    </Button>
                    <Button color='info' size='sm'>
                      <i className='fas fa-file-download'></i> PDF
                    </Button>
                    <Button color='success' size='sm'>
                      <i className='fas fa-file-download'></i> Excel
                    </Button>

                    <UncontrolledDropdown>
                      <DropdownToggle
                        className='btn-icon-only text-light'
                        href='#pablo'
                        role='button'
                        size='sm'
                        color=''
                        onClick={e => e.preventDefault()}
                      >
                        <i className='fas fa-filter table-fillter-icon'></i>
                      </DropdownToggle>
                      <DropdownMenu className='dropdown-menu-arrow' right>
                        <DropdownItem
                          href='#pablo'
                          onClick={e => e.preventDefault()}
                        >
                          Date
                        </DropdownItem>
                        <DropdownItem
                          href='#pablo'
                          onClick={e => e.preventDefault()}
                        >
                          Payment Status
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </span>
                </CardHeader>
                <Table className='align-items-center table-flush' responsive>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>User Name</th>
                      <th scope='col'>Vehicle Details</th>
                      <th scope='col'>Request Service Date</th>
                      <th scope='col'>Actual Service Date</th>
                      <th scope='col'>Service Due Date</th>
                      <th scope='col' className='text-center'>
                        Status
                      </th>
                      <th scope='col' className='text-center'>
                        Service Plan
                      </th>
                      <th scope='col' className='text-center'>
                        Amount
                      </th>
                      <th scope='col' className='text-center'>
                        Payment Status
                      </th>
                      <th scope='col'>Create Date</th>
                      <th scope='col' />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope='row'>User Name</th>
                      <th scope='row'>Vehicle Name</th>
                      <td>05-10-2019</td>
                      <td>10-10-2019</td>
                      <td>15-10-2019</td>
                      <td className='text-center'>
                        {' '}
                        <Badge color='success' pill>
                          Success
                        </Badge>
                        /{' '}
                        <Badge color='danger' pill>
                          Danger
                        </Badge>
                      </td>
                      <th scope='row' className='text-center'>
                        Plane Type
                      </th>
                      <td className='text-center'>$ 2.2</td>
                      <td className='text-center'>
                        <Badge color='success'>Paid</Badge>
                      </td>
                      <td>05-10-2019</td>
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
                          <DropdownMenu className='dropdown-menu-arrow' right>
                            <DropdownItem
                              href='#pablo'
                              onClick={e => e.preventDefault()}
                            >
                              Action
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  </tbody>
                </Table>
                <CardFooter className='py-4'>
                  <nav aria-label='...'>
                    <Pagination
                      className='pagination justify-content-end mb-0'
                      listClassName='justify-content-end mb-0'
                    >
                      <PaginationItem className='disabled'>
                        <PaginationLink
                          href='#pablo'
                          onClick={e => e.preventDefault()}
                          tabIndex='-1'
                        >
                          <i className='fas fa-angle-left' />
                          <span className='sr-only'>Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className='active'>
                        <PaginationLink
                          href='#pablo'
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href='#pablo'
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className='sr-only'>(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href='#pablo'
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href='#pablo'
                          onClick={e => e.preventDefault()}
                        >
                          <i className='fas fa-angle-right' />
                          <span className='sr-only'>Next</span>
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

export default servicesReport;
