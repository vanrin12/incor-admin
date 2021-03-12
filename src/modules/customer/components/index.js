// @flow

import React, { useState, memo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import moment from 'moment';
import Immutable from 'seamless-immutable';
import DatePicker from 'react-datepicker';
import SelectDropdown from 'commons/components/Select';
import ReactPaginate from 'react-paginate';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Table from 'commons/components/Table';
import Input from 'commons/components/Input';
import Loading from 'commons/components/Loading';
import ROUTERS from 'constants/router';
import { headCustomer } from 'constants/itemHead';

type Props = {
  history: {
    push: Function,
  },
  getListAreas: Function,
  dataAreas: Array<{}>,
  getListName: Function,
  listName: Array<{}>,
  getListCustomer: Function,
  totalCustomer: number,
  dataCustomer: Array<{
    id: number,
  }>,
  isProcessing: boolean,
};

const Customer = ({
  history,
  getListAreas,
  dataAreas,
  getListName,
  listName,
  getListCustomer,
  totalCustomer,
  dataCustomer,
  isProcessing,
}: Props) => {
  const [createDate, setCreateDate] = useState(null);
  const [dataFilter, setDataFilter] = useState({
    areas: null,
    job: null,
    vote: null,
  });
  const [keySearch, setKeySearch] = useState('');
  const [params, setParams] = useState({
    page: 1,
    area_id: dataFilter?.areas?.id,
    name_incor: dataFilter?.job?.value,
    keywords: keySearch,
    date: createDate,
  });
  useEffect(() => {
    getListAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getListName();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListCustomer({
      page: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateChange = (date) => {
    setCreateDate(date);
  };
  const handleChange = (value, name) => {
    setDataFilter({
      ...dataFilter,
      [name]: value,
    });
  };
  const handleKeySearch = (value) => {
    setKeySearch(value);
  };
  const handleViewInformation = (item) => {
    history.push(`${ROUTERS.INFORMATION}/${item?.id}`);
  };

  const handleClickBtnDetail = (item) => {
    history.push(`${ROUTERS.PROGRESS_PROJECT}/${item?.id}`);
  };

  const handleSelectPagination = (eventKey) => {
    setParams({ ...params, page: eventKey.selected + 1 });
    const paramsRequest = { ...params, page: eventKey.selected + 1 };
    getListCustomer(paramsRequest);
  };

  const handleFilterCustomer = () => {
    getListCustomer({
      area_id: dataFilter?.areas?.id,
      name_incor: dataFilter?.job?.value,
      keywords: keySearch,
      date: createDate && moment(createDate).format('YYYY-MM-DD'),
    });
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
              <DatePicker
                selected={createDate}
                // onSelect={handleDateSelect} //when day is clicked
                onChange={(date) => handleDateChange(date)}
              />
              <SelectDropdown
                placeholder="Khu vực"
                listItem={dataAreas && Immutable.asMutable(dataAreas)}
                onChange={(e) => {
                  handleChange(e, 'areas');
                }}
                option={dataFilter.areas}
                customClass="select-headquarters"
              />
              <SelectDropdown
                placeholder="Kinh doanh"
                listItem={listName && Immutable.asMutable(listName)}
                onChange={(e) => {
                  handleChange(e, 'job');
                }}
                option={dataFilter.job}
                customClass="select-job"
              />
              <Button
                customClass="button--primary"
                onClick={handleFilterCustomer}
              >
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
              <Button
                customClass="button--primary"
                onClick={handleFilterCustomer}
              >
                <p>TÌM</p>
              </Button>
            </div>
          </Col>
          {isProcessing ? (
            <Loading />
          ) : (
            <>
              <Col xs={12} md={12} className="table-page table-partner">
                <Table
                  tableHeads={headCustomer}
                  tableBody={dataCustomer}
                  showLabel
                  isShowId
                  isShowColumnBtn1
                  nameBtn1="Quản lý"
                  isShowColumnBtn
                  nameBtn2="Quản lý"
                  handleClickBtnView={handleViewInformation}
                  handleClickBtnDetail={handleClickBtnDetail}
                />
              </Col>
              <Col sm={12} className="wrapper-pagination">
                <ReactPaginate
                  previousLabel="Previous"
                  nextLabel="Next"
                  breakLabel={<span className="gap">...</span>}
                  pageCount={Math.ceil(totalCustomer / 10)}
                  onPageChange={(eventKey) => handleSelectPagination(eventKey)}
                  forcePage={params.page - 1 || 0}
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
        </Row>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(Customer);
