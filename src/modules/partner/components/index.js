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
import { headPartner } from 'constants/itemHead';
import ROUTERS from 'constants/router';
import { vote } from '../../../mockData/dataSelect';
import { listDataPartner } from '../../../mockData/listDataTable';

type Props = {
  history: {
    push: Function,
  },
  getListAreas: Function,
  dataAreas: Array<{}>,
  getListScales: Function,
  dataScales: Array<{}>,
  getListPartner: Function,
};

const Partner = ({
  history,
  getListAreas,
  dataAreas,
  getListScales,
  dataScales,
  getListPartner,
}: Props) => {
  const [dataFilter, setDataFilter] = useState({
    headquarters: null,
    job: null,
    vote: null,
  });
  const [keySearch, setKeySearch] = useState('');
  const [listId, setListId] = useState([]);
  // call api get list areas
  useEffect(() => {
    getListAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // call api get list scales
  useEffect(() => {
    getListScales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    getListPartner({
      career: dataFilter?.headquarters?.value,
      rate: dataFilter?.vote?.value,
    });
  }, [dataFilter, getListPartner]);

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
  return (
    <MainLayout activeMenu={3}>
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
                  handleChange(e, 'headquarters');
                }}
                option={dataFilter.headquarters}
                customClass="select-headquarters"
              />
              <SelectDropdown
                placeholder="Ngành nghề"
                listItem={dataScales && Immutable.asMutable(dataScales)}
                onChange={(e) => {
                  handleChange(e, 'job');
                }}
                option={dataFilter.job}
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
              <Button customClass="button--primary" onClick={() => {}}>
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
              <Button customClass="button--primary" onClick={() => {}}>
                <p>TÌM</p>
              </Button>
            </div>
          </Col>
          <Col xs={12} md={12} className="action-delete">
            <Button customClass="button--primary" onClick={() => {}}>
              <p>XÓA</p>
            </Button>
          </Col>
          <Col xs={12} md={12} className="table-page table-partner">
            <Table
              tableHeads={headPartner}
              tableBody={listDataPartner}
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

export default memo<Props>(Partner);
