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
import Modal from 'commons/components/Modal';
// import ROUTERS from 'constants/router';
import { headAccount } from 'constants/itemHead';
import listActions from 'constants/actions';
import Loading from 'commons/components/Loading';
import {
  getListUser,
  getUserRoles,
  createUser,
  deleteUser,
  lockUser,
} from '../redux';

const Account = () => {
  const dispatch = useDispatch();
  const { userList, listRoles, isProcessing, type } = useSelector(
    (state) => state?.account
  );
  const [isShowPassword, setIsShowPassword] = useState({
    isOpen: false,
    content: '',
  });
  const [createDate, setCreateDate] = useState(null);
  const [listId, setListId] = useState([]);
  const [dataFilter, setDataFilter] = useState({
    roleFilter: null,
    dateCreate: '',
    action: null,
    role: null,
    page: 1,
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
    if (type === 'accounts/createUserSuccess') {
      setDataSubmit({});
      setDataFilter({
        ...dataFilter,
        role: null,
      });
    }
    if (type === 'accounts/createUserFailed') {
      setIsShowPassword({
        isOpen: true,
        content: 'Tên không được trùng',
      });
    }
    if (type === 'accounts/lockUserSuccess') {
      dispatch(
        getListUser({
          role_id: '',
          keywords: '',
          date: '',
          page: 1,
          pageSize: 10,
        })
      );
      setListId([]);
      setDataFilter({
        ...dataFilter,
        action: null,
      });
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
        keywords: keySearch,
        date: createDate ? moment(createDate).format('YYYY-MM-DD') : '',
        page: 1,
        pageSize: 10,
      })
    );
  };

  const handleSelectPagination = (eventKey) => {
    setDataFilter({ ...dataFilter, page: eventKey.selected + 1 });
    dispatch(
      getListUser({
        role_id: dataFilter?.roleFilter?.id,
        keywords: keySearch,
        date: createDate ? moment(createDate).format('YYYY-MM-DD') : '',
        page: eventKey.selected + 1,
        pageSize: 10,
      })
    );
  };

  const handleSearch = () => {
    dispatch(
      getListUser({
        role_id: dataFilter?.roleFilter?.id,
        keywords: keySearch,
        date: createDate ? moment(createDate).format('YYYY-MM-DD') : '',
        page: dataFilter.page,
        pageSize: 10,
      })
    );
  };
  const dataUserFormat =
    userList &&
    userList.data &&
    userList.data.map((item) => ({
      id: item.id,
      lock: item.lock,
      name: item.name,
      role_name: item.role_name,
      created_at: moment(item.created_at).format('HH:SS MM/DD/YYYY'),
      password: item.pw_show,
    }));

  const handleCreateUser = () => {
    dispatch(
      createUser({
        name: dataSubmit.name,
        roleName: dataSubmit?.role?.value,
        userList,
        full_name: dataSubmit?.fullName,
      })
    );
  };

  const handleClickBtnDetail = (item) => {
    setIsShowPassword({
      isOpen: true,
      content: item?.password,
    });
  };

  const handleCheckAction = () => {
    if (dataFilter?.action?.id === 1) {
      dispatch(
        deleteUser({
          arrayId: listId && listId.toString(),
        })
      );
    }
    if (dataFilter?.action?.id === 2) {
      dispatch(
        lockUser({
          arrayId: listId && listId.toString(),
          type: 'lock',
        })
      );
    } else {
      dispatch(
        lockUser({
          arrayId: listId && listId.toString(),
          type: 'unlock',
        })
      );
    }
  };
  return (
    <MainLayout activeMenu={5}>
      <Container fluid className="pl-0">
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
                value={keySearch}
                placeholder="Nhập từ khóa"
              />
              <Button
                customClass="button--primary"
                onClick={() => handleSearch()}
              >
                <p>TÌM</p>
              </Button>
            </div>
          </Col>
          <Col xs={12} md={4} className="page-account__form-register">
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'fullName');
              }}
              value={dataSubmit.fullName}
              placeholder="tên đăng nhập"
              label="Tên đăng nhập"
              customClass="name-account mb-3"
            />
            <Input
              type="text"
              onChange={(e) => {
                handleChange(e.target.value, 'name');
              }}
              value={dataSubmit.name}
              placeholder="Tên khách hàng/Đối tác/Admin"
              label="Tên tài khoản"
              customClass="name-account"
            />
            <p className="suggestions">Viết in hoa, tiếng việt có dấu</p>

            <SelectDropdown
              placeholder="Chọn vai trò"
              listItem={listRoles && listRoles.slice(1)}
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
                  onClick={handleCheckAction}
                  isDisabled={
                    dataFilter?.action?.id === undefined || listId.length === 0
                  }
                >
                  ÁP DỤNG
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
                  isClearable
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
                  TÌM KIẾM
                </Button>
              </div>
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
                    isShowLock
                    handleClickBtnDetail={handleClickBtnDetail}
                  />
                </Col>
                <Col sm={12} className="wrapper-pagination">
                  <ReactPaginate
                    previousLabel="Previous"
                    nextLabel="Next"
                    breakLabel={<span className="gap">...</span>}
                    pageCount={Math.ceil(userList?.total / 10)}
                    onPageChange={(eventKey) =>
                      handleSelectPagination(eventKey)
                    }
                    forcePage={dataFilter.page - 1 || 0}
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
      <Modal
        isOpen={isShowPassword.isOpen}
        isShowFooter
        handleClose={() => {
          setIsShowPassword({ ...isShowPassword, isOpen: false });
        }}
        handleSubmit={() => {
          setIsShowPassword({ ...isShowPassword, isOpen: false });
        }}
        textBtnRight="ĐÓNG"
      >
        {isShowPassword.content}
      </Modal>
    </MainLayout>
  );
};

export default Account;
