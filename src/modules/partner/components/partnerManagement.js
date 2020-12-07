// @flow

import React, { useState } from 'react';
import { Row, Col, Container, Tabs, Tab } from 'react-bootstrap';
import SelectDropdown from 'commons/components/Select';
import ReactPaginate from 'react-paginate';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Table from 'commons/components/Table';
import Input from 'commons/components/Input';
import { headPartnerManagement } from 'constants/itemHead';
import { listDataCustomerManagement } from '../../../mockData/listDataTable';
import { headquarters, job, vote } from '../../../mockData/dataSelect';

const Customer = () => {
  const [dataFilter, setDataFilter] = useState({
    headquarters: null,
    job: null,
    vote: null,
    name: '',
  });
  const [keySearch, setKeySearch] = useState('');
  const handleChange = (value, name) => {
    setDataFilter({
      ...dataFilter,
      [name]: value,
    });
  };
  const handleKeySearch = (value) => {
    setKeySearch(value);
  };
  return (
    <MainLayout activeMenu={4}>
      <Container fluid>
        <Row className="content-wrapper page-partner page-post page-partner-management">
          <Col xs={12} md={2}>
            <div className="avatar">{/* <p>THAY ẢNH</p> */}</div>
          </Col>
          <Col xs={12} md={4}>
            <Row>
              <Col xs={12} md={12}>
                <Input
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value, 'name');
                  }}
                  maxLength="20"
                  value={dataFilter.name}
                  placeholder="Nhập tên doanh nghiệp"
                  label="Tên doanh nghiệp"
                  customClass="name-account"
                />
              </Col>
              <Col xs={12} md={6}>
                <SelectDropdown
                  placeholder="Chọn quy mô"
                  listItem={headquarters}
                  onChange={(e) => {
                    handleChange(e, 'headquarters');
                  }}
                  option={dataFilter.headquarters}
                  customClass="select-headquarters"
                  label="Quy mô nhân sự"
                />
              </Col>
              <Col xs={12} md={6}>
                <SelectDropdown
                  placeholder="Nhập mã số thuế"
                  listItem={job}
                  onChange={(e) => {
                    handleChange(e, 'job');
                  }}
                  option={dataFilter.job}
                  customClass="select-headquarters"
                  label="Mã số thuế"
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4}>
            <Row>
              <Col xs={12} md={12}>
                <Input
                  type="text"
                  onChange={(e) => {
                    handleChange(e.target.value, 'name');
                  }}
                  maxLength="20"
                  value={dataFilter.name}
                  placeholder="Nhập địa chỉ công ty"
                  label="Trụ sở"
                  customClass="name-account"
                />
              </Col>
              <Col xs={12} md={12}>
                <SelectDropdown
                  placeholder="Chọn hashtag"
                  listItem={vote}
                  onChange={(e) => {
                    handleChange(e, 'vote');
                  }}
                  option={dataFilter.vote}
                  customClass="select-vote"
                  label="Ngành nghề"
                />
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={2}>
            <Button customClass="button--primary" onClick={() => {}}>
              <p>LƯU THAY ĐỔI</p>
            </Button>
          </Col>

          <Tabs
            defaultActiveKey="tab1"
            className="partner__tab col-12"
            // onSelect={(eventKey) => onSelect(eventKey)}
          >
            <Tab eventKey="tab1" title="Báo giá">
              <Col xs={12} md={12} className="form-search">
                <div className="form-search__right">
                  <Input
                    type="text"
                    onChange={(e) => {
                      handleKeySearch(e.target.value);
                    }}
                    maxLength="20"
                    value={keySearch}
                  />
                  <Button customClass="button--primary mt-0" onClick={() => {}}>
                    <p>TÌM</p>
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={12} className="table-page table-partner">
                <Table
                  tableHeads={headPartnerManagement}
                  tableBody={listDataCustomerManagement}
                  showLabel
                  isShowId
                  isShowColumnBtn1
                  nameBtn1="Xem"
                  isShowColumnBtn
                  nameBtn2="Báo giá"
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
            </Tab>
            <Tab eventKey="tab2" title="Sản phẩm">
              <Col xs={12} md={12} className="form-search">
                <div className="form-search__right">
                  <Input
                    type="text"
                    onChange={(e) => {
                      handleKeySearch(e.target.value);
                    }}
                    maxLength="20"
                    value={keySearch}
                  />
                  <Button customClass="button--primary mt-0" onClick={() => {}}>
                    <p>TÌM</p>
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={12} className="table-page table-partner">
                <Table
                  tableHeads={headPartnerManagement}
                  tableBody={listDataCustomerManagement}
                  showLabel
                  isShowId
                  isShowColumnBtn1
                  nameBtn1="Xem"
                  isShowColumnBtn
                  nameBtn2="Báo giá"
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
            </Tab>
            <Tab eventKey="tab3" title="Công trình">
              <Col xs={12} md={12} className="form-search">
                <div className="form-search__right">
                  <Input
                    type="text"
                    onChange={(e) => {
                      handleKeySearch(e.target.value);
                    }}
                    maxLength="20"
                    value={keySearch}
                  />
                  <Button customClass="button--primary mt-0" onClick={() => {}}>
                    <p>TÌM</p>
                  </Button>
                </div>
              </Col>
              <Col xs={12} md={12} className="table-page table-partner">
                <Table
                  tableHeads={headPartnerManagement}
                  tableBody={listDataCustomerManagement}
                  showLabel
                  isShowId
                  isShowColumnBtn1
                  nameBtn1="Xem"
                  isShowColumnBtn
                  nameBtn2="Báo giá"
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
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Customer;
