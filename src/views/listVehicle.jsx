import React from 'react';

// reactstrap components
import {
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

class listVehicle extends React.Component {
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
                  <h3 className='mb-0'>List Of Vehicle</h3>
                </CardHeader>
                <Table className='align-items-center table-flush' responsive>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>Make</th>
                      <th scope='col'>Model</th>
                      <th scope='col'>Year</th>
                      <th scope='col'>Color</th>
                      <th scope='col'>Licence Plate</th>
                      <th scope='col'>Special Notes</th>

                      <th scope='col'>Created Date</th>
                      <th scope='col'>Modified Date</th>
                      <th scope='col' />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope='row'>Mercedes-Benz</th>
                      <td>C-Class</td>
                      <td>2015</td>
                      <td>
                        <Badge color='' className='badge-dot mr-4'>
                          <i className='bg-danger' />
                          Red
                        </Badge>
                      </td>
                      <td>AI 93958</td>
                      <td>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.{' '}
                      </td>
                      <td>14-10-2019</td>
                      <td>14-10-2019</td>
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

                    <tr>
                      <th scope='row'>Mercedes-Benz</th>
                      <td>A-Class</td>
                      <td>2012</td>
                      <td>
                        <Badge color='' className='badge-dot mr-4'>
                          <i className='bg-warning' />
                          Yellow
                        </Badge>
                      </td>
                      <td>AI 93998</td>
                      <td>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.{' '}
                      </td>
                      <td>14-10-2019</td>
                      <td>14-10-2019</td>
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

                    <tr>
                      <th scope='row'>Mercedes-Benz</th>
                      <td>B-Class</td>
                      <td>2017</td>
                      <td>
                        <Badge color='' className='badge-dot mr-4'>
                          <i className='bg-info' />
                          Blue
                        </Badge>
                      </td>
                      <td>AI 65431</td>
                      <td>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.{' '}
                      </td>
                      <td>14-10-2019</td>
                      <td>14-10-2019</td>
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

                    <tr>
                      <th scope='row'>Mercedes-Benz</th>
                      <td>D-Class</td>
                      <td>2015</td>
                      <td>
                        <Badge color='' className='badge-dot mr-4'>
                          <i className='bg-success' />
                          Green
                        </Badge>
                      </td>
                      <td>AI 49865</td>
                      <td>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.{' '}
                      </td>
                      <td>14-10-2019</td>
                      <td>14-10-2019</td>
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

export default listVehicle;
