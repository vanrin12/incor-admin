// @flow

import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import MainLayout from 'commons/components/MainLayout';
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
  tableDetailProject: Array<{
    id: number,
  }>,
  type: string,
  getDataFooter: Function,
};
const InformationProject = ({
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
  tableDetailProject,
  type,
  getDataFooter,
}: Props) => {
  const projectId = match.params.id;
  const [nameImage, setNameImage] = useState('');
  const [params, setParams] = useState({
    page: 1,
  });

  const [dataSubmit, setDataSubmit] = useState({
    nameProject: '',
    address: '',
    area: null,
    spaceType: null,
    divisionType: null,
  });

  useEffect(() => {
    switch (type) {
      case 'UPDATE_CUSTOMER_SUCCESS':
        getDetailProject(projectId, params); // TODO UPDATE API
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [type]);

  const handleSelectPagination = (eventKey) => {
    setParams({ ...params, page: eventKey.selected + 1 });
    getDetailProject(projectId, params);
  };

  useEffect(() => {
    getDetailProject(projectId, params);
    getDataFooter();
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
      space_type_id: dataSubmit?.spaceType?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSubmit && dataSubmit.spaceType && dataSubmit.spaceType.id]);

  useEffect(() => {
    const areas = dataAreas.filter(
      (item) => item.id === dataDetailProject.area_id
    );
    const spaceType = listSpaceType.filter(
      (item) => item.id === dataDetailProject.space_type_id
    );
    const divisionType = listDivision.filter(
      (item) => item.id === dataDetailProject.space_division_id
    );
    setNameImage(dataDetailProject && dataDetailProject.drawing);
    setDataSubmit({
      nameProject: dataDetailProject?.name || '',
      address: dataDetailProject?.address || '',
      area: (areas && areas[0]) || null,
      spaceType: (spaceType && spaceType[0]) || null,
      divisionType: (divisionType && divisionType[0]) || null,
    });
    // eslint-disable-next-line
  }, [dataDetailProject, projectId, listSpaceType, listDivision]);
  return (
    <MainLayout activeMenu={3}>
      {isProcessing ? (
        <Loading />
      ) : (
        <Container fluid className="pl-0">
          <Row className="content-wrapper page-customer page-information-partner">
            <Col xs={12} md={12}>
              <h2 className="title-page mb-3">
                Thông tin nhu cầu - {dataDetailProject?.name}
              </h2>
            </Col>
            <Col xs={12} md={3}>
              <h2>Tên dự án/chủ đầu tư</h2>
              <h1>{dataSubmit.nameProject}</h1>
            </Col>
            <Col xs={12} md={6}>
              <h2>Địa chỉ công trình</h2>
              <h1>{dataSubmit.address}</h1>
            </Col>
            <Col xs={12} md={3}>
              <h2>Khu vực</h2>
              <h1>{dataSubmit.address}</h1>
            </Col>
            <Col xs={12} md={6}>
              <h2>Phân chia không gian</h2>
              <h1>{dataSubmit?.spaceType?.value}</h1>
            </Col>
            <Col xs={12} md={6}>
              <h2>Loại hình không gian</h2>
              <h1>{dataSubmit?.divisionType?.value}</h1>
            </Col>
            <Col xs={12} md={6}>
              <div className="group-image">
                <h2>Bản vẽ</h2>
                <p>{nameImage}</p>
              </div>
            </Col>
            <Col xs={12} md={12} className="action-update">
              <p>Hạng mục chi tiết</p>
            </Col>

            <Col
              xs={12}
              md={12}
              className="table-page table-partner table-project-item"
            >
              <Table
                tableHeads={headCustomerInfo}
                tableBody={tableDetailProject}
                showLabel
                isShowId
              />
            </Col>
            <Col sm={12} className="wrapper-pagination">
              <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel={<span className="gap">...</span>}
                pageCount={Math.ceil(dataDetailProject?.items?.total / 10)}
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

export default InformationProject;
