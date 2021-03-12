// @flow

import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import images from 'themes/images';
import Table from 'commons/components/Table';
import { headProgress } from 'constants/itemHead';
import { timeProject } from '../../../mockData/dataSelect';
import { listDataTableProgress } from '../../../mockData/listDataTable';

type Props = {
  getListProject: Function,
  listProject: Array<{}>,
};
const InformationNeeds = ({ getListProject, listProject }: Props) => {
  const [dataSubmit, setDataSubmit] = useState({
    nameProject: '',
    address: '',
    area: null,
  });
  const [dataAddProject, setDataAddProject] = useState({
    nameProject: '',
    description: '',
    time: null,
    price: '',
    prices: '',
    note: '',
  });
  useEffect(() => {
    getListProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [sttTime, setSttTime] = useState(0);
  const [progressStart, setProgressStart] = useState(0);
  const [progressEnd, setProgressEnd] = useState(0);
  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
    setDataAddProject({
      ...dataAddProject,
      [name]: value,
    });
  };
  return (
    <MainLayout activeMenu={4}>
      <Container fluid>
        <Row className="content-wrapper page-information page-progress">
          <Col xs={12} md={12} className="header-page">
            <img
              src={images.iconBack}
              alt=""
              className="action-increase"
              onClick={() => window.history.go(-1)}
              role="presentation"
            />
            <h2 className="title-page">Quản lý tiến độ công trình</h2>
          </Col>
          <Col xs={12} md={3}>
            <p className="page-progress__title-info">Tên khách hàng</p>
            <h2 className="page-progress__content-info name">NGUYỄN VĂN A</h2>
          </Col>
          <Col xs={12} md={3}>
            <p className="page-progress__title-info">Số điện thoại</p>
            <h2 className="page-progress__content-info">0123 456 789</h2>
          </Col>
          <Col xs={12} md={3}>
            <p className="page-progress__title-info">Email</p>
            <h2 className="page-progress__content-info">
              nguyenvana@gmail.com
            </h2>
          </Col>
          <Col xs={12} md={3}>
            <p className="page-progress__title-info">Khu vực</p>
            <h2 className="page-progress__content-info">Đà Nẵng</h2>
          </Col>
          <Col xs={12} md={12} className="action-delete">
            <Button customClass="button--primary" onClick={() => {}}>
              <p>LƯU THAY ĐỔI</p>
            </Button>
          </Col>
          <Col xs={12} md={4}>
            <SelectDropdown
              placeholder="Chọn dự án"
              listItem={listProject && Immutable.asMutable(listProject)}
              onChange={(e) => {
                handleChange(e, 'area');
              }}
              option={dataSubmit.area}
              customClass="select-project"
              label="Chọn dự án"
            />
          </Col>
          <Col xs={12} md={12}>
            <div className="custom-head table-head-progress">
              <p>HẠNG MỤC / ĐƠN VỊ</p>
              <p>MÔ TẢ KỸ THUẬT</p>
              <p>DỰ TOÁN</p>
              <p>THỜI GIAN THI CÔNG</p>
              <p>TIẾN ĐỘ</p>
              <p>SỐ TIỀN ĐÃ THANH TOÁN</p>
              <p>GHI CHÚ</p>
            </div>
            <div className="custom-body table-body-progress">
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'nameProject');
                  }}
                  value={dataAddProject.nameProject}
                  placeholder="Nhập tên"
                />
              </div>
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'description');
                  }}
                  value={dataAddProject.description}
                  placeholder="Nhập mô tả"
                />
              </div>
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'price');
                  }}
                  value={dataAddProject.price}
                  placeholder="Nhập số tiền"
                />
              </div>
              <div className="custom-body__item action">
                <div>
                  <img
                    src={images.iconBack}
                    alt=""
                    className="action-increase"
                    onClick={() => setSttTime(sttTime + 1)}
                    role="presentation"
                  />
                  <p>{sttTime}</p>
                  <img
                    src={images.iconBack}
                    alt=""
                    className="action__reduction"
                    onClick={() => sttTime !== 0 && setSttTime(sttTime - 1)}
                    role="presentation"
                  />
                </div>
                <SelectDropdown
                  placeholder="THÁNG"
                  listItem={timeProject}
                  onChange={(e) => {
                    handleChange(e, 'time');
                  }}
                  option={dataAddProject.time}
                  customClass="select-headquarters"
                />
              </div>
              <div className="custom-body__item action-progress">
                <div>
                  <img
                    src={images.iconBack}
                    alt=""
                    className="action-increase"
                    onClick={() => setProgressStart(progressStart + 1)}
                    role="presentation"
                  />
                  <p>{progressStart}</p>
                  <img
                    src={images.iconBack}
                    alt=""
                    className="action__reduction"
                    onClick={() =>
                      progressStart !== 0 && setProgressStart(progressStart - 1)
                    }
                    role="presentation"
                  />
                </div>
                <h3>/</h3>
                <div>
                  <img
                    src={images.iconBack}
                    alt=""
                    className="action-increase"
                    onClick={() => setProgressEnd(progressEnd + 1)}
                    role="presentation"
                  />
                  <p>{progressEnd}</p>
                  <img
                    src={images.iconBack}
                    alt=""
                    className="action__reduction"
                    onClick={() =>
                      progressEnd !== 0 && setProgressEnd(progressEnd - 1)
                    }
                    role="presentation"
                  />
                </div>
              </div>
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'prices');
                  }}
                  value={dataAddProject.prices}
                  placeholder="Nhập số tiền"
                />
              </div>
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'note');
                  }}
                  value={dataAddProject.note}
                  placeholder="Nhập Ghi chú"
                />
              </div>
            </div>
          </Col>
          <Col xs={12} md={12} className="action-delete">
            <Button customClass="button--primary" onClick={() => {}}>
              <p>THÊM MỚI</p>
            </Button>
          </Col>
          <Col xs={12} md={12} className="title-project">
            Dự án 1
          </Col>
          <Col xs={12} md={4}>
            <p className="page-progress__title-info">Tên dự án/ chủ đầu tư</p>
            <h2 className="page-progress__content-info">LUXURY WHITE VILLA</h2>
          </Col>
          <Col xs={12} md={7}>
            <p className="page-progress__title-info">Địa chỉ công trình</p>
            <h2 className="page-progress__content-info">
              K02 Phan Đăng Lưu, Q. Thanh Khê, TP. Đà Nẵng
            </h2>
          </Col>
          <Col xs={12} md={12} className="pt-3">
            <Table
              tableHeads={headProgress}
              tableBody={listDataTableProgress}
              showLabel
              isShowId
              isShowColumnBtn
              nameBtn2="Xem"
              // handleClickBtnView={handleViewInformation}
            />
          </Col>
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel={<span className="gap">...</span>}
              // pageCount={Math.ceil(totalRows / params.pageSize)}
              // onPageChange={(eventKey) => handleSelectPagination(eventKey)}
              forcePage={0}
              containerClassName="pagination"
              disabledClassName="disabled"
              activeClassName="active"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              marginPagesDisplayed={1}
              nextLinkClassName="page-link"
            />
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default InformationNeeds;
