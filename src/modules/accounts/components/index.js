/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useState, memo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Table from 'commons/components/Table';
import ROUTERS from 'constants/router';
import { headAccount } from 'constants/itemHead';
// import { headquarters, vote, role } from '../../../mockData/dataSelect';
// import { listDataAccount } from '../../../mockData/listDataTable';
import { getListUser, getUserRoles } from '../redux';

type Props = {
  history: {
    push: Function,
  },
};
const Post = ({ history }: Props) => {
  const dispatch = useDispatch();
  const { userList, listRoles } = useSelector((state) => state?.account);
  const [createDate, setCreateDate] = useState(null);
  const [listId, setListId] = useState([]);
  const [dataFilter, setDataFilter] = useState({
    roleFilter: '',
    dateCreate: '',
  });

  const [dataSubmit, setDataSubmit] = useState({});
  const handleCheckBox = (id) => {
    let dataSubmit = [];
    if (listId.includes({ ...id }[0])) {
      dataSubmit = listId.filter((item) => item !== { ...id }[0]);
    } else {
      dataSubmit = [...listId, ...id];
    }
    setListId(dataSubmit);
  };

  const [keySearch, setKeySearch] = useState('');

  const handleChange = (value, name) => {
    console.log(value);
    switch (name) {
      case 'roleFilter':
        setDataFilter({
          ...dataFilter,
          [name]: value,
        });
        break;

      default:
        break;
    }

    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };
  const handleKeySearch = (value) => {
    setKeySearch(value);
  };

  useEffect(() => {
    dispatch(
      getListUser({
        role_id: '',
        keywords: '',
        date: '',
        page: 1,
        pageSize: 10,
      })
    );
  }, []);

  useEffect(() => {
    dispatch(getUserRoles());
  }, []);

  const handleDateChange = (date) => {
    setCreateDate(date);
  };

  const handleFilter = () => {
    dispatch(
      getListUser({
        role_id: dataFilter?.roleFilter?.id,
        keywords: '',
        date: createDate ? moment(createDate).format('YYYY-MM-DD') : '',
        page: 1,
        pageSize: 10,
      })
    );
  };
  console.log(listRoles);
  console.log(dataFilter);
  console.log('data submit', dataSubmit);

  const dataUserFormat = userList?.data?.map((item) => ({
    id: item.id,
    name: item.name,
    role_name: item.role_name,
    created_at: moment(item.created_at).format('HH:SS MM/DD/YYYY'),
  }));

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
              listItem={listRoles}
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
                  listItem={listRoles}
                  onChange={(e) => {
                    handleChange(e, 'roleFilter');
                  }}
                  option={dataFilter.roleFilter}
                  customClass="select-headquarters"
                />
                <DatePicker
                  selected={createDate}
                  // onSelect={handleDateSelect} //when day is clicked
                  onChange={(date) => handleDateChange(date)}
                />
                {/* <SelectDropdown
                  placeholder="Thời gian tạo"
                  listItem={vote}
                  onChange={(e) => {
                    handleChange(e, 'vote');
                  }}
                  option={dataFilter.vote}
                  customClass="select-vote"
                /> */}
                <Button customClass="button--primary" onClick={handleFilter}>
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
                tableBody={dataUserFormat}
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
                pageCount={Math.ceil(userList?.users?.total / 10)}
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
