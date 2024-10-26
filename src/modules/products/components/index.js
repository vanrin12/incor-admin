import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import DatePicker from 'react-datepicker';
import SelectDropdown from 'commons/components/Select';
import { useSelector } from 'react-redux';
import Immutable from 'seamless-immutable';
import listActions from 'constants/actions';
import Table from 'commons/components/Table';
import { headerProductTable } from 'constants/itemHead';

function Products() {
  const { listAllCategories } = useSelector((state) => state?.postReducer);
  const [createDate, setCreateDate] = useState(null);
  const [dataFilter, setDataFilter] = useState({
    headquarters: null,
    category: null,
    seo: null,
  });

  const [action, setAction] = useState(null);

  const handleDateChange = (date) => {
    console.log(date);
    setCreateDate(date);
  };

  const handleChange = (value, name) => {
    setDataFilter({
      ...dataFilter,
      [name]: value,
    });
  };

  console.log(headerProductTable);
  return (
    <MainLayout activeMenu={9}>
      <Container fluid>
        <Row className="content-wrapper page-products">
          <div className="container-fluid p-4">
            <div className="mb-4 d-flex gap-3 justify-content-between">
              <div>
                <button className="btn btn-danger mr-3">TẠO SẢN PHẨM</button>
                <button className="btn btn-danger">QUẢN LÝ DANH MỤC</button>
              </div>
              <div className="ms-auto d-flex">
                <input
                  type="search"
                  className="form-control custom-search"
                  placeholder="Search..."
                />
                <button className="btn btn-danger ms-2">TÌM</button>
              </div>
            </div>
            {/* Status Bar */}
            <div className="mb-4">
              <span className="me-2">Tất cả (123)</span>
              <span className="text-primary me-2">Của tôi (1)</span>
              <span className="text-primary me-2">Đã xuất bán (100)</span>
              <span className="text-primary me-2">Nhập (11)</span>
              <span className="text-primary">Thùng rác (11)</span>
            </div>
            {/* Filters */}
            <div className="mb-4 d-flex gap-3">
              <SelectDropdown
                placeholder="Action"
                listItem={listActions && Immutable.asMutable(listActions)}
                onChange={(option) => {
                  setAction(option);
                }}
                option={action}
                customClass="select-job mr-2"
              />
              <button className="btn btn-danger mr-5">APPLY</button>
              {/* <select className="form-select w-auto mr-3"> */}
              <DatePicker
                selected={createDate}
                // onSelect={handleDateSelect} //when day is clicked
                onChange={(date) => handleDateChange(date)}
                placeholderText="All Date"
                className="custom-datepicker-input"
              />
              {/* </select> */}
              <SelectDropdown
                placeholder="All Catergory"
                listItem={
                  listAllCategories && Immutable.asMutable(listAllCategories)
                }
                onChange={(e) => {
                  handleChange(e, 'category');
                }}
                option={dataFilter.category}
                customClass="select-job mr-2"
              />
              <button className="btn btn-danger">FILTER</button>
            </div>
          </div>
          <Col xs={12} md={12} className="table-page table-partner">
            <Table
              tableHeads={headerProductTable}
              tableBody={[]}
              showLabel
              isShowId
              isShowColumnBtn1
              nameBtn1="Quản lý"
              isShowColumnBtn
              nameBtn2="Quản lý"
              // handleClickBtnView={handleViewInformation}
              // handleClickBtnDetail={handleClickBtnDetail}
            />
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
}

export default Products;
