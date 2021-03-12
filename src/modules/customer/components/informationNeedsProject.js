// @flow

import React, { useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Table from 'commons/components/Table';
import Loading from 'commons/components/Loading';
import { headCustomerInfo } from 'constants/itemHead';

type Props = {
  getDetailProject: Function,
  match: {
    params: {
      id: string,
    },
  },
  dataDetailProject: Object,
  getListAreas: Function,
  dataAreas: Array<{
    id: number,
    value: string,
  }>,
  getListSpaceType: Function,
  listSpaceType: Array<{
    id: number,
    value: string,
  }>,
  getListDivision: Function,
  listDivision: Array<{
    id: number,
    value: string,
  }>,
  isProcessing: boolean,
};
const InformationNeedsProject = ({
  getDetailProject,
  match,
  dataDetailProject,
  getListAreas,
  dataAreas,
  getListSpaceType,
  listSpaceType,
  getListDivision,
  listDivision,
  isProcessing,
}: Props) => {
  const projectId = match.params.id;
  const areas = dataAreas.filter(
    (item) => item.id === dataDetailProject.area_id
  );
  const spaceType = listSpaceType.filter(
    (item) => item.id === dataDetailProject.space_type_id
  );
  const divisionType = listDivision.filter(
    (item) => item.id === dataDetailProject.space_division_id
  );

  useEffect(() => {
    getDetailProject(projectId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  useEffect(() => {
    getListAreas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListSpaceType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getListDivision({
      space_type_id: dataDetailProject.space_type_id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainLayout activeMenu={4}>
      {isProcessing ? (
        <Loading />
      ) : (
        <Container fluid>
          <Row className="content-wrapper page-customer">
            <Col xs={12} md={12}>
              <h2 className="title-page">Thông tin nhu cầu - Dự án 1</h2>
            </Col>
            <Col xs={12} md={4} className="page-customer__top">
              <h3>Tên dự án/ chủ đầu tư</h3>
              <h2 className="name-company">{dataDetailProject?.name}</h2>
              <p>
                Loại hình không gian{' '}
                <span>{spaceType[0] && spaceType[0].value}</span>
              </p>
            </Col>
            <Col xs={12} md={4} className="page-customer__top">
              <h3>Địa chỉ công trình</h3>
              <h2>{dataDetailProject?.address}</h2>
              <p>
                Phân chia không gian{' '}
                <span>{divisionType[0] && divisionType[0].value}</span>
              </p>
            </Col>
            <Col xs={12} md={4} className="page-customer__top">
              <h3>Khu vực</h3>
              <h2>{areas[0] && areas[0].value}</h2>
            </Col>
            <Col xs={12} md={12} className="action-update">
              <p>Hạng mục chi tiết</p>
              <Button customClass="button--primary" onClick={() => {}}>
                <p>CHỈNH SỬA</p>
              </Button>
            </Col>
            <Col xs={12} md={12} className="table-page table-partner">
              <Table
                tableHeads={headCustomerInfo}
                tableBody={dataDetailProject?.items?.data}
                showLabel
                isShowId
              />
            </Col>
            <Col sm={12} className="wrapper-pagination">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel={<span className="gap">...</span>}
                pageCount={Math.ceil(dataDetailProject?.items.total / 10)}
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
      )}
    </MainLayout>
  );
};

export default InformationNeedsProject;
