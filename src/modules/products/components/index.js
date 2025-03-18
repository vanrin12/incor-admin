import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators } from '../../post/redux';
import moment from 'moment';
import { Row, Col, Container } from 'react-bootstrap';
import MainLayout from 'commons/components/MainLayout';
import DatePicker from 'react-datepicker';
import SelectDropdown from 'commons/components/Select';
import Immutable from 'seamless-immutable';
import { listSearchStatusOption } from 'constants/actions';
import Table from 'commons/components/Table';
import { headerProductTable } from 'constants/itemHead';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { getDataProducts, deleteProducts } from '../redux';
import ROUTERS from 'constants/router';

// Helper: Format product data for the table
const formatProductList = (productList, listAllCategories) =>
  productList.map((p) => ({
    id: p.id,
    name: p.name,
    productNo: p.product_no,
    createBy: p?.user?.name,
    category: listAllCategories.find((c) => c.id === p.product_category_id)
      ?.value,
    createDate: p.created_at && moment.utc(p.created_at).format('DD-MM-YYYY'),
    numSellOut: +p.sell_out,
    numRemaining: +p.remaining,
  }));

function Products({ getListAllCategories }) {
  const dispatch = useDispatch();
  const history = useHistory();
  // Redux selectors
  const {
    productList,
    totalProduct,
    currentPage,
    per_page,
    type,
  } = useSelector((state) => state?.productsReducer);
  const { listAllCategories } = useSelector((state) => state?.postReducer);

  // State management
  const [createDate, setCreateDate] = useState(null);
  const [category, setCategory] = useState(null);
  const [keySearch, setKeySearch] = useState('');
  const [status, setStatus] = useState(null);
  const [listId, setListId] = useState([]);

  // Params for API requests
  const [params, setParams] = useState({
    page: 1,
    date: createDate,
    category_id: category,
    keywords: keySearch,
  });

  // Derived data
  const productListTable = useMemo(
    () => formatProductList(productList, listAllCategories),
    [productList]
  );

  // Handlers
  const handleDateChange = useCallback((date) => setCreateDate(date), []);
  const handleKeySearch = useCallback((e) => setKeySearch(e.target.value), []);
  const handleCategoryChange = useCallback((value) => setCategory(value), []);
  const handlePagination = useCallback(
    (eventKey) => {
      const newPage = eventKey.selected + 1;
      setParams((prevParams) => ({ ...prevParams, page: newPage }));
      dispatch(getDataProducts({ ...params, page: newPage }));
    },
    [dispatch, params]
  );
  const handleFilter = useCallback(() => {
    dispatch(
      getDataProducts({
        ...params,
        product_category_id: category?.id,
        created_at: createDate && moment(createDate).format('YYYY-MM-DD HH:mm:ss'),
        name: keySearch,
        status: status?.value,
      })
    );
  }, [dispatch, params, category, createDate, keySearch, status]);

  // Initial data fetch
  useEffect(() => {
    getListAllCategories();
    dispatch(getDataProducts());
  }, [dispatch, getListAllCategories]);

  useEffect(() => {
    if (type === 'products/deleteProductsSuccess') {
      dispatch(getDataProducts());
    }
  }, []);
  useEffect(() => {
    if (type === 'products/deleteProductsSuccess') {
      dispatch(getDataProducts());
    }
  }, [type]);

  const handleCheckBox = (id) => {
    let updatedList;
    const allIds = productListTable.map((row) => row.id);

    if (id === 'selectAll') {
      if (listId.length === allIds.length) {
        updatedList = []; // Deselect all
      } else {
        updatedList = [...allIds]; // Select all
      }
    } else {
      // Handle individual selection
      if (listId.includes(id)) {
        updatedList = listId.filter((item) => item !== id); // Remove the item
      } else {
        updatedList = [...listId, id]; // Add the item
      }
    }
    setListId(updatedList);
  };

  const handleDeleteProducts = () => {
    dispatch(deleteProducts(listId));
  };

  const handleViewDetail = (item) => {
    history.push(`${ROUTERS.PRODUCTS}/${item.id}`);
  };
  return (
    <MainLayout activeMenu={9}>
      <Container fluid>
        <Row className="content-wrapper page-products">
          <div className="container-fluid p-4">
            {/* status Buttons */}
            <div className="mb-4 d-flex gap-3 justify-content-between">
              <div>
                <button
                  className="btn btn-danger mr-3"
                  onClick={() => history.push('/products/add')}
                >
                  TẠO SẢN PHẨM
                </button>
                <button className="btn btn-danger mr-3">
                  QUẢN LÝ DANH MỤC
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteProducts}
                >
                  XÓA SẢN PHẨM
                </button>
              </div>
              <div className="ms-auto d-flex">
                <input
                  type="search"
                  className="form-control custom-search"
                  placeholder="Search..."
                  onChange={handleKeySearch}
                />
                <button className="btn btn-danger ms-2" onClick={handleFilter}>
                  TÌM
                </button>
              </div>
            </div>
            {/* Filters */}
            <div className="mb-4 d-flex gap-3">
              <SelectDropdown
                placeholder="Status"
                listItem={Immutable.asMutable(listSearchStatusOption)}
                onChange={setStatus}
                option={status}
                customClass="select-job mr-2"
              />
              <DatePicker
                selected={createDate}
                onChange={handleDateChange}
                placeholderText="All Date"
                className="custom-datepicker-input"
              />
              <SelectDropdown
                placeholder="All Category"
                listItem={Immutable.asMutable(listAllCategories)}
                onChange={handleCategoryChange}
                option={category}
                customClass="select-job mr-2"
              />
              <button className="btn btn-danger" onClick={handleFilter}>
                FILTER
              </button>
            </div>
          </div>

          {/* Product Table */}
          <Col xs={12} md={12} className="table-page table-partner">
            <Table
              tableHeads={headerProductTable}
              tableBody={productListTable}
              showLabel
              isShowId
              isShowColumnCheck
              handleCheckBox={handleCheckBox}
              listId={listId}
              isShowCheckAll
              onClickRow={handleViewDetail}
            />
          </Col>

          {/* Pagination */}
          <Col sm={12} className="wrapper-pagination">
            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel={<span className="gap">...</span>}
              pageCount={Math.ceil(totalProduct / per_page)}
              onPageChange={handlePagination}
              forcePage={currentPage - 1 || 0}
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
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...Creators,
      getListPost: Creators.getListPost,
      getListAllCategories: Creators.getListAllCategories,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Products);
