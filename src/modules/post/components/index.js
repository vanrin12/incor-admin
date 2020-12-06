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
import { headPost } from 'constants/itemHead';
import { headquarters, job, vote } from '../../../mockData/dataSelect';
import { listDataPost } from '../../../mockData/listDataTable';

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
    job: null,
    vote: null,
  });
  const [keySearch, setKeySearch] = useState('');
  const handleChange = (value, name) => {
    setDataFilter({
      ...dataFilter,
      [name]: value,
    });
  };
  const handleKeySearch = (value) => {
    setKeySearch(value);
  };
  return (
    <MainLayout activeMenu={2}>
      <Container fluid>
        <Row className="content-wrapper page-partner page-post">
          <Col xs={12} md={12}>
            <Button customClass="button--primary" onClick={() => {}}>
              VIẾT BÀI MỚI
            </Button>
            <Button
              customClass="button--primary"
              onClick={() => history.push(ROUTERS.REGISTER_CATEGORY_POST)}
            >
              QUẢN LÝ CHUYÊN MỤC
            </Button>
          </Col>
          <Col xs={12} md={6} className="form-search">
            <div className="form-search__left">
              <SelectDropdown
                placeholder="All Date"
                listItem={headquarters}
                onChange={(e) => {
                  handleChange(e, 'headquarters');
                }}
                option={dataFilter.headquarters}
                customClass="select-headquarters"
              />
              <SelectDropdown
                placeholder="All Catergory"
                listItem={job}
                onChange={(e) => {
                  handleChange(e, 'job');
                }}
                option={dataFilter.job}
                customClass="select-job"
              />
              <SelectDropdown
                placeholder="All SEO Title"
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
              tableHeads={headPost}
              tableBody={listDataPost}
              showLabel
              isShowId
              isShowColumnCheck
              handleCheckBox={handleCheckBox}
              listId={listId}
              isShowColumnBtnStatus
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

export default memo<Props>(Post);
