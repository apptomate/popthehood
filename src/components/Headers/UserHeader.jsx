import React from 'react';

// reactstrap components
import { Button, Container, Row, Col } from 'reactstrap';

class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
          style={{
            minHeight: '300px',
            backgroundImage:
              'url(' + require('assets/img/theme/header-cover1.jpg') + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Mask */}
          <span className='mask bg-gradient-default opacity-8' />
          {/* Header container */}
          <Container className='d-flex align-items-center' fluid>
            <Row></Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
