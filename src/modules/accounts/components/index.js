// @flow

import React, { useState, memo } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Table from 'commons/components/Table';
import ROUTERS from 'constants/router';
import { headAccount } from 'constants/itemHead';
import { headquarters, vote, role } from '../../../mockData/dataSelect';
import { listDataAccount } from '../../../mockData/listDataTable';

type Props = {
  history: {
    push: Function,
  },
};
const Post = ({ history }: Props) => {
  const [listId, setListId] = useState([]);
  const handleCheckBox = (id) => {
    let dataSubmit = [];
    if (listId.includes({ ...id }[0])) {
      dataSubmit = listId.filter((item) => item !== { ...id }[0]);
    } else {
      dataSubmit = [...listId, ...id];
    }
    setListId(dataSubmit);
  };
  const [dataFilter, setDataFilter] = useState({
    headquarters: null,
    vote: null,
  });
  const [dataSubmit, setDataSubmit] = useState({
    role: null,
    name: '',
  });
  const [keySearch, setKeySearch] = useState('');
  const handleChange = (value, name) => {
    setDataFilter({
      ...dataFilter,
      [name]: value,
    });
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };
  const handleKeySearch = (value) => {
    setKeySearch(value);
  };
  return (
    <MainLayout activeMenu={5}>
      <Container fluid>
        <Row className="content-wrapper page-partner page-post page-account">
          <Col xs={12} md={12}>
            <h2 className="title-page">Danh sách Khách hàng</h2>
          </Col>
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
              <Button customClass="button--primary" onClick={() => {}}>
                <p>TÌM</p>
              </Button>
            </div>
          </Col>
          <Col xs={12} md={4} className="page-account__form-register">
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'name');
              }}
              maxLength="20"
              value={dataSubmit.name}
              placeholder="Tên khách hàng/Đối tác/Admin"
              label="Tên tài khoản"
              customClass="name-account"
            />
            <p className="suggestions">Viết in hoa, tiếng việt có dấu</p>
            <SelectDropdown
              placeholder="Chọn vai trò"
              listItem={role}
              onChange={(e) => {
                handleChange(e, 'role');
              }}
              option={dataSubmit.role}
              customClass="select-role"
              label="Vai trò"
            />
            <Button
              customClass="button--primary"
              onClick={() => history.push(ROUTERS.REGISTER_CATEGORY_POST)}
            >
              TẠO TÀI KHOẢN
            </Button>
          </Col>
          <Col xs={12} md={8}>
            <Col xs={12} md={12} className="form-search">
              <div className="form-search__left">
                <SelectDropdown
                  placeholder="Vai trò"
                  listItem={headquarters}
                  onChange={(e) => {
                    handleChange(e, 'headquarters');
                  }}
                  option={dataFilter.headquarters}
                  customClass="select-headquarters"
                />
                <SelectDropdown
                  placeholder="Thời gian tạo"
                  listItem={vote}
                  onChange={(e) => {
                    handleChange(e, 'vote');
                  }}
                  option={dataFilter.vote}
                  customClass="select-vote"
                />
                <Button customClass="button--primary" onClick={() => {}}>
                  FILTER
                </Button>
              </div>
              <Col xs={12} md={12} className="action-delete pr-0">
                <Button customClass="button--primary" onClick={() => {}}>
                  <p>XÓA</p>
                </Button>
              </Col>
            </Col>
            <Col xs={12} md={12} className="table-page table-account">
              <Table
                tableHeads={headAccount}
                tableBody={listDataAccount}
                showLabel
                isShowId
                isShowColumnCheck
                handleCheckBox={handleCheckBox}
                listId={listId}
                isShowColumnBtnStatus
                isShowColumnBtn
                nameBtn2="Xem"
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
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(Post);
