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

class serviceListpage extends React.Component {
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
                  <h3 className='mb-0'>Service List</h3>
                </CardHeader>
                <Table className='align-items-center table-flush' responsive>
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>User Name</th>
                      <th scope='col'>Vehicle Name</th>
                      <th scope='col'>Remainder Minutes</th>
                      <th scope='col' className='text-center'>
                        Tearms & Condition
                      </th>
                      <th scope='col' className='text-center'>
                        Promo Code
                      </th>

                      <th scope='col' />
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope='row'>user name</th>
                      <th scope='row'>Vehicle Name</th>
                      <td>20 Minutes</td>
                      <td className='text-center'>
                        <Badge color='success'>accepted</Badge>
                      </td>
                      <td className='text-center'>
                        <Badge color='danger'>Not Applied</Badge>
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
                      <th scope='row'>user name</th>
                      <th scope='row'>Vehicle Name</th>
                      <td>2 hr</td>
                      <td className='text-center'>
                        <Badge color='danger'>Not accepted</Badge>
                      </td>
                      <td className='text-center'>
                        <Badge color='success'>Applied</Badge>
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
                      <th scope='row'>user name</th>
                      <th scope='row'>Vehicle Name</th>
                      <td>35 Minutes</td>
                      <td className='text-center'>
                        <Badge color='danger'> Not accepted</Badge>
                      </td>
                      <td className='text-center'>
                        <Badge color='success'>Applied</Badge>
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
                      <th scope='row'>user name</th>
                      <th scope='row'>Vehicle Name</th>
                      <td>1 hr</td>
                      <td className='text-center'>
                        <Badge color='success'>accepted</Badge>
                      </td>
                      <td className='text-center'>
                        <Badge color='success'>Applied</Badge>
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

export default serviceListpage;
