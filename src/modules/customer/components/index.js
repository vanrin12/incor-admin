// @flow

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import SelectDropdown from 'commons/components/Select';
import ReactPaginate from 'react-paginate';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Table from 'commons/components/Table';
import Input from 'commons/components/Input';
import { headCustomer } from 'constants/itemHead';
import { listDataCustomer } from '../../../mockData/listDataTable';
import { headquarters, job, vote } from '../../../mockData/dataSelect';

const Customer = () => {
  const [dataFilter, setDataFilter] = useState({
    headquarters: null,
    job: null,
    vote: null,
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
        <Row className="content-wrapper page-partner page-post">
          <Col xs={12} md={12}>
            <h2 className="title-page">Danh sách Khách hàng</h2>
          </Col>
          <Col xs={12} md={6} className="form-search">
            <div className="form-search__left">
              <SelectDropdown
                placeholder="Ngày tạo"
                listItem={vote}
                onChange={(e) => {
                  handleChange(e, 'vote');
                }}
                option={dataFilter.vote}
                customClass="select-vote"
              />
              <SelectDropdown
                placeholder="Khu vực"
                listItem={headquarters}
                onChange={(e) => {
                  handleChange(e, 'headquarters');
                }}
                option={dataFilter.headquarters}
                customClass="select-headquarters"
              />
              <SelectDropdown
                placeholder="Kinh doanh"
                listItem={job}
                onChange={(e) => {
                  handleChange(e, 'job');
                }}
                option={dataFilter.job}
                customClass="select-job"
              />
              <Button customClass="button--primary" onClick={() => {}}>
                FILTER
              </Button>
            </div>
          </Col>
          <Col xs={12} md={6} className="form-search">
            <div className="form-search__right">
              <Input
                type="text"
                onChange={(e) => {
                  handleKeySearch(e.target.value);
                }}
                maxLength="20"
                value={keySearch}
              />
              <Button customClass="button--primary" onClick={() => {}}>
                <p>TÌM</p>
              </Button>
            </div>
          </Col>
          <Col xs={12} md={12} className="table-page table-partner">
            <Table
              tableHeads={headCustomer}
              tableBody={listDataCustomer}
              showLabel
              isShowId
              isShowColumnBtn1
              nameBtn1="Quản lý"
              isShowColumnBtn
              nameBtn2="Quản lý"
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

export default Customer;
