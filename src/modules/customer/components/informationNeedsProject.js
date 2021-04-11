// @flow

import React, { useEffect, useState, useRef } from 'react';
import Immutable from 'seamless-immutable';
import { Row, Col, Container } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import SelectDropdown from 'commons/components/Select';
import MainLayout from 'commons/components/MainLayout';
import Button from 'commons/components/Button';
import Table from 'commons/components/Table';
// import images from 'themes/images';
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
  tableDetailProject: Array<{
    id: number,
  }>,
  registerProject: Function,
  type: string,
  listHashtag: Array<{}>,
  getDataFooter: Function,
  deleteProjectItem: Function,
  updateProjectItem: Function,
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
  tableDetailProject,
  registerProject,
  type,
  listHashtag,
  getDataFooter,
  deleteProjectItem,
  updateProjectItem,
}: Props) => {
  const projectId = match.params.id;
  const inputFile = useRef({});
  const [rowActive, setRowActive] = useState({});
  const [nameImage, setNameImage] = useState('');
  const [objFile, setObjFile] = useState(null);
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
  const [total, setTotal] = useState('');
  const [dataAddCategories, setDataAddCategories] = useState({
    nameCategories: '',
    description: '',
    dvt: '',
    note: '',
    hashtag: null,
  });

  useEffect(() => {
    switch (type) {
      case 'REGISTER_PROJECT_ITEM_SUCCESS':
        getDetailProject(projectId);
        setDataAddCategories({
          nameCategories: '',
          description: '',
          dvt: '',
          note: '',
          hashtag: null,
        });
        break;
      case 'DELETE_PROJECT_ITEM_SUCCESS':
        getDetailProject(projectId);
        break;
      case 'UPDATE_PROJECT_ITEM_SUCCESS':
        getDetailProject(projectId);
        setRowActive({});
        setDataAddCategories({
          nameCategories: '',
          description: '',
          dvt: '',
          note: '',
          hashtag: null,
        });
        break;
      default:
        break;
    }
    setTotal('');
    // eslint-disable-next-line
  }, [type]);

  const onButtonClick = () => {
    // `current` points to the mounted file input element
    // eslint-disable-next-line no-unused-expressions
    const inputRefCurrent =
      inputFile && inputFile.current ? inputFile.current : null;
    // eslint-disable-next-line no-unused-expressions
    inputRefCurrent && inputRefCurrent.click();
  };

  const getFileName = async (e) => {
    setObjFile(e.files[0]);
    setNameImage(e.files[0].name);
  };

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

  const handleChange = (value, name) => {
    setDataSubmit({
      ...dataSubmit,
      [name]: value,
    });
    setDataAddCategories({
      ...dataAddCategories,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    const formData = new window.FormData();
    formData.append('name', dataSubmit.nameProject);
    formData.append('user_id', dataDetailProject.user_id);
    formData.append('address', dataSubmit.address);
    formData.append('area_id', dataSubmit?.area?.id);
    formData.append('space_type_id', dataSubmit?.spaceType?.id);
    formData.append('space_division_id', dataSubmit?.divisionType?.id);
    formData.append('file', objFile);
    registerProject(formData);
  };

  const onClickTableRow = (rowData) => {
    if (rowData && rowData.id === rowActive?.id) {
      setRowActive({});
    } else {
      setRowActive(rowData);
    }
  };

  const handleDelete = (rowData) => {
    deleteProjectItem(rowData.id);
  };

  const handleUpdateData = (rowData) => {
    setDataAddCategories({
      ...dataAddCategories,
      nameCategories: rowData?.name,
      description: rowData?.description,
      dvt: rowData?.unit,
      note: rowData?.note,
    });
    setTotal(rowData?.amount);
  };

  const handleRegisterProjectItem = () => {
    registerProjectItem({
      name: dataAddCategories.nameCategories,
      project_id: projectId,
      description: dataAddCategories.description,
      amount: total,
      unit: dataAddCategories?.dvt,
      note: dataAddCategories?.note,
      // TODO ADD HASHTAG
    });
  };

  const handleUpdateProjectItem = () => {
    updateProjectItem(rowActive?.id, {
      name: dataAddCategories.nameCategories,
      project_id: projectId,
      description: dataAddCategories.description,
      amount: total,
      unit: dataAddCategories?.dvt,
      note: dataAddCategories?.note,
      // TODO ADD HASHTAG
    });
  };

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
      nameProject: dataDetailProject?.name,
      address: dataDetailProject?.address,
      area: areas && areas[0],
      spaceType: spaceType && spaceType[0],
      divisionType: divisionType && divisionType[0],
    });
    // eslint-disable-next-line
  }, [dataDetailProject, projectId, listSpaceType, listDivision]);
  console.log(dataAddCategories.hashtag, 'dataAddCategories.hashtag');

  return (
    <MainLayout activeMenu={4}>
      {isProcessing ? (
        <Loading />
      ) : (
        <Container fluid>
          <Row className="content-wrapper page-customer">
            <Col xs={12} md={12}>
              <h2 className="title-page mb-3">
                Thông tin nhu cầu - {dataDetailProject?.name}
              </h2>
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
                placeholder="Chọn không gian"
                listItem={listSpaceType && Immutable.asMutable(listSpaceType)}
                onChange={(e) => {
                  handleChange(e, 'spaceType');
                }}
                option={dataSubmit.spaceType}
                customClass="select-headquarters mt-2"
                label="Phân chia không gian"
              />
            </Col>
            <Col xs={12} md={6}>
              <SelectDropdown
                placeholder="Chọn lại hình không gian"
                listItem={listDivision && Immutable.asMutable(listDivision)}
                onChange={(e) => {
                  handleChange(e, 'divisionType');
                }}
                option={dataSubmit.divisionType}
                customClass="select-headquarters mt-2"
                label="Loại hình không gian"
                disabled={dataSubmit.spaceType === null}
              />
            </Col>
            <Col xs={12} md={6}>
              <div className="group-image">
                <h2>Bản vẽ</h2>
                <p>{nameImage}</p>
                <input
                  className="box__file d-none"
                  type="file"
                  ref={inputFile}
                  accept="*, capture=camera"
                  onChange={(e) => getFileName(e.target)}
                />
                <Button customClass="button--primary" onClick={onButtonClick}>
                  <p>CHỌN FILE</p>
                </Button>
              </div>
            </Col>
            <Col xs={12} md={12} className="action-delete">
              <Button customClass="button--primary" onClick={handleUpdate}>
                <p>CHỈNH SỬA</p>
              </Button>
            </Col>
            <Col xs={12} md={12} className="action-update">
              <p>Hạng mục chi tiết</p>
            </Col>
            <Col xs={12} md={12}>
              <div className="custom-head customer">
                <p>Tên hạng mục</p>
                <p>Hashtag</p>
                <p>Mô tả kỹ thuật</p>
                <p>Số lượng</p>
                <p>ĐVT</p>
                <p>Ghi chú</p>
              </div>
              <div className="custom-body">
                <div className="custom-body__item customer">
                  <textarea
                    onChange={(e) => {
                      handleChange(e.target.value, 'nameCategories');
                    }}
                    value={dataAddCategories.nameCategories}
                    placeholder="Nhập tên"
                    disabled={projectId === ''}
                  />
                </div>
                <div className="custom-body__item customer">
                  <SelectDropdown
                    placeholder="Chọn hashtag"
                    listItem={listHashtag && Immutable.asMutable(listHashtag)}
                    onChange={(e) => {
                      handleChange(e, 'hashtag');
                    }}
                    isMulti
                    option={dataAddCategories.hashtag}
                  />
                </div>
                <div className="custom-body__item customer">
                  <textarea
                    onChange={(e) => {
                      handleChange(e.target.value, 'description');
                    }}
                    value={dataAddCategories.description}
                    placeholder="Nhập mô tả"
                    disabled={projectId === ''}
                  />
                </div>
                <div className="custom-body__item action customer">
                  {/* <img
                    src={images.iconBack}
                    alt=""
                    className="action-increase"
                    onClick={() => projectId !== '' && setTotal(total + 1)}
                    role="presentation"
                  />
                  <p>{total}</p>
                  <img
                    src={images.iconBack}
                    alt=""
                    className="action__reduction"
                    onClick={() =>
                      total !== 0 && projectId !== '' && setTotal(total - 1)
                    }
                    role="presentation"
                  /> */}

                  <textarea
                    type="text"
                    onChange={(e) => {
                      setTotal(e.target.value);
                    }}
                    placeholder="Nhập số lượng"
                    value={total}
                    disabled={projectId === ''}
                  />
                </div>
                <div className="custom-body__item customer">
                  <textarea
                    onChange={(e) => {
                      handleChange(e.target.value, 'dvt');
                    }}
                    value={dataAddCategories.dvt}
                    placeholder="Nhập đơn vị tính"
                    disabled={projectId === ''}
                  />
                </div>
                <div className="custom-body__item customer">
                  <textarea
                    onChange={(e) => {
                      handleChange(e.target.value, 'note');
                    }}
                    value={dataAddCategories.note}
                    placeholder="Nhập Ghi chú"
                    disabled={projectId === ''}
                  />
                </div>
              </div>
            </Col>
            <Col xs={12} md={12} className="action-delete mb-3">
              <Button
                customClass="button--primary"
                onClick={
                  rowActive?.id
                    ? handleUpdateProjectItem
                    : handleRegisterProjectItem
                }
                isDisabled={
                  dataAddCategories.nameCategories.length === 0 ||
                  dataAddCategories.description.length === 0 ||
                  !total ||
                  dataAddCategories.dvt.length === 0
                }
              >
                <p>{`${rowActive?.id ? 'Chỉnh sửa' : 'Thêm mới'}`}</p>
              </Button>
            </Col>
            <Col xs={12} md={12} className="table-page table-partner">
              <Table
                tableHeads={headCustomerInfo}
                tableBody={tableDetailProject}
                showLabel
                isShowId
                onClickRow={onClickTableRow}
                rowActive={rowActive}
                handleDelete={handleDelete}
                handleUpdate={handleUpdateData}
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

export default InformationNeedsProject;
