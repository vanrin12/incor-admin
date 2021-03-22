// @flow

import React, { memo } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import ROUTERS from 'constants/router';

type Props = {
  history: {
    push: Function,
  },
};

const Display = ({ history }: Props) => {
  return (
    <MainLayout activeMenu={6}>
      <Container fluid>
        <Row className="content-wrapper page-display">
          <Col
            xs={12}
            md={12}
            className="d-flex align-items-center mb-4 justify-content-end"
          >
            <h2 className="cancel-display">Hủy bỏ</h2>
            <Button customClass="button--primary" onClick={() => {}}>
              LƯU
            </Button>
          </Col>
          <Col xs={12} md={12}>
            <div
              className="page-display__item-display"
              onClick={() => history.push(ROUTERS.DISPLAY_IDENTIFIED)}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            >
              Nhận diện
            </div>
            <div
              className="page-display__item-display"
              onClick={() => history.push(ROUTERS.DISPLAY_MAIN)}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            >
              Trang chủ
            </div>
            <div
              className="page-display__item-display"
              onClick={() => history.push(ROUTERS.DISPLAY_HEADER)}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            >
              Header
            </div>
            <div
              className="page-display__item-display"
              onClick={() => history.push(ROUTERS.DISPLAY_FOOTER)}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            >
              Footer
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(Display);
