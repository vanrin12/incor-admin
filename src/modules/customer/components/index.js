// @flow

import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Table from 'commons/components/Table';
import { headCustomer } from 'constants/itemHead';
import { listDataCustomer } from '../../../mockData/listDataTable';

const Customer = () => {
  return (
    <MainLayout activeMenu={4}>
      <Container fluid>
        <Row className="content-wrapper page-customer">
          <Col xs={12} md={12}>
            <h2 className="title-page">Thông tin nhu cầu - Dự án 1</h2>
          </Col>
          <Col xs={12} md={4} className="page-customer__top">
            <h3>Tên dự án/ chủ đầu tư</h3>
            <h2 className="name-company">LUXURY WHITE VILLA</h2>
            <p>
              Loại hình không gian <span>Không gian kinh doanh</span>
            </p>
          </Col>
          <Col xs={12} md={4} className="page-customer__top">
            <h3>Địa chỉ công trình</h3>
            <h2>K02 Phan Đăng Lưu, Q. Thanh Khê, TP. Đà Nẵng</h2>
            <p>
              Phân chia không gian <span>Nhà hàng</span>
            </p>
          </Col>
          <Col xs={12} md={4} className="page-customer__top">
            <h3>Nhà hàng</h3>
            <h2>Đà Nẵng</h2>
          </Col>
          <Col xs={12} md={12} className="action-update">
            <p>Hạng mục chi tiết</p>
            <Button customClass="button--primary" onClick={() => {}}>
              <p>CHỈNH SỬA</p>
            </Button>
          </Col>
          <Col xs={12} md={12} className="table-page table-partner">
            <Table
              tableHeads={headCustomer}
              tableBody={listDataCustomer}
              showLabel
              isShowId
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
