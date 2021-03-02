// @flow

import React, { useState, memo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Table from 'commons/components/Table';
import Loading from 'commons/components/Loading';
import { headPartner } from 'constants/itemHead';
import ROUTERS from 'constants/router';
import { vote } from '../../../mockData/dataSelect';

type Props = {
  history: {
    push: Function,
  },
  getListAreas: Function,
  dataAreas: Array<{}>,
  getListConstant: Function,
  dataConstant: Array<{}>,
  getListPartner: Function,
  totalPartner: number,
  dataPartner: Array<{
    id: number,
  }>,
  isProcessing: boolean,
  deletePartner: Function,
  type: string,
};

const Partner = ({
  history,
  getListAreas,
  dataAreas,
  getListConstant,
  dataConstant,
  getListPartner,
  totalPartner,
  dataPartner,
  isProcessing,
  deletePartner,
  type,
}: Props) => {
  const [dataFilter, setDataFilter] = useState({
    areas: null,
    constant: null,
    vote: null,
  });
  const [keySearch, setKeySearch] = useState('');
  const [listId, setListId] = useState([]);
  const [params, setParams] = useState({
    paged: 1,
    career: dataFilter?.constant?.value,
    scale_id: dataFilter?.areas?.id,
    rate: dataFilter?.vote?.value,
  });
  // call api get list areas
  useEffect(() => {
    getListAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get list scales
  useEffect(() => {
    getListConstant({ name: 'hashtag' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getListPartner({
      career: dataFilter?.constant?.value,
      rate: dataFilter?.vote?.value,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'DELETE_PARTNER_SUCCESS') {
      getListPartner({
        career: dataFilter?.constant?.value,
        rate: dataFilter?.vote?.value,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  const handleSelectPagination = (eventKey) => {
    setParams({ ...params, paged: eventKey.selected + 1 });
    const paramsRequest = { ...params, paged: eventKey.selected + 1 };
    getListPartner(paramsRequest);
  };
  const handleCheckBox = (id) => {
    let dataSubmit = [];
    if (listId.includes({ ...id }[0])) {
      dataSubmit = listId.filter((item) => item !== { ...id }[0]);
    } else {
      dataSubmit = [...listId, ...id];
    }
    setListId(dataSubmit);
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
  const handleManagement = (item) => {
    history.push(`${ROUTERS.ROUTERS_PARTNER_MANAGEMENT}/${item?.id}`);
  };

  const handleFilter = () => {
    getListPartner({
      paged: 1,
      career: dataFilter?.constant?.value,
      scale_id: dataFilter?.areas?.id,
      rate: dataFilter?.vote?.value,
      keywords: keySearch,
    });
  };

  const handleDelete = () => {
    deletePartner({ arrayId: listId && listId.toString() });
  };

  return (
    <MainLayout activeMenu={3}>
      {isProcessing ? (
        <Loading />
      ) : (
        <Container fluid>
          <Row className="content-wrapper page-partner">
            <Col xs={12} md={12}>
              <h2 className="title-page">Danh sách Đối tác</h2>
            </Col>
            <Col xs={12} md={6} className="form-search">
              <div className="form-search__left">
                {/* <SelectDropdown
                placeholder="Action"
                listItem={headquarters}
                onChange={(e) => {
                  handleChange(e, 'headquarters');
                }}
                option={dataFilter.headquarters}
                customClass="select-action"
              />
              <Button customClass="button--primary mr-3" onClick={() => {}}>
                APPLY
              </Button> */}
                <SelectDropdown
                  placeholder="Trụ sở"
                  listItem={dataAreas && Immutable.asMutable(dataAreas)}
                  onChange={(e) => {
                    handleChange(e, 'areas');
                  }}
                  option={dataFilter.areas}
                  customClass="select-headquarters"
                />
                <SelectDropdown
                  placeholder="Ngành nghề"
                  listItem={dataConstant && Immutable.asMutable(dataConstant)}
                  onChange={(e) => {
                    handleChange(e, 'constant');
                  }}
                  option={dataFilter.constant}
                  customClass="select-job"
                />
                <SelectDropdown
                  placeholder="Đánh giá"
                  listItem={vote}
                  onChange={(e) => {
                    handleChange(e, 'vote');
                  }}
                  option={dataFilter.vote}
                  customClass="select-vote"
                />
                <Button customClass="button--primary" onClick={handleFilter}>
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
                  onClick={handleFilter}
                  isDisabled={keySearch.length === 0}
                >
                  <p>TÌM</p>
                </Button>
              </div>
            </Col>
            <Col xs={12} md={12} className="action-delete">
              <Button
                customClass="button--primary"
                onClick={handleDelete}
                isDisabled={listId.length === 0}
              >
                <p>XÓA</p>
              </Button>
            </Col>
            <Col xs={12} md={12} className="table-page table-partner">
              <Table
                tableHeads={headPartner}
                tableBody={dataPartner}
                showLabel
                isShowId
                isShowColumnCheck
                isShowColumnBtn
                nameBtn2="Quản lý"
                handleCheckBox={handleCheckBox}
                listId={listId}
                isShowRating
                isShowColumnBtnStatus
                handleClickBtnDetail={handleManagement}
              />
            </Col>
            <Col sm={12} className="wrapper-pagination">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel={<span className="gap">...</span>}
                pageCount={Math.ceil(totalPartner / 10)}
                onPageChange={(eventKey) => handleSelectPagination(eventKey)}
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
      )}
    </MainLayout>
  );
};

export default memo<Props>(Partner);
