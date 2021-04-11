// @flow

import React, { useState, memo } from 'react';
import { Col } from 'react-bootstrap';
// import Immutable from 'seamless-immutable';
import ReactPaginate from 'react-paginate';
import Button from 'commons/components/Button';
import Input from 'commons/components/Input';
import Table from 'commons/components/Table';
// import ROUTERS from 'constants/router';

type Props = {
  // history: {
  //   push: Function,
  // },
  handleSearchCompany: Function,
  headPartnerManagement: Array<{
    id: number,
    name: string,
  }>,
  dataQuotes: Array<{
    id: number,
  }>,
  totalQuotes: number,
};

const ItemPartner = ({
  // history,
  handleSearchCompany,
  headPartnerManagement,
  dataQuotes,
  totalQuotes,
}: Props) => {
  const [keySearch, setKeySearch] = useState('');
  return (
    <>
      <Col xs={12} md={12} className="form-search">
        <div className="form-search__right">
          <Input
            type="text"
            onChange={(e) => {
              setKeySearch(e.target.value);
            }}
            maxLength="20"
            value={keySearch}
          />
          <Button
            customClass="button--primary mt-0 h-37"
            onClick={handleSearchCompany}
          >
            <p>TÌM</p>
          </Button>
        </div>
      </Col>
      <Col xs={12} md={12} className="table-page table-partner">
        <Table
          tableHeads={headPartnerManagement}
          tableBody={dataQuotes}
          showLabel
          isShowId
          isShowColumnBtn1
          nameBtn1="Xem"
          isShowColumnBtn
          nameBtn2="Báo giá"
        />
      </Col>
      <Col sm={12} className="wrapper-pagination">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel={<span className="gap">...</span>}
          pageCount={Math.ceil(totalQuotes / 10)}
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
  );
};

export default memo<Props>(ItemPartner);
