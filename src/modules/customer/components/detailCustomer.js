// @flow

import React, { useState, memo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Immutable from 'seamless-immutable';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Loading from 'commons/components/Loading';
import ROUTERS from 'constants/router';

type Props = {
  history: {
    push: Function,
  },
  getDetailCustomer: Function,
  match: {
    params: {
      id: string,
    },
  },
  dataDetailCustomer: Object,
  isProcessing: boolean,
  getListAreas: Function,
  dataAreas: Array<{
    id: number,
  }>,
  updateCustomer: Function,
  type: string,
  deleteProject: Function,
};

const InformationNeeds = ({
  history,
  getDetailCustomer,
  match,
  dataDetailCustomer,
  isProcessing,
  getListAreas,
  dataAreas,
  updateCustomer,
  type,
  deleteProject,
}: Props) => {
  const customerId = match.params.id;
  const areas = dataAreas.filter(
    (item) => item.id === dataDetailCustomer.area_id
  );
  const [dataSubmit, setDataSubmit] = useState({
    nameCustomer: dataDetailCustomer.name,
    phone: dataDetailCustomer.phone,
    email: dataDetailCustomer.email,
    area: (areas && areas[0]) || null,
    nameBusiness: dataDetailCustomer.name_incor,
    emailBusiness: dataDetailCustomer.email_incor,
  });

  useEffect(() => {
    getDetailCustomer(customerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  useEffect(() => {
    getListAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDataSubmit({
      nameCustomer: dataDetailCustomer.name,
      phone: dataDetailCustomer.phone,
      email: dataDetailCustomer.email,
      area: (areas && areas[0]) || null,
      nameBusiness: dataDetailCustomer.name_incor,
      emailBusiness: dataDetailCustomer.email_incor,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDetailCustomer]);

  useEffect(() => {
    if (type === 'UPDATE_CUSTOMER_SUCCESS') {
      getDetailCustomer(customerId);
    }
    if (type === 'DELETE_PROJECT_SUCCESS') {
      getDetailCustomer(customerId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  const handleDeleteProject = (idProject) => {
    deleteProject(idProject);
  };

  const renderProject =
    dataDetailCustomer &&
    dataDetailCustomer.projects &&
    dataDetailCustomer.projects.map((item) => {
      return (
        <div className="box-project" key={item.id}>
          <p>{item.name}</p>
          <h3
            onClick={() =>
              history.push(
                `${ROUTERS.CUSTOMER_INFORMATION_PROJECT}/${item?.id}`
              )
            }
            role="presentation"
          >
            Quản lý
          </h3>
          <h4 onClick={() => handleDeleteProject(item.id)} role="presentation">
            Kết thúc dự án
          </h4>
        </div>
      );
    });

  const handleUpdateCustomer = () => {
    updateCustomer(customerId, {
      name: dataSubmit?.nameCustomer,
      email: dataSubmit?.email,
      phone: dataSubmit?.phone,
      area_id: dataSubmit?.area?.id,
      name_incor: dataSubmit?.nameBusiness,
      email_incor: dataSubmit?.emailBusiness,
    });
  };
  return (
    <MainLayout activeMenu={4}>
      {isProcessing ? (
        <Loading />
      ) : (
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
                value={dataSubmit.email}
                label="Email"
                placeholder="Email"
              />
            </Col>
            <Col xs={12} md={3}>
              <SelectDropdown
                placeholder="Khu vực"
                listItem={dataAreas && Immutable.asMutable(dataAreas)}
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
                value={dataSubmit.emailBusiness}
                label="Email kinh doanh Incor"
                placeholder="Email kinh doanh Incor"
              />
            </Col>
            <Col xs={12} md={12} className="action-delete">
              <Button
                customClass="button--primary"
                onClick={handleUpdateCustomer}
              >
                <p>LƯU THAY ĐỔI</p>
              </Button>
            </Col>
            <Col xs={12} md={12}>
              <h2 className="title-project">Dự án</h2>
              {renderProject}
            </Col>
            <Col xs={12} md={12} className="action-delete">
              <Button
                customClass="button--primary"
                onClick={() =>
                  history.push(`${ROUTERS.INFORMATION_PROJECT}/${customerId}`)
                }
              >
                <p>THÊM DỰ ÁN</p>
              </Button>
            </Col>
          </Row>
        </Container>
      )}
    </MainLayout>
  );
};

export default memo<Props>(InformationNeeds);
