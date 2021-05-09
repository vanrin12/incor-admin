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
import { headForm } from 'constants/itemHead';

type Props = {
  getListAreas: Function,
  dataAreas: Array<{
    id: number,
  }>,
  listSpaceType: Array<{ id: number }>,
  totalRequest: number,
  dataFormRequest: Array<{
    id: number,
  }>,
  isProcessing: boolean,
  getFormRequest: Function,
  getListSpaceType: Function,
  deleteFormRequest: Function,
  type: string,
};

const Form = ({
  getListAreas,
  dataAreas,
  listSpaceType,
  totalRequest,
  dataFormRequest,
  isProcessing,
  getFormRequest,
  getListSpaceType,
  deleteFormRequest,
  type,
}: Props) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dataFilter, setDataFilter] = useState({
    areas: null,
    job: null,
    vote: null,
  });
  const [keySearch, setKeySearch] = useState('');
  const [params, setParams] = useState({
    page: 1,
    date_from: startDate && moment(startDate).format('YYYY-MM-DD'),
    date_to: endDate && moment(endDate).format('YYYY-MM-DD'),
    area_id: dataFilter?.areas?.id,
    space_type_id: dataFilter?.job?.id,
    keywords: keySearch,
  });
  const [listId, setListId] = useState([]);

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
    getListAreas();
    getListSpaceType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFormRequest({
      page: 1,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'DELETE_FORM_REQUEST_SUCCESS') {
      getFormRequest({
        page: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleChange = (value, name) => {
    setDataFilter({
      ...dataFilter,
      [name]: value,
    });
  };
  const handleKeySearch = (value) => {
    setKeySearch(value);
  };

  const handleSelectPagination = (eventKey) => {
    setParams({ ...params, page: eventKey.selected + 1 });
    // const paramsRequest = { ...params, page: eventKey.selected + 1 };
    getFormRequest({
      page: eventKey.selected + 1,
      date_from: startDate && moment(startDate).format('YYYY-MM-DD'),
      date_to: endDate && moment(endDate).format('YYYY-MM-DD'),
      area_id: dataFilter?.areas?.id,
      space_type_id: dataFilter?.job?.id,
      keywords: keySearch,
    });
  };

  const handleFilterCustomer = () => {
    getFormRequest({
      page: params.page,
      date_from: startDate && moment(startDate).format('YYYY-MM-DD'),
      date_to: endDate && moment(endDate).format('YYYY-MM-DD'),
      area_id: dataFilter?.areas?.id,
      space_type_id: dataFilter?.job?.id,
      keywords: keySearch,
    });
  };

  const handleDelete = () => {
    deleteFormRequest({ arrayId: listId && listId.toString() });
  };

  return (
    <MainLayout activeMenu={9}>
      <Container fluid className="pl-0">
        <Row className="content-wrapper page-partner page-post">
          <Col xs={12} md={12}>
            <h2 className="title-page">Danh sách điền form tư vấn</h2>
          </Col>
          <Col xs={12} md={7} className="form-search">
            <div className="form-search__left">
              <DatePicker
                selected={startDate}
                placeholderText="Từ ngày"
                // onSelect={handleDateSelect} //when day is clicked
                onChange={(date) => setStartDate(date)}
                selectsStart
                isClearable
                startDate={startDate}
                endDate={endDate}
              />
              <DatePicker
                selected={endDate}
                placeholderText="Đến ngày"
                // onSelect={handleDateSelect} //when day is clicked
                onChange={(date) => setEndDate(date)}
                selectsEnd
                isClearable
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
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
                listItem={
                  listSpaceType &&
                  Immutable.asMutable([
                    { value: '', id: '', label: 'Tất cả' },
                    ...listSpaceType,
                  ])
                }
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
                TÌM KIẾM
              </Button>
              <Button
                customClass="button--primary ml-2"
                onClick={handleDelete}
                isDisabled={listId.length === 0}
              >
                XÓA
              </Button>
            </div>
          </Col>
          <Col xs={12} md={5} className="form-search">
            <div className="form-search__right">
              <Input
                type="text"
                onChange={(e) => {
                  handleKeySearch(e.target.value);
                }}
                placeholder="Nhập từ khóa"
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
              <Col
                xs={12}
                md={12}
                className="table-page mt-4 table-form-request"
              >
                <Table
                  tableHeads={headForm}
                  tableBody={dataFormRequest}
                  showLabel
                  isShowId
                  isShowColumnBtn
                  nameBtn2="Xem"
                  isShowTooltip
                  downloadImage
                  isShowColumnCheck
                  handleCheckBox={handleCheckBox}
                  listId={listId}
                />
              </Col>
              <Col sm={12} className="wrapper-pagination">
                <ReactPaginate
                  previousLabel="Previous"
                  nextLabel="Next"
                  breakLabel={<span className="gap">...</span>}
                  pageCount={Math.ceil(totalRequest / 10)}
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
          <Col xs={12} md={12} className="action-delete pr-0">
            <Button
              customClass="button--primary"
              onClick={() =>
                window.open(
                  'http://18.217.44.234:4000/api/v1/form-requests',
                  '_blank'
                )
              }
            >
              XUẤT DỮ LIỆU
            </Button>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default memo<Props>(Form);
