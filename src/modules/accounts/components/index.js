/* eslint-disable react-hooks/exhaustive-deps */
// @flow

import React, { useState, useEffect } from 'react';
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
// import ROUTERS from 'constants/router';
import { headAccount } from 'constants/itemHead';
import listActions from 'constants/actions';
import Loading from 'commons/components/Loading';
// import { headquarters, vote, role } from '../../../mockData/dataSelect';
// import { listDataAccount } from '../../../mockData/listDataTable';
import { getListUser, getUserRoles, createUser, deleteUser } from '../redux';

const Account = () => {
  const dispatch = useDispatch();
  const { userList, listRoles, isProcessing, type } = useSelector(
    (state) => state?.account
  );

  const [createDate, setCreateDate] = useState(null);
  const [listId, setListId] = useState([]);
  const [dataFilter, setDataFilter] = useState({
    roleFilter: null,
    dateCreate: '',
    action: null,
    role: null,
  });

  const [dataSubmit, setDataSubmit] = useState({});
  const handleCheckBox = (id) => {
    let dataCheckBox = [];
    if (listId.includes({ ...id }[0])) {
      dataCheckBox = listId.filter((item) => item !== { ...id }[0]);
    } else {
      dataCheckBox = [...listId, ...id];
    }
    setListId(dataCheckBox);
  };

  useEffect(() => {
    if (type === 'accounts/deleteUserSuccess') {
      dispatch(
        getListUser({
          role_id: '',
          keywords: '',
          date: '',
          page: 1,
          pageSize: 10,
        })
      );
    }
  }, [type]);

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

  const dataUserFormat =
    userList &&
    userList.data &&
    userList.data.map((item) => ({
      id: item.id,
      name: item.name,
      role_name: item.role_name,
      created_at: moment(item.created_at).format('HH:SS MM/DD/YYYY'),
    }));

  const handleCreateUser = () => {
    dispatch(
      createUser({
        name: dataSubmit.name,
        roleName: dataSubmit?.role?.value,
        userList,
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      deleteUser({
        arrayId: listId && listId.toString(),
      })
    );
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
              listItem={listRoles}
              onChange={(e) => {
                handleChange(e, 'role');
              }}
              option={dataFilter.role}
              customClass="select-role"
              label="Vai trò"
            />
            <Button customClass="button--primary" onClick={handleCreateUser}>
              TẠO TÀI KHOẢN
            </Button>
          </Col>
          <Col xs={12} md={8}>
            <Col xs={12} md={12} className="form-search">
              <div className="form-search__left">
                <SelectDropdown
                  placeholder="Action"
                  listItem={listActions}
                  onChange={(e) => {
                    handleChange(e, 'action');
                  }}
                  option={dataFilter.action}
                  customClass="select-headquarters"
                />
                <Button
                  customClass="button--primary mr-5"
                  onClick={handleFilter}
                >
                  APPLY
                </Button>
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
                  placeholderText="Thời Gian Tạo"
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
                <Button customClass="button--primary" onClick={handleDelete}>
                  <p>XÓA</p>
                </Button>
              </Col>
            </Col>
            {isProcessing ? (
              <Loading />
            ) : (
              <>
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
              </>
            )}
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Account;
