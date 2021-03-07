// @flow

import React, { useState, memo, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Immutable from 'seamless-immutable';
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import DatePicker from 'react-datepicker';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Loading from 'commons/components/Loading';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Table from 'commons/components/Table';
import ROUTERS from 'constants/router';
import { headPost } from 'constants/itemHead';

type Props = {
  history: {
    push: Function,
  },
  getListPost: Function,
  listPost: Array<{
    id: number,
  }>,
  totalPost: number,
  getListAllCategories: Function,
  listAllCategories: Array<{}>,
  getListAllSeoTitle: Function,
  listAllSeoTitle: Array<{}>,
  deletePost: Function,
  type: string,
  isProcessing: boolean,
};
const Post = ({
  history,
  getListPost,
  listPost,
  totalPost,
  getListAllCategories,
  listAllCategories,
  getListAllSeoTitle,
  listAllSeoTitle,
  deletePost,
  type,
  isProcessing,
}: Props) => {
  const [listId, setListId] = useState([]);
  const [createDate, setCreateDate] = useState(null);
  const [keySearch, setKeySearch] = useState('');
  const [dataFilter, setDataFilter] = useState({
    headquarters: null,
    category: null,
    seo: null,
  });
  const [params, setParams] = useState({
    page: 1,
    date: createDate,
    category_id: dataFilter?.category?.id,
    seo_title: dataFilter?.seo?.value,
    keywords: keySearch,
  });
  const handleSelectPagination = (eventKey) => {
    setParams({ ...params, page: eventKey.selected + 1 });
    const paramsRequest = { ...params, page: eventKey.selected + 1 };
    getListPost(paramsRequest);
  };
  // call api get list seo title
  useEffect(() => {
    getListAllSeoTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // call api get list all category
  useEffect(() => {
    getListAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // call api get list post
  useEffect(() => {
    getListPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (type === 'DELETE_POST_SUCCESS') {
      getListPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);
  const handleDateChange = (date) => {
    setCreateDate(date);
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

  const handleFilter = () => {
    getListPost({
      page: 1,
      date: createDate && moment(createDate).format('YYYY-MM-DD HH:mm:ss'),
      category_id: dataFilter?.category?.id,
      seo_title: dataFilter?.seo?.value,
      keywords: keySearch,
    });
  };

  const handleViewDetail = (item) => {
    history.push(`${ROUTERS.POST}/${item.id}`);
  };

  const handleDelete = () => {
    deletePost({ arrayId: listId && listId.toString() });
  };

  return (
    <MainLayout activeMenu={2}>
      <Container fluid>
        <Row className="content-wrapper page-partner page-post">
          <Col xs={12} md={12}>
            <Button
              customClass="button--primary"
              onClick={() => history.push(ROUTERS.POST_REGISTER)}
            >
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
              <DatePicker
                selected={createDate}
                // onSelect={handleDateSelect} //when day is clicked
                onChange={(date) => handleDateChange(date)}
              />
              <SelectDropdown
                placeholder="All Catergory"
                listItem={
                  listAllCategories && Immutable.asMutable(listAllCategories)
                }
                onChange={(e) => {
                  handleChange(e, 'category');
                }}
                option={dataFilter.category}
                customClass="select-job"
              />
              <SelectDropdown
                placeholder="All SEO Title"
                listItem={
                  listAllSeoTitle && Immutable.asMutable(listAllSeoTitle)
                }
                onChange={(e) => {
                  handleChange(e, 'seo');
                }}
                option={dataFilter.seo}
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
          {isProcessing ? (
            <Loading />
          ) : (
            <>
              <Col xs={12} md={12} className="table-page table-partner">
                <Table
                  tableHeads={headPost}
                  tableBody={listPost}
                  showLabel
                  isShowId
                  isShowColumnCheck
                  handleCheckBox={handleCheckBox}
                  listId={listId}
                  isShowColumnBtnStatus
                  onClickRow={handleViewDetail}
                />
              </Col>
              <Col sm={12} className="wrapper-pagination">
                <ReactPaginate
                  previousLabel="Previous"
                  nextLabel="Next"
                  breakLabel={<span className="gap">...</span>}
                  pageCount={Math.ceil(totalPost / 10)}
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

export default memo<Props>(Post);
