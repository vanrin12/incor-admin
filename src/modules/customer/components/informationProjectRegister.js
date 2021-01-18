// @flow

import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import images from 'themes/images';
import Input from 'commons/components/Input';
import {
  headquarters,
  listSpace,
  listTypeSpace,
} from '../../../mockData/dataSelect';
import { listDataTableCategories } from '../../../mockData/listDataTable';

const InformationNeeds = () => {
  const [chooseCategories, setChooseCategories] = useState('');
  const [dataSubmit, setDataSubmit] = useState({
    nameProject: '',
    address: '',
    area: null,
    space: null,
    typeSpace: null,
  });
  const [dataAddCategories, setDataAddCategories] = useState({
    nameCategories: '',
    description: '',
    dvt: '',
    note: '',
  });
  const [total, setTotal] = useState(0);
  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
    setDataAddCategories({
      ...dataAddCategories,
      [name]: value,
    });
  };

  const renderTable =
    listDataTableCategories &&
    listDataTableCategories.map((item) => (
      <div
        className={`custom-body ${
          chooseCategories === item.id ? 'active' : ''
        }`}
        onClick={() => setChooseCategories(item.id)}
        role="button"
        tabIndex={0}
        onKeyDown={() => {}}
      >
        <div className="custom-body__item">{item.categories}</div>
        <div className="custom-body__item">{item.description}</div>
        <div className="custom-body__item">{item.total}</div>
        <div className="custom-body__item">{item.dvt}</div>
        <div className="custom-body__item">{item.note}</div>
        <div className="action-category">
          <div className="edit-categories">Chỉnh sửa</div>
          <div className="cancel-categories">Loại bỏ</div>
        </div>
      </div>
    ));
  return (
    <MainLayout activeMenu={4}>
      <Container fluid>
        <Row className="content-wrapper page-information">
          <Col xs={12} md={12}>
            <h2 className="title-page">Thông tin nhu cầu - Dự án 1</h2>
          </Col>
          <Col xs={12} md={3}>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'nameProject');
              }}
              value={dataSubmit.nameProject}
              label="Tên dự án/chủ đầu tư"
              placeholder="Tên khách hàng"
            />
          </Col>
          <Col xs={12} md={6}>
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'address');
              }}
              value={dataSubmit.address}
              label="Địa chỉ công trình"
              placeholder="Địa chỉ công trình"
            />
          </Col>
          <Col xs={12} md={3}>
            <SelectDropdown
              placeholder="Chọn tỉnh/thành phố"
              listItem={headquarters}
              onChange={(e) => {
                handleChange(e, 'area');
              }}
              option={dataSubmit.area}
              customClass="select-headquarters"
              label="khu vực"
            />
          </Col>
          <Col xs={12} md={6}>
            <SelectDropdown
              placeholder=""
              listItem={listSpace}
              onChange={(e) => {
                handleChange(e, 'space');
              }}
              option={dataSubmit.space}
              customClass="select-headquarters"
              label="Phân chia không gian"
            />
          </Col>
          <Col xs={12} md={6}>
            <SelectDropdown
              placeholder=""
              listItem={listTypeSpace}
              onChange={(e) => {
                handleChange(e, 'typeSpace');
              }}
              option={dataSubmit.typeSpace}
              customClass="select-headquarters"
              label="Loại hình không gian"
            />
          </Col>
          <Col xs={12} md={12} className="action-delete">
            <Button customClass="button--primary" onClick={() => {}}>
              <p>LƯU THAY ĐỔI</p>
            </Button>
          </Col>
          <Col xs={12} md={12}>
            <h2 className="title-project">Hạng mục chi tiết</h2>
            <div className="custom-head">
              <p>Tên hạng mục</p>
              <p>Mô tả kỹ thuật</p>
              <p>Số lượng</p>
              <p>ĐVT</p>
              <p>Ghi chú</p>
            </div>
            <div className="custom-body">
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'nameCategories');
                  }}
                  value={dataAddCategories.nameCategories}
                  placeholder="Nhập tên"
                />
              </div>
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'description');
                  }}
                  value={dataAddCategories.description}
                  placeholder="Nhập mô tả"
                />
              </div>
              <div className="custom-body__item action">
                <img
                  src={images.iconBack}
                  alt=""
                  className="action-increase"
                  onClick={() => setTotal(total + 1)}
                  role="presentation"
                />
                <p>{total}</p>
                <img
                  src={images.iconBack}
                  alt=""
                  className="action__reduction"
                  onClick={() => total !== 0 && setTotal(total - 1)}
                  role="presentation"
                />
              </div>
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'dvt');
                  }}
                  value={dataAddCategories.dvt}
                  placeholder="Nhập đơn vị tính"
                />
              </div>
              <div className="custom-body__item">
                <textarea
                  onChange={(e) => {
                    handleChange(e.target.value, 'note');
                  }}
                  value={dataAddCategories.note}
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
          <Col xs={12} md={12} className="table-categories">
            <div className="custom-head">
              <p>Tên hạng mục</p>
              <p>Mô tả kỹ thuật</p>
              <p>Số lượng</p>
              <p>ĐVT</p>
              <p>Ghi chú</p>
            </div>
            {renderTable}
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
