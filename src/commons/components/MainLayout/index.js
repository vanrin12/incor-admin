// @flow

import React, { memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Menu from 'commons/components/Menu';
// import Header from '../Header';

type Props = {
  children: any,
  // customClass?: string,
};

const MainLayout = ({ children }: Props) => {
  return (
    <Container fluid>
      <Row className="main-layout">
        <div className="main-layout__profile">profile</div>
        <Col xs={12} md={2}>
          <Menu />
        </Col>
        <Col xs={12} md={10}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

MainLayout.defaultProps = {
  customClass: '',
};
export default memo<Props>(MainLayout);
