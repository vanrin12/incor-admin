// @flow

import React, { useState, memo } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import ROUTERS from 'constants/router';
import { headquarters } from '../../../mockData/dataSelect';

type Props = {
  history: {
    push: Function,
  },
};

const InformationNeeds = ({ history }: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    nameCustomer: '',
    phone: '',
    email: '',
    area: null,
    nameBusiness: '',
    emailBusiness: '',
  });
  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };
  return (
    <MainLayout activeMenu={4}>
      <Container fluid>
        <Row className="content-wrapper page-information">
          <Col xs={12} md={12}>
            <h2 className="title-page">Thông tin nhu cầu</h2>
          </Col>
          <Col xs={12} md={3}>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'nameCustomer');
              }}
              maxLength="20"
              value={dataSubmit.nameCustomer}
              label="Tên khách hàng"
              placeholder="Tên khách hàng"
            />
          </Col>
          <Col xs={12} md={3}>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'phone');
              }}
              maxLength="20"
              value={dataSubmit.phone}
              label="Số điện thoại"
              placeholder="Số điện thoại"
            />
          </Col>
          <Col xs={12} md={3}>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'email');
              }}
              maxLength="20"
              value={dataSubmit.email}
              label="Email"
              placeholder="Email"
            />
          </Col>
          <Col xs={12} md={3}>
            <SelectDropdown
              placeholder="Khu vực"
              listItem={headquarters}
              onChange={(e) => {
                handleChange(e, 'area');
              }}
              option={dataSubmit.area}
              customClass="select-headquarters"
              label="Khu vực"
            />
          </Col>
          <Col xs={12} md={3}>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'nameBusiness');
              }}
              maxLength="20"
              value={dataSubmit.nameBusiness}
              label="Tên kinh doanh Incor"
              placeholder="Tên kinh doanh Incor"
            />
          </Col>
          <Col xs={12} md={3}>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'emailBusiness');
              }}
              maxLength="20"
              value={dataSubmit.emailBusiness}
              label="Email kinh doanh Incor"
              placeholder="Email kinh doanh Incor"
            />
          </Col>
          <Col xs={12} md={12} className="action-delete">
            <Button customClass="button--primary" onClick={() => {}}>
              <p>LƯU THAY ĐỔI</p>
            </Button>
          </Col>
          <Col xs={12} md={12}>
            <h2 className="title-project">Dự án</h2>
            <div className="box-project">
              <p>Dự án 1</p>
              <h3>Quản lý</h3>
              <h4>Kết thúc dự án</h4>
            </div>
          </Col>
          <Col xs={12} md={12} className="action-delete">
            <Button
              customClass="button--primary"
              onClick={() => history.push(ROUTERS.PROGRESS_PROJECT)}
            >
              <p>THÊM DỰ ÁN</p>
            </Button>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(InformationNeeds);
