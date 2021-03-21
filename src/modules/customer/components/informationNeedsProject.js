// @flow

import React, { useEffect, useState } from 'react';
import Immutable from 'seamless-immutable';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Table from 'commons/components/Table';
import Input from 'commons/components/Input';
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
  registerProjectItem: Function,
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
  registerProjectItem,
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

  const [dataSubmit, setDataSubmit] = useState({
    nameProject: dataDetailProject?.name,
    address: dataDetailProject?.address,
    area: areas && areas[0],
    spaceType: spaceType && spaceType[0],
    divisionType: divisionType && divisionType[0],
  });

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
      space_type_id: dataSubmit?.spaceType?.id,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSubmit && dataSubmit.spaceType && dataSubmit.spaceType.id]);

  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    registerProjectItem({
      name: dataSubmit.nameProject,
      user_id: dataDetailProject.user_id,
      address: dataSubmit.address,
      area_id: dataSubmit?.area?.id,
      space_type_id: dataSubmit?.spaceType?.id,
      space_division_id: dataSubmit?.divisionType?.id,
    });
  };

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
            <Col xs={12} md={3}>
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'nameProject');
                }}
                value={dataSubmit.nameProject}
                label="Tên dự án/chủ đầu tư"
                placeholder="Tên khách hàng"
              />
            </Col>
            <Col xs={12} md={6}>
              <Input
                type="text"
                onChange={(e) => {
                  handleChange(e.target.value, 'address');
                }}
                value={dataSubmit.address}
                label="Địa chỉ công trình"
                placeholder="Địa chỉ công trình"
              />
            </Col>
            <Col xs={12} md={3}>
              <SelectDropdown
                placeholder="Chọn tỉnh/thành phố"
                listItem={dataAreas && Immutable.asMutable(dataAreas)}
                onChange={(e) => {
                  handleChange(e, 'area');
                }}
                option={dataSubmit.area}
                customClass="select-headquarters"
                label="khu vực"
              />
            </Col>
            <Col xs={12} md={6}>
              <SelectDropdown
                placeholder=""
                listItem={listSpaceType && Immutable.asMutable(listSpaceType)}
                onChange={(e) => {
                  handleChange(e, 'spaceType');
                }}
                option={dataSubmit.spaceType}
                customClass="select-headquarters"
                label="Phân chia không gian"
              />
            </Col>
            <Col xs={12} md={6}>
              <SelectDropdown
                placeholder=""
                listItem={listDivision && Immutable.asMutable(listDivision)}
                onChange={(e) => {
                  handleChange(e, 'divisionType');
                }}
                option={dataSubmit.divisionType}
                customClass="select-headquarters"
                label="Loại hình không gian"
                disabled={dataSubmit.spaceType === null}
              />
            </Col>
            <Col xs={12} md={12} className="action-delete">
              <Button customClass="button--primary" onClick={handleUpdate}>
                <p>CHỈNH SỬA</p>
              </Button>
            </Col>
            <Col xs={12} md={12} className="action-update">
              <p>Hạng mục chi tiết</p>
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
                pageCount={Math.ceil(dataDetailProject?.items?.total / 10)}
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
